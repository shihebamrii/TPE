import React, { useState } from 'react';
import { X, Sparkles, Upload, CheckCircle2, ArrowRight, ArrowLeft, MessageSquare, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Language, RFQFormData } from '../types';
import { translations } from '../data/translations';

interface TechPackRFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialTechnique?: string;
}

export const TechPackRFQModal: React.FC<TechPackRFQModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialTechnique = 'Broderie Industrielle Multi-Têtes & Relief 3D',
}) => {
  const t = translations[currentLang].rfq;
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<RFQFormData>({
    technique: initialTechnique,
    quantityRange: '1 000 – 5 000 pièces (Production Standard)',
    productType: 'Sweats à Capuche & Molleton Lourd',
    targetMarket: 'Union Européenne (France, Italie, Allemagne, etc.)',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectNotes: '',
    hasTechPack: false,
    fileName: '',
  });

  if (!isOpen) return null;

  const techniquesOptions = [
    { id: 'embroidery', label: 'Broderie Industrielle Multi-Têtes & Relief 3D' },
    { id: 'screenprint', label: 'Sérigraphie Automatique sur Carrousel (Encres Éco)' },
    { id: 'dtf', label: 'Impression Numérique Direct-to-Film (DTF) & Transfert' },
    { id: 'finishing', label: 'Finissage Textile Complet, Délavage & Ensachage' },
    { id: 'cad', label: 'Bureau d\'Études CAO, Patronage & Tracé de Placement' },
  ];

  const quantityOptions = [
    'Échantillonnage & Capsules (100 – 300 pcs)',
    'Production Standard (500 – 2 000 pcs)',
    'Haute Cadence (2 000 – 10 000 pcs)',
    'Grands Volumes Export (10 000+ pcs)',
  ];

  const productOptions = [
    'Sweats à Capuche & Confections Molleton',
    'T-Shirts & Tops Jersey Peigné',
    'Polos Maille Piquée & Corporate',
    'Vêtements de Travail & Équipements EPI',
    'Casquettes, Bonnets & Accessoires',
    'Panneaux Découpés Bruts (Façonnage Pur)',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        hasTechPack: true,
        fileName: e.target.files[0].name,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00A0E3', '#E6007E', '#FFCC00', '#111827'],
      });
    }, 800);
  };

  const generateWhatsAppLink = () => {
    const text = `Bonjour TPE Tunisie,\nJe vous contacte suite à une demande de devis :\n- Technique : ${formData.technique}\n- Support : ${formData.productType}\n- Quantité : ${formData.quantityRange}\n- Marque/Société : ${formData.companyName} (${formData.contactName})\n- Email : ${formData.email}\n- Détails : ${formData.projectNotes || 'N/A'}`;
    return `https://wa.me/21698761003?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Title */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-tpe-magenta" />
                <span>Bureau d'Études & Devis B2B</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                {t.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t.subtitle}
              </p>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-xs font-bold">
              <span className={`px-3 py-1 rounded-lg ${step === 1 ? 'bg-tpe-dark text-white' : 'bg-slate-100 text-slate-500'}`}>
                1. Technique
              </span>
              <span className={`px-3 py-1 rounded-lg ${step === 2 ? 'bg-tpe-dark text-white' : 'bg-slate-100 text-slate-500'}`}>
                2. Volume & Support
              </span>
              <span className={`px-3 py-1 rounded-lg ${step === 3 ? 'bg-tpe-dark text-white' : 'bg-slate-100 text-slate-500'}`}>
                3. Dossier & Contact
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                    {t.techniquePrompt}
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {techniquesOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, technique: opt.label })}
                        className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          formData.technique === opt.label
                            ? 'bg-slate-50 border-tpe-magenta text-slate-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-semibold">{opt.label}</span>
                        {formData.technique === opt.label && (
                          <CheckCircle2 className="w-4 h-4 text-tpe-magenta shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-tpe-dark text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-tpe-magenta transition-all"
                    >
                      <span>Suivant</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">
                      {t.quantityPrompt}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {quantityOptions.map((qty) => (
                        <div
                          key={qty}
                          onClick={() => setFormData({ ...formData, quantityRange: qty })}
                          className={`p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                            formData.quantityRange === qty
                              ? 'bg-slate-50 border-tpe-magenta text-slate-900 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {qty}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">
                      {t.productPrompt}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {productOptions.map((prod) => (
                        <div
                          key={prod}
                          onClick={() => setFormData({ ...formData, productType: prod })}
                          className={`p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                            formData.productType === prod
                              ? 'bg-slate-50 border-tpe-magenta text-slate-900 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {prod}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-tpe-dark text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-tpe-magenta transition-all"
                    >
                      <span>Suivant</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  {/* File Upload Zone */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                      {t.techPackLabel}
                    </label>
                    <label className="border-2 border-dashed border-slate-300 hover:border-tpe-cyan rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-sky-50/40 transition-all">
                      <Upload className="w-6 h-6 text-tpe-cyan mb-2" />
                      <span className="text-xs font-bold text-slate-800">
                        {formData.fileName ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                            <Check className="w-4 h-4" /> {formData.fileName}
                          </span>
                        ) : (
                          'Glissez-déposez votre Tech-Pack ou Cliquez pour Parcourir'
                        )}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1">
                        Formats acceptés : PDF, AI, PSD, DXF, PNG ou ZIP jusqu'à 50 Mo
                      </span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.ai,.psd,.dxf,.png,.jpg,.jpeg,.zip"
                      />
                    </label>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {t.company} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="ex. Marque Parisienne"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-tpe-magenta"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {t.contact} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="ex. Julien Blanc (Chef de Produit)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-tpe-magenta"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {t.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="j.blanc@fashion.fr"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-tpe-magenta"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {t.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-tpe-magenta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {t.notes}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.projectNotes}
                      onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                      placeholder="Précisez la taille du marquage, code pantone, date souhaitée d'échantillonnage..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-tpe-magenta"
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-tpe-dark hover:bg-tpe-magenta text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md disabled:opacity-50 transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-tpe-yellow" />
                      <span>{isSubmitting ? t.submitting : t.submit}</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        ) : (
          /* SUCCESS VIEW */
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              {t.successTitle}
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {t.successDesc}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5 font-mono text-slate-800">
              <div><strong className="text-slate-900">Référence :</strong> TPE-DEVIS-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div><strong className="text-slate-900">Technique :</strong> {formData.technique}</div>
              <div><strong className="text-slate-900">Volume :</strong> {formData.quantityRange}</div>
              <div><strong className="text-slate-900">Compte :</strong> {formData.companyName}</div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.directWhatsApp}</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold uppercase tracking-wider"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
