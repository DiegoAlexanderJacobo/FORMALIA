'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import ModalNuevaVenta from '@/components/ModalNuevaVenta';
import ModalHistorialMonedero from '@/components/ModalHistorialMonedero';

export default function Dashboard() {
  const router = useRouter();
  const {
    user,
    currentMonth,
    sales,
    purchases,
    monederoAcumulado,
    totalVentasMonth,
    totalComprasMonth,
    sunatInfo,
    triggerDailyCorte,
    addTrustPoints,
    addDocument,
    addSale,
    addPurchase,
  } = useApp();

  // Modals visibility
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [isMonederoOpen, setIsMonederoOpen] = useState(false);
  
  // Toast notifications for action feedback
  const [toastMessage, setToastMessage] = useState('');
  const [showDevPanel, setShowDevPanel] = useState(true);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // SUNAT Guide generator
  const handleGenerateGuide = () => {
    addDocument({
      name: `Guia_Pago_Facil_${currentMonth.replace(' ', '_')}.pdf`,
      size: '420 KB',
      type: 'pdf',
    });
    showToast('¡Guía de Pago Fácil generada en La Bóveda!');
    addTrustPoints(30);
  };

  // Determine dynamically based on Category
  const currentCategory = sunatInfo?.categoria || 1;
  const limitValue = currentCategory === 1 ? 5000 : 8000;

  // Progress bar percentages (capped at 100)
  const salesPercent = Math.min(100, (totalVentasMonth / limitValue) * 100);
  const purchasesPercent = Math.min(100, (totalComprasMonth / limitValue) * 100);

  // Helper function to get color for progress bars based on percentage
  const getProgressColorClass = (percent) => {
    if (percent <= 70) return 'bg-secondary'; // Green
    if (percent <= 90) return 'bg-amber-500'; // Amber
    return 'bg-error'; // Crimson/Red
  };

  const getProgressBgColorClass = (percent) => {
    if (percent <= 70) return 'bg-secondary-container/20';
    if (percent <= 90) return 'bg-amber-100';
    return 'bg-error-container/20';
  };

  // Demo panel simulations
  const simulateRandomSale = () => {
    const amount = Math.floor(Math.random() * 800) + 100;
    addSale({
      amount,
      description: 'Venta simulada de ababarrotes',
      date: new Date().toISOString().split('T')[0],
      type: 'normal'
    });
    showToast(`Venta de S/ ${amount} añadida al historial.`);
  };

  const simulateRandomPurchase = () => {
    const amount = Math.floor(Math.random() * 800) + 200;
    addPurchase({
      amount,
      ruc: '20123456789',
      factura: `F002-000${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString().split('T')[0]
    });
    showToast(`Compra de S/ ${amount} registrada.`);
  };

  return (
    <main className="max-w-7xl mx-auto px-container-margin py-lg space-y-lg">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-lg py-md rounded-2xl shadow-xl flex items-center gap-xs font-label-md toast-slide-up">
          <span className="material-symbols-outlined text-secondary">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Header & Welcome */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-surface font-extrabold">
            Centro de Mando
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Bienvenido de nuevo, <span className="font-bold text-primary">{user.name}</span>. Tu negocio está progresando hacia la formalidad.
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex items-center bg-surface-container-high p-1.5 rounded-2xl shadow-sm border border-outline-variant/30">
          <button className="p-2 hover:bg-surface-container-lowest rounded-xl transition-all active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-on-surface">chevron_left</span>
          </button>
          <div className="px-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
            <span className="font-label-md text-on-surface font-bold">{currentMonth}</span>
          </div>
          <button className="p-2 hover:bg-surface-container-lowest rounded-xl transition-all active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-on-surface">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Main Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        
        {/* Sales Card (Left Large) */}
        <div className="md:col-span-8 bento-card p-xl flex flex-col justify-between min-h-[260px] relative overflow-hidden group border-t-4 border-secondary text-left">
          <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
          
          <div>
            <div className="flex items-center gap-xs text-secondary mb-xs">
              <span className="material-symbols-outlined text-[24px]">payments</span>
              <span className="font-label-md uppercase tracking-wider font-bold">Ventas del Mes</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-xs">
                <span className="font-headline-lg text-[40px] md:text-[48px] text-on-surface font-black">
                  S/ {totalVentasMonth.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-secondary font-label-md text-label-sm flex items-center gap-xs bg-secondary-container px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  +12% vs mayo
                </span>
              </div>
              <p className="font-label-sm text-on-surface-variant leading-relaxed">
                Incluye tus ventas mayores (boletas) y ventas rápidas diarias (monedero).
              </p>
            </div>
          </div>

          <div className="flex gap-md items-center mt-xl relative z-10">
            <button
              onClick={() => setIsNewSaleOpen(true)}
              className="text-on-primary font-label-md text-label-md px-lg py-sm rounded-full flex items-center gap-xs pulse-shadow hover:scale-105 active:scale-95 transition-all primary-gradient cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Nueva Venta
            </button>
            <button
              onClick={() => router.push('/ventas')}
              className="text-primary border border-outline-variant hover:bg-surface-container-low font-label-md text-label-md px-lg py-sm rounded-full active:scale-95 transition-all cursor-pointer font-semibold"
            >
              Ver Historial
            </button>
          </div>
        </div>

        {/* SUNAT Projection Card (Right) */}
        <div className="md:col-span-4 bento-card p-xl border-l-4 border-primary bg-surface-container-lowest flex flex-col justify-between text-left">
          <div className="flex justify-between items-start mb-md">
            <div className="space-y-xs">
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider block font-bold">Proyección SUNAT</span>
              <h2 className="font-headline-md text-[32px] text-primary font-black">
                {sunatInfo.categoria ? `S/ ${sunatInfo.cuota.toFixed(2)}` : 'Fuera RUS'}
              </h2>
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-white mt-1"
                style={{ backgroundColor: sunatInfo.color }}
              >
                {sunatInfo.label}
              </span>
            </div>
            <div className="bg-primary-fixed text-primary p-3 rounded-2xl">
              <span className="material-symbols-outlined text-2xl">receipt_long</span>
            </div>
          </div>
          
          <div className="p-md bg-surface-container-low rounded-xl mb-4 flex-grow">
            <p className="font-label-sm text-on-surface-variant leading-relaxed text-xs">
              {sunatInfo.categoria ? (
                `Basado en tus operaciones de este mes, tu cuota proyectada para el Nuevo RUS es de categoría ${sunatInfo.categoria} (Paga S/ ${sunatInfo.cuota}).`
              ) : (
                <span className="text-error font-bold block">{sunatInfo.alert}</span>
              )}
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleGenerateGuide}
              className="w-full bg-primary text-on-primary py-sm rounded-xl font-label-md text-label-md flex items-center justify-center gap-xs hover:bg-primary-container transition-colors shadow-sm cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              Generar Guía de Pago
            </button>
            <button
              onClick={() => router.push('/roadmap')}
              className="w-full text-on-surface-variant font-label-sm text-label-sm text-center flex items-center justify-center hover:underline gap-1 cursor-pointer font-semibold"
            >
              Ver desglose tributario
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Monedero de Hoy Quick-Action Card */}
        <div
          onClick={() => setIsMonederoOpen(true)}
          className="md:col-span-4 bento-card p-lg cursor-pointer hover:bg-surface-container-low transition-colors group text-left flex flex-col justify-between min-h-[160px]"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span className="font-label-md text-label-md font-bold">Monedero (Hoy)</span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push('/venta-rapida');
              }}
              className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center hover:rotate-90 transition-transform cursor-pointer shadow"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          <div>
            <span className="text-xs text-on-surface-variant block">Ingresos ≤ S/ 5.00</span>
            <div className="flex items-baseline gap-xs">
              <span className="font-headline-lg text-2xl font-black text-secondary">
                S/ {monederoAcumulado.toFixed(2)}
              </span>
              <span className="text-[10px] text-secondary font-bold uppercase animate-pulse">En curso</span>
            </div>
          </div>
          
          <div className="text-[10px] text-outline border-t border-outline-variant/10 pt-2 flex items-center justify-between">
            <span>Ver historial de 7 días</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </div>
        </div>

        {/* Termómetro de Ventas Card */}
        <div className="md:col-span-4 bento-card p-lg text-left flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex justify-between items-center mb-xs">
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] text-secondary">speed</span>
                <span className="font-label-md text-label-md font-bold">Termómetro de Ventas</span>
              </div>
              <span className="text-xs font-black text-on-surface">S/ {limitValue.toLocaleString()} Límite</span>
            </div>
            
            <p className="text-[11px] text-on-surface-variant leading-tight mb-5">
              {currentCategory === 1 ? (
                <>
                  Estás en la Categoría 1. Si superas este límite pasarás a la{' '}
                  <span className="text-amber-600 font-bold">Categoría 2</span> (cuota de S/ 50).
                </>
              ) : (
                "Evita exceder el tope mensual de S/ 8,000 del Nuevo RUS para no ser multado o salir del régimen."
              )}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline font-semibold">Consumo</span>
              <span className={`font-bold text-label-sm ${salesPercent > 90 ? 'text-error' : salesPercent > 70 ? 'text-amber-500' : 'text-secondary'}`}>
                {salesPercent.toFixed(0)}%
              </span>
            </div>
            
            <div className="w-full bg-surface-container h-3.5 rounded-full overflow-hidden">
              <div
                className={`h-full progress-bar-fill rounded-full ${getProgressColorClass(salesPercent)}`}
                style={{ width: `${salesPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-on-surface-variant font-semibold text-right mt-1">
              Monto de ventas: S/ {totalVentasMonth.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Termómetro de Compras Card */}
        <div className="md:col-span-4 bento-card p-lg text-left flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex justify-between items-center mb-xs">
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] text-primary">shield</span>
                <span className="font-label-md text-label-md font-bold">Escudo de Compras</span>
              </div>
              <span className="text-xs font-black text-on-surface">S/ {limitValue.toLocaleString()} Límite</span>
            </div>
            
            <p className="text-[11px] text-on-surface-variant leading-tight mb-5">
              Tus facturas de compra sustentan tu mercadería frente a decomisos.{' '}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline font-semibold">Consumo</span>
              <span className={`font-bold text-label-sm ${purchasesPercent > 90 ? 'text-error' : purchasesPercent > 70 ? 'text-amber-500' : 'text-primary'}`}>
                {purchasesPercent.toFixed(0)}%
              </span>
            </div>
            
            <div className="w-full bg-surface-container h-3.5 rounded-full overflow-hidden">
              <div
                className={`h-full progress-bar-fill rounded-full ${getProgressColorClass(purchasesPercent)}`}
                style={{ width: `${purchasesPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-on-surface-variant font-semibold text-right mt-1">
              Monto de compras: S/ {totalComprasMonth.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

      </div>

      {/* DEV / SIMULATOR TOOL PANEL OR INSIGHT CARD */}
      {showDevPanel ? (
        <section className="bg-surface-container-high/40 p-lg rounded-[28px] border-2 border-dashed border-outline-variant/50 text-left space-y-md mt-xl animate-toast">
          <div className="flex justify-between items-center border-b border-outline-variant/30 pb-xs">
            <div className="flex items-center gap-sm text-primary">
              <span className="material-symbols-outlined">construction</span>
              <h3 className="font-label-md text-label-md font-bold uppercase tracking-wider">
                Consola de Simulación (Demostración)
              </h3>
            </div>
            <button
              onClick={() => setShowDevPanel(false)}
              className="text-xs text-on-surface-variant hover:text-error font-bold flex items-center gap-xs cursor-pointer"
            >
              Ocultar consola
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            Utiliza estos accesos rápidos para simular las dinámicas de tiempo, ingresos, y recompensas del Nuevo RUS de cara al usuario.
          </p>

          <div className="flex flex-wrap gap-md">
            <button
              onClick={simulateRandomSale}
              className="px-md py-2 bg-white hover:bg-surface-container-low border border-outline-variant/30 rounded-xl font-label-sm text-xs text-primary font-bold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Simular Venta (+S/ 100-900)
            </button>

            <button
              onClick={simulateRandomPurchase}
              className="px-md py-2 bg-white hover:bg-surface-container-low border border-outline-variant/30 rounded-xl font-label-sm text-xs text-primary font-bold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Simular Compra (+S/ 200-1000)
            </button>

            <button
              onClick={() => {
                triggerDailyCorte();
                showToast('¡Corte de caja de las 8:00 PM simulado con éxito!');
              }}
              className="px-md py-2 bg-secondary text-white rounded-xl font-label-sm text-xs font-bold shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              Forzar Corte 8:00 PM (Cierre diario)
            </button>

            <button
              onClick={() => {
                addTrustPoints(100);
                showToast('¡Se han añadido 100 puntos al Índice de Confiabilidad!');
              }}
              className="px-md py-2 bg-primary text-white rounded-xl font-label-sm text-xs font-bold shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">stars</span>
              Aumentar Puntos (+100)
            </button>
          </div>
        </section>
      ) : (
        /* Insight Card shown when console is hidden */
        <div className="md:col-span-12 bento-card p-xl flex flex-col md:flex-row gap-xl items-center text-left mt-xl">
          <div className="flex-shrink-0 w-full md:w-48 h-32 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 primary-gradient opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Financial growth visualization" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqoe7xBufafHsccxQvTmHDC5qNhWeSZ7SruGczf-d6Y8Bx2NpponHm7qeav-zzfLUixC-1qUDRnp8KzmvB64yrdsQt3JamxlyI6SJODEdLNrXhq9CTkyrk8fqfCj9Fb4RS8Dt0nBI8lc9jGr_1KwV-2RZR3wSKAnteB9pmb9fpIDceoe7TsbripUE1y-J6CoA6yLqS3VTom1VBcxB3sqXV45Q60-Vfg8Omeyu1W9tG71aSV3AKKqjWJFgLZz06XDe40a1K7szyy6Dz"/>
          </div>
          <div className="flex-grow">
            <h4 className="font-headline-md text-headline-md text-on-surface mb-xs">Formalizar es crecer</h4>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              Has registrado un 15% más de boletas que el mes pasado. Esta consistencia mejora tu perfil crediticio con bancos locales.
            </p>
            <div className="flex flex-wrap gap-md">
              <span className="px-md py-xs bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span> Perfil: Confiable
              </span>
              <span className="px-md py-xs bg-primary-fixed text-primary rounded-full font-label-sm text-label-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> Meta: Expansión
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowDevPanel(true)}
            title="Mostrar consola de simulación"
            className="material-symbols-outlined text-outline p-2 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer"
          >
            more_vert
          </button>
        </div>
      )}

      {/* Modals Mounting */}
      <ModalNuevaVenta isOpen={isNewSaleOpen} onClose={() => setIsNewSaleOpen(false)} />
      <ModalHistorialMonedero isOpen={isMonederoOpen} onClose={() => setIsMonederoOpen(false)} />

    </main>
  );
}
