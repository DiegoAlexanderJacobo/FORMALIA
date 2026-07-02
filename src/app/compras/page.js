'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import ModalNuevaCompra from '@/components/ModalNuevaCompra';
import ModalEditarCompra from '@/components/ModalEditarCompra';

export default function Compras() {
  const { purchases, deletePurchase } = useApp();

  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const handleEditClick = (purchase) => {
    setSelectedPurchase(purchase);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (confirm('¿Deseas eliminar este registro de compra?')) {
      deletePurchase(id);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-container-margin py-8 relative min-h-[85vh] space-y-lg text-left">
      
      {/* Header Area */}
      <section className="flex justify-between items-center border-b border-outline-variant/20 pb-md">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary font-bold">
            Registro de Compras (Escudo Legal)
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Registra tus facturas de proveedores para sustentar tu mercadería y controlar tus límites.
          </p>
        </div>
        
        <button
          onClick={() => setIsNewOpen(true)}
          className="gradient-primary text-on-primary px-lg py-md rounded-xl font-label-md text-label-md flex items-center justify-center gap-xs shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer font-bold shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Registrar Factura
        </button>
      </section>

      {/* Main List */}
      <div className="bg-white rounded-3xl shadow-sm border border-surface-container overflow-hidden">
        {purchases.length === 0 ? (
          <div className="p-xl text-center text-on-surface-variant space-y-md">
            <span className="material-symbols-outlined text-outline-variant text-[56px]">receipt_long</span>
            <p className="font-body-md">No tienes compras registradas en este periodo.</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/10">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="p-md flex items-center justify-between hover:bg-surface-container-low/40 transition-colors"
              >
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary-container/10 text-on-tertiary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">shield</span>
                  </div>

                  <div className="space-y-0.5 text-left">
                    <h4 className="font-label-md text-label-md text-on-surface font-semibold">
                      Factura {purchase.factura}
                    </h4>
                    <div className="flex flex-wrap gap-x-md gap-y-1 text-[11px] text-on-surface-variant font-medium">
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">business</span>
                        RUC: {purchase.ruc}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">calendar_today</span>
                        {new Date(purchase.date).toLocaleDateString('es-PE')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-lg">
                  <span className="font-headline-md text-headline-md text-primary font-extrabold pr-md">
                    S/ {purchase.amount.toFixed(2)}
                  </span>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-xs">
                    <button
                      onClick={() => handleEditClick(purchase)}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-xl transition-colors cursor-pointer"
                      title="Editar compra"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(purchase.id)}
                      className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/10 rounded-xl transition-colors cursor-pointer"
                      title="Eliminar compra"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals Mounting */}
      <ModalNuevaCompra isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} />
      {selectedPurchase && (
        <ModalEditarCompra
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedPurchase(null);
          }}
          purchaseData={selectedPurchase}
        />
      )}

    </main>
  );
}
