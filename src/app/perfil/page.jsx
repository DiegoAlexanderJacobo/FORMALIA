'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export default function Perfil() {
  const { user, trustScore, totalVentasMonth, sunatInfo, updateProfile } = useApp();

  const [isUpdatingSignature, setIsUpdatingSignature] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Setup drawing context
  useEffect(() => {
    if (isUpdatingSignature && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#00236f';
    }
  }, [isUpdatingSignature]);

  // Determine trust level text and color code
  const getTrustLevel = (score) => {
    if (score <= 250) return { label: 'Inicial', color: '#EF4444', textClass: 'text-error' };
    if (score <= 500) return { label: 'Activo', color: '#F59E0B', textClass: 'text-amber-500' };
    if (score <= 850) return { label: 'Seguro', color: '#FBBF24', textClass: 'text-yellow-500' };
    return { label: 'Socio Confiable', color: '#10B981', textClass: 'text-secondary' };
  };

  const levelInfo = getTrustLevel(trustScore);

  // Trust gauge circular calculations (radius = 45, circumference = 283)
  const strokeDashoffset = 283 - (trustScore / 1000) * 283;

  // Signature drawing event handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSaveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;

    const signatureDataUrl = canvas.toDataURL();
    updateProfile({ signature: signatureDataUrl });
    setIsUpdatingSignature(false);
    setHasDrawn(false);
  };

  return (
    <main className="pt-20 pb-24 min-h-screen px-container-margin max-w-7xl mx-auto space-y-lg text-left relative">
      
      {/* Header Profile Summary */}
      <header className="mb-xl animate-toast">
        <div className="flex flex-col md:flex-row md:items-end gap-lg">
          
          {/* Avatar Picture */}
          <div className="relative group self-start">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface-container-lowest shadow-lg overflow-hidden bg-primary-fixed flex items-center justify-center text-primary text-4xl font-extrabold">
              {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'JD'}
            </div>
            <button
              onClick={() => setIsUpdatingSignature(true)}
              className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer"
              title="Actualizar Firma"
            >
              <span className="material-symbols-outlined text-[20px]">draw</span>
            </button>
          </div>

          {/* User Meta Details */}
          <div className="flex-grow space-y-2 text-left">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-black">
              {user.name}
            </h1>
            <div className="flex flex-wrap gap-md items-center text-xs">
              <div className="flex items-center gap-xs text-on-surface-variant font-semibold">
                <span className="material-symbols-outlined text-sm">badge</span>
                <span>DNI: {user.dni}</span>
              </div>
              
              {user.ruc && (
                <div className="flex items-center gap-xs text-on-surface-variant font-semibold">
                  <span className="material-symbols-outlined text-sm">corporate_fare</span>
                  <span>RUC: {user.ruc}</span>
                </div>
              )}

              <span className="bg-secondary-container text-on-secondary-container px-3 py-0.5 rounded-full font-label-sm text-[11px] flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[14px]">verified</span> Activo
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        
        {/* Trust Score Gauge Circular Card (Left) */}
        <section className="md:col-span-5 bg-surface-container-lowest rounded-[24px] p-lg shadow-sm border border-surface-container flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-secondary-fixed/10 rounded-full blur-3xl group-hover:bg-secondary-fixed/20 transition-colors duration-500"></div>
          
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-lg">
            Índice de Confiabilidad
          </h3>
          
          {/* Trust Meter Gauge */}
          <div className="relative w-48 h-48 mb-lg flex items-center justify-center">
            <svg className="trust-meter-svg w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-surface-container-high stroke-current"
                cx="50"
                cy="50"
                fill="transparent"
                r="45"
                strokeWidth="8"
              />
              <circle
                className="progress-circle stroke-current transition-all duration-1000"
                cx="50"
                cy="50"
                fill="transparent"
                r="45"
                strokeWidth="8"
                strokeLinecap="round"
                style={{
                  stroke: levelInfo.color,
                  strokeDasharray: 283,
                  strokeDashoffset,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline-lg text-[40px] text-primary font-black leading-none">
                {trustScore}
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mt-1">
                de 1000 pts
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className={`font-headline-md text-xl font-bold ${levelInfo.textClass}`}>
              {levelInfo.label}
            </p>
            <p className="font-body-md text-xs text-on-surface-variant max-w-[240px] leading-relaxed">
              Tu regularidad registrando ventas e impuestos construye tu perfil crediticio alternativo.
            </p>
          </div>
        </section>

        {/* Action Panel and Stats (Right) */}
        <div className="md:col-span-7 flex flex-col gap-lg">
          
          {/* Signature Verification Card */}
          <section className="bg-white rounded-[24px] p-lg shadow-sm border border-surface-container border-l-4 border-primary text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-lg">
              <div className="space-y-2 text-center sm:text-left flex-1">
                <h4 className="font-headline-md text-headline-md text-on-surface font-bold">Firma Digital Estampada</h4>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Mantén tu firma electrónica actualizada para firmar FUTs y solicitudes SUNAT sin salir de casa.
                </p>
                
                {/* Drawn Signature Image Preview */}
                <div className="pt-2">
                  <div className="w-48 h-20 border border-outline-variant bg-surface-container-low rounded-xl flex items-center justify-center overflow-hidden">
                    {user.signature ? (
                      <img src={user.signature} alt="Firma digital" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-xs text-outline italic">[Sin firma registrada]</span>
                    )}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsUpdatingSignature(true)}
                className="primary-gradient text-on-primary px-lg py-md rounded-xl font-label-md text-label-sm shadow-md flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto justify-center cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">draw</span>
                Actualizar Firma
              </button>
            </div>
          </section>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md text-left">
            
            {/* estimated cuota */}
            <div className="bg-surface-container-low rounded-[24px] p-md flex items-start gap-md border border-outline-variant/10">
              <div className="p-3 bg-primary-fixed text-primary rounded-xl">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div className="space-y-0.5">
                <p className="font-label-sm text-[11px] text-on-surface-variant font-bold">Impuesto Estimado</p>
                <p className="font-headline-md text-xl text-on-surface font-black">
                  {sunatInfo.categoria ? `S/ ${sunatInfo.cuota.toFixed(2)}` : 'Fuera RUS'}
                </p>
                <p className="text-[10px] text-secondary font-bold">Categoría {sunatInfo.categoria || 'N/A'}</p>
              </div>
            </div>

            {/* total monthly sales */}
            <div className="bg-surface-container-low rounded-[24px] p-md flex items-start gap-md border border-outline-variant/10">
              <div className="p-3 bg-secondary-fixed text-on-secondary-fixed rounded-xl">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <div className="space-y-0.5">
                <p className="font-label-sm text-[11px] text-on-surface-variant font-bold">Ventas del Mes</p>
                <p className="font-headline-md text-xl text-on-surface font-black">
                  S/ {totalVentasMonth.toLocaleString('es-PE', { maximumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] text-on-surface-variant font-medium">Tope máximo S/ 8,000</p>
              </div>
            </div>

          </div>

          {/* Timeline of Recent Activity */}
          <section className="bg-surface-container-lowest rounded-[24px] p-lg border border-surface-container shadow-sm text-left">
            <h4 className="font-headline-md text-headline-md text-on-surface font-bold mb-lg">
              Historial de Actividades
            </h4>
            <div className="space-y-md">
              <div className="flex gap-md">
                <span className="material-symbols-outlined text-secondary shrink-0">check_circle</span>
                <div className="text-xs">
                  <p className="font-bold text-on-surface">Validación de RUC completado</p>
                  <p className="text-on-surface-variant">La SUNAT verificó el RUC {user.ruc || '10472819301'}.</p>
                </div>
              </div>
              <div className="flex gap-md">
                <span className="material-symbols-outlined text-primary shrink-0">stars</span>
                <div className="text-xs">
                  <p className="font-bold text-on-surface">Misión "Firma Digital" finalizada</p>
                  <p className="text-on-surface-variant">Incrustaste tu firma en tu primer formulario tributario.</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Actualizar Firma Digital Overlay */}
      {isUpdatingSignature && (
        <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setIsUpdatingSignature(false)} />
          
          <div className="relative bg-white rounded-3xl w-full max-w-md p-lg shadow-2xl border border-outline-variant/30 animate-toast text-left space-y-md">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-xs">
              <h3 className="font-headline-md text-headline-md font-bold text-primary">Actualizar Firma</h3>
              <button
                onClick={() => setIsUpdatingSignature(false)}
                className="p-1 hover:bg-surface-container-high rounded-full cursor-pointer text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Dibuja tu firma en el recuadro para actualizar tu firma estampada digitalmente.
            </p>

            <div className="relative w-full aspect-[4/3] bg-surface-container-low rounded-[24px] border border-outline-variant shadow-inner overflow-hidden">
              <canvas
                ref={canvasRef}
                width={380}
                height={280}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="signature-canvas w-full h-full z-10"
              />
              {!hasDrawn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[40px] mb-1">edit</span>
                  <span className="text-xs text-outline font-semibold">Dibuja aquí tu nueva firma</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-xs">
              <button
                type="button"
                onClick={clearCanvas}
                className="flex items-center gap-xs font-label-md text-label-sm text-error hover:opacity-75 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Limpiar
              </button>
              
              <div className="flex gap-md">
                <button
                  type="button"
                  onClick={() => setIsUpdatingSignature(false)}
                  className="px-md py-2 border border-outline-variant rounded-xl font-label-md text-xs text-on-surface cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveSignature}
                  disabled={!hasDrawn}
                  className={`px-lg py-2 rounded-xl font-label-md text-xs font-bold shadow active:scale-95 transition-all ${
                    hasDrawn
                      ? 'bg-secondary text-white shadow-secondary/10 cursor-pointer'
                      : 'bg-outline-variant text-on-surface-variant/40 cursor-not-allowed'
                  }`}
                >
                  Guardar Firma
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
