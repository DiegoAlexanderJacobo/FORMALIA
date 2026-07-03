'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import ModalNuevaVenta from '@/components/ModalNuevaVenta';
import ModalEditarVenta from '@/components/ModalEditarVenta';
import ModalHistorialMonedero from '@/components/ModalHistorialMonedero';

export default function Ventas() {
  const router = useRouter();
  const { sales, deleteSale, monederoAcumulado, totalVentasMonth } = useApp();

  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMonederoOpen, setIsMonederoOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const handleEditClick = (sale) => {
    setSelectedSale(sale);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (confirm('¿Estás seguro de eliminar este registro de venta?')) {
      deleteSale(id);
    }
  };

  // Calculate real-time "Total Hoy" based on current sales (retained if needed for logs/charts, otherwise totalVentasMonth is shown in card)
  const todayStr = new Date().toISOString().split('T')[0];
  const totalHoy = sales
    .filter(s => s.date.includes(todayStr))
    .reduce((sum, s) => sum + s.amount, 0);

  // Dynamic icon selection
  const getSaleIcon = (desc, type) => {
    const d = desc.toLowerCase();
    if (type === 'minor_cut' || d.includes('ventas menores') || d.includes('monedero') || d.includes('corte')) return 'summarize';
    if (d.includes('consult') || d.includes('servicio')) return 'coffee';
    if (d.includes('pedido') || d.includes('accesorios') || d.includes('web')) return 'shopping_bag';
    if (d.includes('catering') || d.includes('comida') || d.includes('restaurant')) return 'restaurant';
    return 'receipt_long';
  };

  return (
    <main className="max-w-4xl mx-auto px-container-margin mt-8 relative min-h-[85vh] pb-24 md:pb-12 space-y-lg text-left">
      
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-on-secondary-container font-label-md text-label-md bg-secondary-container px-3 py-1 rounded-full">
            Gestión Financiera
          </span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mt-2 font-bold text-on-surface">
            Panel de Ventas
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md mt-1">
            Monitorea y registra tus ingresos del día.
          </p>
        </div>
        
        {/* Quick Summary Card */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setIsNewOpen(true)}
            className="primary-gradient text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all pulse-shadow group cursor-pointer font-bold font-label-md"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'wght' 600" }}>add</span>
            <span>Nueva Venta</span>
          </button>
          
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-secondary-container">trending_up</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Total Ventas</p>
              <p className="text-headline-md font-headline-md text-secondary font-black">
                S/ {totalVentasMonth.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Table Card */}
      <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant overflow-hidden mb-12">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Ventas Recientes</h3>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-[11px] text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-full font-bold">
              <span className="material-symbols-outlined text-xs">list_alt</span> {sales.length} Transacciones
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          {sales.length === 0 ? (
            <div className="p-xl text-center text-on-surface-variant space-y-md">
              <span className="material-symbols-outlined text-outline-variant text-[56px]">receipt</span>
              <p className="font-body-md">No tienes ventas registradas en este periodo.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-container-high/50 text-on-surface-variant font-label-md text-label-sm uppercase tracking-widest border-b border-outline-variant">
                  <th className="px-6 py-4 font-bold">Concepto / Cliente</th>
                  <th className="px-6 py-4 font-bold">Fecha</th>
                  <th className="px-6 py-4 font-bold text-right">Monto</th>
                  <th className="px-6 py-4 font-bold text-center">Estado</th>
                  <th className="px-6 py-4 font-bold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {sales.map((sale) => {
                  const isMinorCut = sale.description.toLowerCase().includes('ventas menores') || sale.type === 'minor_cut';
                  return (
                    <tr key={sale.id} className="hover:bg-surface-container-low/20 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isMinorCut ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                          }`}>
                            <span className="material-symbols-outlined">
                              {getSaleIcon(sale.description, sale.type)}
                            </span>
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface font-semibold">{sale.description}</p>
                            <p className="text-[11px] text-on-surface-variant font-semibold">
                              {isMinorCut ? 'Resumen automático diario' : 'Cliente Final'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant font-semibold">
                        {new Date(sale.date).toLocaleDateString('es-PE')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-headline-md text-headline-md text-on-surface font-bold">
                          S/ {sale.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                          Completado
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(sale)}
                            className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                            title="Editar venta"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(sale.id)}
                            className="p-1.5 rounded-lg hover:bg-error/10 text-error transition-colors cursor-pointer"
                            title="Eliminar venta"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Asymmetric Visual Support */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Monthly growth Chart Card */}
        <div className="md:col-span-7 text-left">
          <h4 className="font-headline-md text-headline-md font-bold mb-4 text-on-surface">Crecimiento Mensual</h4>
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant h-64 relative overflow-hidden flex items-end justify-between">
            
            {/* Visual Bars with heights representing growth */}
            <div className="absolute bottom-0 left-0 w-full h-full p-8 flex items-end gap-3 z-10">
              <div className="flex flex-col items-center flex-1 h-[40%] group">
                <div className="w-full bg-secondary-container/40 hover:bg-secondary-container/70 h-full rounded-t-lg transition-all duration-300 relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-secondary opacity-0 group-hover:opacity-100 transition-opacity">S/ 2.1k</span>
                </div>
                <span className="text-[10px] font-bold text-outline mt-2">Feb</span>
              </div>
              <div className="flex flex-col items-center flex-1 h-[65%] group">
                <div className="w-full bg-secondary-container/50 hover:bg-secondary-container/80 h-full rounded-t-lg transition-all duration-300 relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-secondary opacity-0 group-hover:opacity-100 transition-opacity">S/ 3.4k</span>
                </div>
                <span className="text-[10px] font-bold text-outline mt-2">Mar</span>
              </div>
              <div className="flex flex-col items-center flex-1 h-[50%] group">
                <div className="w-full bg-secondary-container/60 hover:bg-secondary-container/90 h-full rounded-t-lg transition-all duration-300 relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-secondary opacity-0 group-hover:opacity-100 transition-opacity">S/ 2.8k</span>
                </div>
                <span className="text-[10px] font-bold text-outline mt-2">Abr</span>
              </div>
              <div className="flex flex-col items-center flex-1 h-[80%] group">
                <div className="w-full bg-secondary-container/70 hover:bg-secondary-container/95 h-full rounded-t-lg transition-all duration-300 relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-secondary opacity-0 group-hover:opacity-100 transition-opacity">S/ 4.2k</span>
                </div>
                <span className="text-[10px] font-bold text-outline mt-2">May</span>
              </div>
              <div className="flex flex-col items-center flex-1 h-[95%] group">
                <div className="w-full bg-secondary-gradient bg-secondary h-full rounded-t-lg transition-all duration-300 relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-secondary opacity-0 group-hover:opacity-100 transition-opacity">S/ 4.9k</span>
                </div>
                <span className="text-[10px] font-black text-secondary mt-2">Jun</span>
              </div>
            </div>
            
            {/* Subtle Grid Lines behind bars */}
            <div className="absolute inset-x-0 bottom-8 h-48 border-y border-dashed border-outline-variant/15 flex flex-col justify-between pointer-events-none z-0">
              <div className="border-b border-dashed border-outline-variant/15 w-full h-1"></div>
              <div className="border-b border-dashed border-outline-variant/15 w-full h-1"></div>
            </div>

          </div>
        </div>

        {/* Roadmap Widget Card */}
        <div className="md:col-span-5 text-left h-full">
          <h4 className="font-headline-md text-headline-md font-bold mb-4 opacity-0 hidden md:block">Roadmap</h4>
          <div className="bg-primary text-on-primary p-8 rounded-3xl shadow-xl relative overflow-hidden group transition-transform hover:scale-[1.02] h-56 flex flex-col justify-between">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-2 text-secondary-container">shield_with_heart</span>
              <h4 className="font-headline-md text-headline-md font-bold mb-1">Formalización al 85%</h4>
              <p className="font-body-md text-body-sm opacity-90 leading-relaxed mb-4">
                Estás muy cerca de completar tu perfil tributario anual. ¡Sigue así!
              </p>
            </div>
            <div className="relative z-10">
              <button
                onClick={() => router.push('/roadmap')}
                className="bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container px-6 py-3 rounded-xl font-label-md text-label-sm font-bold transition-opacity cursor-pointer inline-block"
              >
                Completar Roadmap
              </button>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          </div>
        </div>

      </div>

      {/* Floating Action Button (FAB) for Monedero history */}
      <div className="fixed z-50 flex flex-col gap-4 right-8 bottom-8">
        <button
          onClick={() => setIsMonederoOpen(true)}
          className="w-14 h-14 bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary rounded-full shadow-lg border border-outline-variant flex items-center justify-center transition-all group relative cursor-pointer"
          title="Historial de Monedero"
        >
          <span className="material-symbols-outlined text-2xl">history</span>
          <span className="absolute right-full mr-4 bg-inverse-surface text-inverse-on-surface px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Historial Ventas Chicas
          </span>
          {monederoAcumulado > 0 && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-error rounded-full border-2 border-surface-container-lowest" />
          )}
        </button>
      </div>

      {/* Modals Mounting */}
      <ModalNuevaVenta isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} />
      {selectedSale && (
        <ModalEditarVenta
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedSale(null);
          }}
          saleData={selectedSale}
        />
      )}
      <ModalHistorialMonedero isOpen={isMonederoOpen} onClose={() => setIsMonederoOpen(false)} />

    </main>
  );
}
