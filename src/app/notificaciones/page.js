'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Notificaciones() {
  const router = useRouter();
  const {
    notifications,
    markAllNotifsRead,
    deleteNotification,
    triggerDailyCorte,
    monederoAcumulado,
    totalVentasMonth,
  } = useApp();

  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAction = (notif) => {
    if (notif.action === 'cierre') {
      if (confirm(`¿Confirmas realizar el cierre del monedero por S/ ${monederoAcumulado.toFixed(2)}?`)) {
        triggerDailyCorte();
        triggerToast('¡Cierre de caja realizado con éxito!');
      }
    } else if (notif.action === 'presentar') {
      router.push('/roadmap');
    }
  };

  // Group notifications into categories
  const urgentNotifs = notifications.filter(n => n.type === 'urgent');
  const normalNotifs = notifications.filter(n => n.type !== 'urgent');

  return (
    <main className="max-w-7xl mx-auto px-container-margin py-lg pb-32 relative text-left">
      
      {/* Toast banner */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-lg py-md rounded-2xl shadow-xl flex items-center gap-xs font-label-md toast-slide-up">
          <span className="material-symbols-outlined text-secondary">check_circle</span>
          {toastMessage}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-lg">
        
        {/* Left Side Summary Cards */}
        <div className="w-full md:w-1/3 flex flex-col gap-md">
          <div className="bg-white p-lg rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-surface-container border-l-4 border-primary">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-xs">Resumen del Día</h2>
            <p className="text-on-surface-variant font-body-md text-xs">
              Tu agenda operativa. Mantén al día tu monedero y evita notificaciones críticas de SUNAT.
            </p>
            
            <div className="mt-lg space-y-md">
              <div className="flex items-center gap-md p-sm bg-surface-container-low rounded-xl border border-outline-variant/10">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </div>
                <div className="text-left">
                  <p className="font-label-sm text-[10px] text-on-surface-variant font-bold">Monedero acumulado</p>
                  <p className="font-headline-md text-lg text-primary font-black">S/ {monederoAcumulado.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-lg rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-surface-container">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold">Ventas Mensuales</h3>
              <span className="text-secondary font-black text-[11px]">Tope S/ 8,000</span>
            </div>
            <div className="w-full bg-surface-container h-3 rounded-full mb-lg overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: `${Math.min(100, (totalVentasMonth / 8000) * 100)}%` }}
              ></div>
            </div>
            
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-2.5 rounded-xl gradient-primary text-white font-label-md text-xs font-bold flex items-center justify-center gap-xs shadow active:scale-[0.98] transition-transform cursor-pointer"
            >
              Ir al Panel Central
            </button>
          </div>
        </div>

        {/* Right Side Alerts Listing */}
        <div className="w-full md:w-2/3 flex flex-col gap-md">
          <div className="flex items-center justify-between px-xs">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-black">
              Buzón de Notificaciones
            </h1>
            
            {notifications.some(n => !n.read) && (
              <button
                onClick={() => {
                  markAllNotifsRead();
                  triggerToast('Todas las notificaciones leídas.');
                }}
                className="text-primary font-bold text-xs hover:underline cursor-pointer"
              >
                Marcar leídas
              </button>
            )}
          </div>

          {/* List display */}
          <div className="flex flex-col gap-md">
            
            {/* Urgent Alerts section */}
            {urgentNotifs.length > 0 && (
              <section className="flex flex-col gap-sm">
                <h4 className="font-label-sm text-[11px] text-error font-black uppercase px-xs tracking-widest">
                  Urgente
                </h4>
                {urgentNotifs.map((notif) => (
                  <div
                    key={notif.id}
                    className={`bg-white p-lg rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-surface-container border-l-4 border-error hover:bg-surface-bright transition-colors relative group`}
                  >
                    <div className="flex gap-md">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center text-on-error-container">
                        <span className="material-symbols-outlined">warning</span>
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className="flex justify-between items-start mb-xs gap-sm">
                          <h3 className="font-headline-md text-sm text-on-surface font-bold">
                            {notif.title}
                          </h3>
                          <span className="text-[10px] text-outline shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-on-surface-variant font-body-md text-xs leading-relaxed mb-md">
                          {notif.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          {notif.action && (
                            <button
                              onClick={() => handleAction(notif)}
                              className="px-md py-1.5 bg-primary text-white rounded-lg font-label-md text-xs font-bold active:opacity-80 transition-all cursor-pointer shadow-sm shadow-primary/10"
                            >
                              Presentar ahora
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="text-on-surface-variant/40 hover:text-error text-xs font-bold hover:underline cursor-pointer ml-auto flex items-center gap-0.5"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Operational Alerts section */}
            <section className="flex flex-col gap-sm mt-md">
              <h4 className="font-label-sm text-[11px] text-outline font-black uppercase px-xs tracking-widest">
                Operacionales e Informativos
              </h4>
              
              {normalNotifs.length === 0 && urgentNotifs.length === 0 ? (
                <div className="bg-white p-xl rounded-3xl border border-surface-container text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[56px] text-outline-variant">mail_outline</span>
                  <p className="text-sm mt-sm">No tienes alertas pendientes en tu buzón.</p>
                </div>
              ) : (
                normalNotifs.map((notif) => {
                  const isWarning = notif.type === 'warning';
                  return (
                    <div
                      key={notif.id}
                      className={`bg-white p-lg rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-surface-container border-l-4 hover:bg-surface-bright transition-all ${
                        isWarning ? 'border-secondary' : 'border-primary-fixed-dim'
                      } ${notif.read ? 'opacity-70' : ''}`}
                    >
                      <div className="flex gap-md">
                        <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isWarning ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-fixed text-primary'
                        }`}>
                          <span className="material-symbols-outlined">
                            {isWarning ? 'event_available' : 'info'}
                          </span>
                        </div>
                        
                        <div className="flex-1 text-left">
                          <div className="flex justify-between items-start mb-xs gap-sm">
                            <h3 className="font-headline-md text-sm text-on-surface font-bold">
                              {notif.title}
                            </h3>
                            <span className="text-[10px] text-outline shrink-0">{notif.time}</span>
                          </div>
                          <p className="text-on-surface-variant font-body-md text-xs leading-relaxed mb-md">
                            {notif.description}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            {notif.action && !notif.read && (
                              <button
                                onClick={() => handleAction(notif)}
                                className="px-md py-1.5 bg-secondary text-white rounded-lg font-label-md text-xs font-bold active:opacity-80 transition-all cursor-pointer shadow-sm shadow-secondary/10"
                              >
                                Realizar Cierre
                              </button>
                            )}

                            <button
                              onClick={() => deleteNotification(notif.id)}
                              className="text-on-surface-variant/40 hover:text-error text-xs font-bold hover:underline cursor-pointer ml-auto flex items-center gap-0.5"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </section>

          </div>
        </div>

      </div>
    </main>
  );
}
