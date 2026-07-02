'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import ModalNuevaVenta from '@/components/ModalNuevaVenta';
import ModalEditarVenta from '@/components/ModalEditarVenta';
import ModalHistorialMonedero from '@/components/ModalHistorialMonedero';

export default function Ventas() {
  const { sales, deleteSale, monederoAcumulado } = useApp();

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

  return (
    <main className="max-w-4xl mx-auto px-container-margin mt-8 relative min-h-[85vh] pb-24 md:pb-12 space-y-lg text-left">
      
      {/* Header Area */}
      <section className="flex justify-between items-center border-b border-outline-variant/20 pb-md">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary font-bold">
            Registro de Ventas
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Administra tus boletas emitidas y las integraciones del monedero del Nuevo RUS.
          </p>
        </div>
        
        <button
          onClick={() => setIsNewOpen(true)}
          className="gradient-primary text-on-primary px-lg py-md rounded-xl font-label-md text-label-md flex items-center justify-center gap-xs shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer font-bold shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nueva Venta
        </button>
      </section>

      {/* Main List */}
      <div className="bg-white rounded-3xl shadow-sm border border-surface-container overflow-hidden">
        {sales.length === 0 ? (
          <div className="p-xl text-center text-on-surface-variant space-y-md">
            <span className="material-symbols-outlined text-outline-variant text-[56px]">receipt</span>
            <p className="font-body-md">No tienes ventas registradas en este periodo.</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/10">
            {sales.map((sale) => {
              const isMinorCut = sale.description.toLowerCase().includes('ventas menores') || sale.type === 'minor_cut';
              return (
                <div
                  key={sale.id}
                  className="p-md flex items-center justify-between hover:bg-surface-container-low/40 transition-colors"
                >
                  <div className="flex items-center gap-md">
                    {/* Icon based on sale type */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isMinorCut ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-fixed text-primary'
                    }`}>
                      <span className="material-symbols-outlined">
                        {isMinorCut ? 'account_balance_wallet' : 'receipt'}
                      </span>
                    </div>

                    <div className="space-y-0.5 text-left">
                      <h4 className="font-label-md text-label-md text-on-surface font-semibold">
                        {sale.description}
                      </h4>
                      <div className="flex gap-md text-[11px] text-on-surface-variant font-medium">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">calendar_today</span>
                          {new Date(sale.date).toLocaleDateString('es-PE')}
                        </span>
                        <span className="uppercase tracking-wider font-semibold text-outline text-[10px]">
                          {isMinorCut ? 'Corte Diario' : 'Boleta'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-lg">
                    <span className="font-headline-md text-headline-md text-primary font-extrabold pr-md">
                      S/ {sale.amount.toFixed(2)}
                    </span>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-xs">
                      <button
                        onClick={() => handleEditClick(sale)}
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-xl transition-colors cursor-pointer"
                        title="Editar venta"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(sale.id)}
                        className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/10 rounded-xl transition-colors cursor-pointer"
                        title="Eliminar venta"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) for Monedero history */}
      <button
        onClick={() => setIsMonederoOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
        title="Historial de Monedero"
      >
        <span className="material-symbols-outlined">schedule</span>
        {monederoAcumulado > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border border-white" />
        )}
      </button>

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
