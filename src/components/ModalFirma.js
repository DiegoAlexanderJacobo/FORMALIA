'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function ModalFirma({ isOpen, onClose }) {
  const { user, signDocument } = useApp();
  const [password, setPassword] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSign = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Simulate password validation (since it's a demo, let's accept any password or mock it)
    if (!password) {
      setErrorMsg('Por favor introduce tu contraseña.');
      return;
    }

    setIsSigning(true);

    // Simulate 1.5s cryptographic signing and checkmark animation
    setTimeout(() => {
      setIsSigning(false);
      setSuccess(true);

      setTimeout(() => {
        signDocument('Formulario_FUT_Firmado.pdf');
        // Reset states and close
        setSuccess(false);
        setPassword('');
        onClose();
      }, 1500);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-outline-variant/30 animate-toast">
        {/* Header */}
        <div className="p-lg bg-surface-container flex justify-between items-center border-b border-outline-variant/20">
          <div className="flex items-center gap-sm text-primary">
            <span className="material-symbols-outlined text-2xl">draw</span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Firma de Documento</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {success ? (
          /* Success Screen */
          <div className="p-xl flex flex-col items-center justify-center text-center space-y-md">
            <div className="w-20 h-20 rounded-full bg-secondary-container text-secondary flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h4 className="font-headline-md text-2xl text-secondary font-bold">¡Documento Firmado Exitosamente!</h4>
            <p className="font-body-md text-on-surface-variant max-w-sm">
              Tu firma digital ha sido incrustada de forma segura en el Formulario FUT. El documento ha sido archivado en **La Bóveda**.
            </p>
          </div>
        ) : (
          /* Preview and Form Screen */
          <form onSubmit={handleSign}>
            <div className="p-lg space-y-lg max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              {/* Document Preview */}
              <div className="border-2 border-dashed border-outline-variant bg-surface-container-low p-md rounded-2xl space-y-sm text-left relative">
                <span className="absolute top-2 right-2 text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold uppercase">
                  SUNAT FUT
                </span>
                
                <h4 className="font-label-md text-label-md font-bold text-center border-b border-outline-variant/30 pb-2 uppercase tracking-wide text-primary">
                  Formulario Único de Trámite
                </h4>

                <div className="grid grid-cols-3 gap-y-xs text-xs font-body-md">
                  <span className="text-on-surface-variant font-semibold col-span-1">Nombres:</span>
                  <span className="text-on-surface font-bold col-span-2">{user.name}</span>

                  <span className="text-on-surface-variant font-semibold col-span-1">DNI / RUC:</span>
                  <span className="text-on-surface col-span-2">{user.dni} / {user.ruc || '[PENDIENTE]'}</span>

                  <span className="text-on-surface-variant font-semibold col-span-1">Domicilio Fiscal:</span>
                  <span className="text-on-surface col-span-2 text-[11px] leading-tight">{user.address}</span>

                  <span className="text-on-surface-variant font-semibold col-span-1">Trámite:</span>
                  <span className="text-on-surface col-span-2 font-bold">Acogimiento al NRUS (Nuevo Régimen Único Simplificado)</span>
                </div>

                <div className="border-t border-outline-variant/30 pt-md mt-sm flex flex-col items-center">
                  <div className="w-48 h-20 border border-outline-variant/50 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    {user.signature ? (
                      <img src={user.signature} alt="Firma del Usuario" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-xs text-error/80 italic font-semibold">[Dibuja tu firma en el perfil primero]</span>
                    )}
                  </div>
                  <span className="text-[10px] text-outline font-bold mt-1 uppercase tracking-tighter">
                    Firma del Contribuyente
                  </span>
                </div>
              </div>

              {/* Password Input to Confirm Sign */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="sign-password">
                  Ingresa tu Contraseña de Formalia
                </label>
                <p className="text-[11px] text-on-surface-variant leading-relaxed mb-sm">
                  Necesitamos confirmar tu contraseña para estampar la firma gráfica y verificar la firma digital del documento.
                </p>
                <div className="relative flex items-center bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-outline mr-sm">lock</span>
                  <input
                    id="sign-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                  />
                </div>
                {errorMsg && (
                  <p className="text-xs text-error font-semibold mt-1 ml-base">{errorMsg}</p>
                )}
              </div>

            </div>

            {/* Actions */}
            <div className="p-md bg-surface-container-low border-t border-outline-variant/20 flex justify-end gap-md">
              <button
                type="button"
                onClick={onClose}
                className="px-lg py-2.5 border border-outline-variant rounded-xl font-label-md text-label-sm hover:bg-surface-container-high transition-colors text-on-surface cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSigning || !user.signature}
                className={`px-xl py-2.5 rounded-xl font-label-md text-label-sm shadow active:scale-95 transition-all flex items-center justify-center gap-xs ${
                  user.signature
                    ? 'bg-primary text-on-primary hover:bg-primary-container cursor-pointer'
                    : 'bg-outline-variant text-on-surface-variant/40 cursor-not-allowed'
                }`}
              >
                {isSigning ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    Firmando...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    Estampar Firma y Confirmar
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
