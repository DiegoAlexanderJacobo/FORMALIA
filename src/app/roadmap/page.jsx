'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import ModalFirma from '@/components/ModalFirma';

export default function Roadmap() {
  const router = useRouter();
  const { user, roadmapMissions, updateProfile, completeMission } = useApp();
  const [isFirmaOpen, setIsFirmaOpen] = useState(false);
  const [activeInstruction, setActiveInstruction] = useState(null);

  const handleNodeClick = (mission) => {
    if (mission.status === 'locked') {
      alert('Esta misión está bloqueada. Debes completar las misiones anteriores primero.');
      return;
    }

    if (mission.id === 1) {
      if (mission.status === 'completed') {
        alert('Ya obtuviste tu RUC 10 y está validado en el sistema.');
      } else {
        // Active: prompt to enter RUC
        const rucVal = prompt('Por favor, ingresa tu RUC de 11 dígitos para completar esta misión:', '10472819301');
        if (rucVal && rucVal.length === 11) {
          updateProfile({ ruc: rucVal, hasRuc: true });
          alert('¡RUC registrado y validado con éxito!');
        } else if (rucVal) {
          alert('El RUC debe tener exactamente 11 dígitos.');
        }
      }
    } else if (mission.id === 2) {
      if (mission.status === 'completed') {
        alert('Ya firmaste tu formulario FUT y se guardó en La Bóveda.');
      } else {
        // Open signing modal
        if (!user.signature) {
          alert('Primero debes dibujar tu firma digital en tu Perfil para poder estamparla en el documento.');
          router.push('/perfil');
        } else {
          setIsFirmaOpen(true);
        }
      }
    } else if (mission.id === 3) {
      if (mission.status === 'completed') {
        alert('¡Misión cumplida! Registraste tu primera venta mayor en el sistema.');
      } else {
        setActiveInstruction({
          title: 'Emitir Boleta / Registrar Venta',
          content: 'Para completar esta misión, dirígete a la sección de Ventas y registra tu primera venta mayor de S/ 5.00 con boleta. Esto simulará el cumplimiento operativo de tu negocio.'
        });
      }
    } else if (mission.id === 4) {
      if (mission.status === 'completed') {
        alert('¡Ya completaste tu primer cierre de impuestos y estás en el camino formal!');
      } else {
        setActiveInstruction({
          title: 'Cerrar primer mes',
          content: 'Genera tu Guía de Pago Fácil desde el Dashboard para formalizar el abono de tu impuesto RUS del mes. Esto registrará tu pago simulado en La Bóveda.'
        });
      }
    }
  };

  // Get coordinates for Roadmap nodes along a sinuous path in mobile aspect
  // Node 1 (Obtener RUC) -> Top right
  // Node 2 (Firma FUT) -> Middle left
  // Node 3 (Primera Boleta) -> Middle right
  // Node 4 (Primer Cierre) -> Bottom middle
  const nodeStyles = [
    { id: 1, top: '150px', left: '70%' },
    { id: 2, top: '350px', left: '20%' },
    { id: 3, top: '550px', left: '70%' },
    { id: 4, top: '720px', left: '48%' },
  ];

  return (
    <main className="flex-grow flex flex-col items-center justify-start py-8 px-container-margin relative overflow-hidden min-h-[90vh]">
      
      {/* Background Ambience */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-secondary-container/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary-fixed/10 blur-3xl rounded-full -z-10"></div>

      {/* Header */}
      <div className="w-full max-w-md mx-auto text-center mb-12">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 text-primary font-bold">
          Tu Camino al Éxito
        </h1>
        <p className="text-on-surface-variant font-body-md">
          Formaliza tu negocio paso a paso de manera guiada y desbloquea beneficios exclusivos.
        </p>

        {/* Level Stats Bar */}
        <div className="mt-6 bg-surface-container-low rounded-2xl p-4 flex items-center justify-between shadow-sm border border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined">stars</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">Roadmap actual</p>
              <p className="font-headline-md text-headline-md text-primary font-bold">Nivel: Emprendedor</p>
            </div>
          </div>
          <div className="w-16 h-16 relative flex items-center justify-center">
            {/* Simple circular percentage */}
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-surface-container-high" cx="32" cy="32" fill="transparent" r="26" stroke="currentColor" strokeWidth={6}></circle>
              <circle
                className="text-secondary transition-all duration-1000"
                cx="32"
                cy="32"
                fill="transparent"
                r="26"
                stroke="currentColor"
                strokeWidth={6}
                strokeDasharray="163"
                strokeDashoffset={163 - (roadmapMissions.filter(m => m.status === 'completed').length / 4) * 163}
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-secondary">
              {Math.round((roadmapMissions.filter(m => m.status === 'completed').length / 4) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Gamified Roadmap Board */}
      <div className="relative w-full max-w-md mx-auto min-h-[850px] flex flex-col items-center">
        
        {/* Sinuous S-Curve Path SVG */}
        <svg className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none" fill="none" viewBox="0 0 400 900">
          <path
            d="M 200 50 C 320 100, 360 220, 270 300 C 120 400, 60 480, 150 600 C 240 700, 300 720, 200 850"
            stroke="#e3e1e9"
            strokeLinecap="round"
            strokeWidth="12"
          />
          {/* Active progress colored path based on completed steps */}
          <path
            d="M 200 50 C 320 100, 360 220, 270 300 C 120 400, 60 480, 150 600 C 240 700, 300 720, 200 850"
            stroke="url(#roadGrad)"
            strokeLinecap="round"
            strokeWidth="12"
            strokeDasharray="1000"
            strokeDashoffset={
              1000 - (roadmapMissions.filter(m => m.status === 'completed').length / 4) * 1000
            }
            className="path-svg"
          />
          <defs>
            <linearGradient id="roadGrad" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00236f', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#006c49', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>

        {/* Render interactive nodes */}
        {roadmapMissions.map((mission, idx) => {
          const style = nodeStyles[idx];
          const isCompleted = mission.status === 'completed';
          const isActive = mission.status === 'active';
          
          return (
            <div
              key={mission.id}
              onClick={() => handleNodeClick(mission)}
              className="absolute flex flex-col items-center group cursor-pointer"
              style={{ top: style.top, left: style.left, transform: 'translateX(-50%)' }}
            >
              <div className="relative">
                {/* Glow ring for active node */}
                {isActive && (
                  <div className="node-pulse absolute -inset-2 rounded-full bg-primary/20" />
                )}

                {/* Node circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-all group-hover:scale-110 active:scale-95 ${
                    isCompleted
                      ? 'bg-secondary text-white'
                      : isActive
                      ? 'bg-gradient-to-tr from-primary to-secondary text-white node-heartbeat'
                      : 'bg-surface-dim text-outline border-surface-container-highest cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  ) : isActive ? (
                    <span className="material-symbols-outlined text-3xl">
                      {mission.id === 1 && 'business'}
                      {mission.id === 2 && 'draw'}
                      {mission.id === 3 && 'receipt_long'}
                      {mission.id === 4 && 'account_balance'}
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-2xl">lock</span>
                  )}
                </div>

                {/* Urgent indicator on Active step */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center font-bold text-xs border-2 border-white animate-bounce z-20">
                    !
                  </div>
                )}
              </div>

              {/* Mission Label banner */}
              <div className={`mt-2 px-4 py-1.5 rounded-full shadow-sm border transition-all ${
                isCompleted
                  ? 'bg-white border-secondary-container text-secondary font-bold'
                  : isActive
                  ? 'bg-white border-primary-container text-primary font-black floating'
                  : 'bg-surface-container-high border-outline-variant/30 text-outline'
              }`}>
                <span className="text-[11px] uppercase tracking-wider block text-center font-semibold">
                  {mission.title}
                </span>
              </div>
            </div>
          );
        })}

      </div>

      {/* Dynamic Instruction Modal */}
      {activeInstruction && (
        <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setActiveInstruction(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-md p-lg shadow-2xl border border-outline-variant/30 animate-toast text-left space-y-md">
            <h3 className="font-headline-md text-headline-md font-bold text-primary">
              {activeInstruction.title}
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              {activeInstruction.content}
            </p>
            <div className="flex justify-end pt-sm">
              <button
                onClick={() => setActiveInstruction(null)}
                className="px-lg py-2 bg-primary text-white rounded-xl font-label-md hover:bg-primary-container transition-all cursor-pointer font-bold shadow-md shadow-primary/10"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FUT Document Signature Modal */}
      <ModalFirma isOpen={isFirmaOpen} onClose={() => setIsFirmaOpen(false)} />

    </main>
  );
}
