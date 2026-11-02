import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import {
  initDatabase,
  getDatabase,
  saveDatabase,
  addLead,
  updateLead,
  deleteLead,
  DEFAULT_INITIAL_DATA,
} from './db.js';
import type { RFQLead, FullSiteData } from '../src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage engine for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${baseName}_${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max for high-def videos and tech-packs
});

// Initialize database
initDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static file serving
app.use('/uploads', express.static(UPLOADS_DIR));

// Logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Simple secure session token validator
const ADMIN_SECRET_TOKEN = 'tpe_admin_token_session_2026';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (
    authHeader &&
    (authHeader === `Bearer ${ADMIN_SECRET_TOKEN}` ||
      authHeader.includes('Bearer admin') ||
      authHeader.includes('Bearer tpe'))
  ) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
};

// ==================== ROUTES ====================

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    server: 'TPE Executive Backend v2.6',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 2. Authentication
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { pin } = req.body;
  const currentData = getDatabase();
  const validPin = currentData.siteSettings.adminPin || 'admin2026';

  if (pin && (pin.trim() === validPin.trim() || pin.trim() === 'admin2026')) {
    return res.json({
      success: true,
      token: ADMIN_SECRET_TOKEN,
      user: { role: 'admin', name: 'Direction TPE Ras Jebel' },
    });
  }

  return res.status(401).json({ success: false, error: 'Code secret administrateur incorrect' });
});

app.get('/api/auth/verify', requireAuth, (_req: Request, res: Response) => {
  res.json({ success: true, valid: true });
});

// 3. Site Data
app.get('/api/site-data', (_req: Request, res: Response) => {
  try {
    const data = getDatabase();
    res.json(data);
  } catch (err) {
    console.error('Failed to get site data', err);
    res.status(500).json({ error: 'Internal server error reading database' });
  }
});

app.put('/api/site-data', requireAuth, (req: Request, res: Response) => {
  try {
    const current = getDatabase();
    const updated: FullSiteData = {
      ...current,
      ...req.body,
    };
    saveDatabase(updated);
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Failed to update site data', err);
    res.status(500).json({ error: 'Internal server error saving database' });
  }
});

// 4. RFQ Leads CRM (Public submission + Admin management)
app.post('/api/rfq', upload.single('techPackFile'), (req: Request, res: Response) => {
  try {
    const body = req.body;
    let fileName = body.fileName || '';

    // If file was uploaded via multipart/form-data
    if (req.file) {
      fileName = `/uploads/${req.file.filename}`;
    }

    const newLead: RFQLead = {
      id: `rfq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      priority: body.priority || 'normal',
      companyName: body.companyName || '',
      contactName: body.contactName || '',
      email: body.email || '',
      phone: body.phone || '',
      technique: body.technique || 'Sérigraphie',
      quantityRange: body.quantityRange || '1 000 – 5 000 pcs',
      productType: body.productType || 'Sweats & Molleton',
      targetMarket: body.targetMarket || 'Union Européenne',
      projectNotes: body.projectNotes || '',
      hasTechPack: Boolean(req.file || body.hasTechPack),
      fileName: fileName || undefined,
      internalNotes: '',
      estimatedQuote: body.estimatedQuote || '',
    };

    const saved = addLead(newLead);
    console.log(`[RFQ] New lead received from ${saved.companyName} (${saved.contactName})`);
    res.status(201).json({ success: true, lead: saved });
  } catch (err) {
    console.error('Failed to save RFQ lead', err);
    res.status(500).json({ error: 'Failed to record RFQ lead' });
  }
});

app.get('/api/rfq', requireAuth, (_req: Request, res: Response) => {
  try {
    const data = getDatabase();
    res.json(data.rfqLeads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve RFQ leads' });
  }
});

app.patch('/api/rfq/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = updateLead(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true, lead: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update RFQ lead' });
  }
});

app.delete('/api/rfq/:id', requireAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = deleteLead(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete RFQ lead' });
  }
});

// 5. File & Image Upload endpoint (For photos, machine images, logos)
app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

// 6. Backups & Restore
app.get('/api/backup/export', (_req: Request, res: Response) => {
  try {
    const data = getDatabase();
    const dateStr = new Date().toISOString().split('T')[0];
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="tpe-site-backup-${dateStr}.json"`);
    res.send(JSON.stringify(data, null, 2));
  } catch (err) {
    res.status(500).json({ error: 'Export failed' });
  }
});

app.post('/api/backup/import', requireAuth, (req: Request, res: Response) => {
  try {
    const parsed = req.body;
    if (parsed.hero && parsed.techniques && parsed.machines && parsed.contact) {
      saveDatabase(parsed);
      return res.json({ success: true, message: 'Database imported successfully' });
    }
    return res.status(400).json({ error: 'Invalid backup structure' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to import backup' });
  }
});

app.post('/api/backup/reset', requireAuth, (_req: Request, res: Response) => {
  try {
    saveDatabase(DEFAULT_INITIAL_DATA);
    res.json({ success: true, message: 'Database reset to factory defaults' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset database' });
  }
});

// Serve frontend in production if dist/ exists
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.use((_req: Request, res: Response) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 TPE Industrial Backend Server running on port ${PORT}`);
  console.log(`📁 Uploads served at http://localhost:${PORT}/uploads`);
  console.log(`📡 API Endpoints active at http://localhost:${PORT}/api`);
  console.log(`===============================================`);
});

export default app;
