'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export default function ModalHistorialMonedero({ isOpen, onClose }) {
  const { monederoAcumulado, monederoHistory, triggerDailyCorte } = useApp();
  const [timeLeft, setTimeLeft] = useState('');

  // Calculate hours left until 8:00 PM (20:00)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(20, 0, 0, 0); // 8:00 PM

      if (now > target) {
        // If it is past 8 PM, show hours until tomorrow's 8 PM
        target.setDate(target.getDate() + 1);
      }

      const diffMs = target - now;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`Faltan ${diffHrs} horas y ${diffMins} minutos para las 8:00 PM`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-outline-variant/30 animate-toast">
        {/* Header */}
        <div className="p-lg bg-surface-container flex justify-between items-center border-b border-outline-variant/20">
          <div className="flex items-center gap-sm text-primary">
            <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Historial del Monedero</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-lg space-y-md">
          <div className="bg-primary-container/10 p-md rounded-2xl flex justify-between items-center border border-primary/10">
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Acumulado del día</p>
              <h4 className="font-headline-md text-2xl text-primary font-extrabold">S/ {monederoAcumulado.toFixed(2)}</h4>
            </div>
            <button
              onClick={() => {
                triggerDailyCorte();
                onClose();
              }}
              disabled={monederoAcumulado <= 0}
              className={`px-md py-2 rounded-xl font-label-md text-label-sm shadow transition-all ${
                monederoAcumulado > 0
                  ? 'bg-secondary text-on-secondary hover:scale-102 active:scale-95 cursor-pointer'
                  : 'bg-outline-variant text-on-surface-variant/40 cursor-not-allowed'
              }`}
            >
              Hacer Corte (8 PM)
            </button>
          </div>

          <div className="space-y-sm">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline block">Caja Chica - Últimos 7 Días</span>
            
            <div className="space-y-sm max-h-64 overflow-y-auto custom-scrollbar pr-1">
              {monederoHistory.map((day, idx) => {
                const isCurrent = day.status === 'en_curso';
                const formattedDate = new Date(day.date).toLocaleDateString('es-PE', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short'
                });
                
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-sm rounded-xl border transition-colors ${
                      isCurrent
                        ? 'bg-secondary-container/15 border-secondary'
                        : 'bg-surface-container-lowest border-outline-variant/30'
                    }`}
                  >
                    <div>
                      <p className="font-label-md text-label-md text-on-surface capitalize font-semibold">
                        {formattedDate}
                      </p>
                      {isCurrent && (
                        <p className="text-[10px] text-secondary font-semibold mt-0.5 animate-pulse">
                          {timeLeft}
                        </p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <span className={`font-headline-md text-label-md ${isCurrent ? 'text-secondary font-bold' : 'text-on-surface-variant'}`}>
                        S/ {day.amount.toFixed(2)}
                      </span>
                      <span className={`block text-[9px] uppercase tracking-tighter ${
                        isCurrent ? 'text-secondary font-bold' : 'text-outline'
                      }`}>
                        {isCurrent ? 'En Curso' : 'Día finalizado'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-md bg-surface-container-low border-t border-outline-variant/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-lg py-2 border border-outline-variant rounded-xl font-label-md text-label-sm hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
