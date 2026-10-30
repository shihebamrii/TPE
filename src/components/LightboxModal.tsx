import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Sparkles, Layers } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  description: string;
  macroImage?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  image,
  title,
  description,
  macroImage,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImage, setActiveImage] = useState(image);

  useEffect(() => {
    setActiveImage(image);
    setIsZoomed(false);
  }, [image]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brand-dark/95 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Top Floating Action Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-brand-card/90 border border-brand-border rounded-2xl shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-brand-accent" />
          <span className="text-xs font-bold text-white tracking-wide">Macro Texture Inspector</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {macroImage && (
            <button
              onClick={() => setActiveImage(activeImage === image ? macroImage : image)}
              className="px-3.5 py-2 bg-brand-card/90 hover:bg-brand-accent border border-brand-border rounded-xl text-xs font-bold text-white shadow-xl transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Toggle Alternate View</span>
            </button>
          )}

          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 bg-brand-card/90 hover:bg-brand-card border border-brand-border rounded-xl text-white shadow-xl transition-all"
            title={isZoomed ? 'Zoom Out' : 'Zoom In 200%'}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2.5 bg-brand-accent hover:bg-brand-accentLight text-white rounded-xl shadow-xl transition-all"
            title="Close (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-brand-border/60 bg-brand-dark">
        <div
          onClick={() => setIsZoomed(!isZoomed)}
          className={`w-full h-full flex items-center justify-center cursor-zoom-${isZoomed ? 'out' : 'in'} overflow-auto p-4 transition-transform duration-300`}
        >
          <img
            src={activeImage}
            alt={title}
            className={`max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-300 ${
              isZoomed ? 'scale-[2.0] cursor-grab active:cursor-grabbing' : 'scale-100'
            }`}
          />
        </div>

        {/* Bottom Description Pill */}
        <div className="absolute bottom-4 left-4 right-4 bg-brand-navy/90 backdrop-blur-md border border-brand-border p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-display font-bold text-white text-base sm:text-lg">{title}</h4>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 max-w-2xl">{description}</p>
          </div>
          <span className="text-[11px] font-mono text-brand-cyan shrink-0">
            {isZoomed ? '200% Macro View' : 'Click image to toggle 200% Macro Zoom'}
          </span>
        </div>
      </div>

    </div>
  );
};
