'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import ModalNuevaCompra from '@/components/ModalNuevaCompra';
import ModalEditarCompraComponent from '@/components/ModalEditarCompra';

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

  // Calculations for stats grid
  const totalCompras = purchases.reduce((sum, p) => sum + p.amount, 0);
  const uniqueSuppliersCount = new Set(purchases.map(p => p.ruc)).size;
  const verifiedCount = purchases.length; // All added are validated in the demo

  // Helper supplier mapping based on mock RUCs
  const getSupplierName = (ruc) => {
    const suppliers = {
      '20551234567': 'Suministros Global S.A.',
      '20448765432': 'Muebles & Diseño E.I.R.L.',
      '20123456789': 'Distribuidora Alianza SAC',
      '20556677889': 'Enel Distribución Perú',
      '20998877665': 'Logística Rápida S.A.',
    };
    return suppliers[ruc] || `Proveedor RUC ${ruc}`;
  };

  // Helper icon selection
  const getSupplierIcon = (ruc) => {
    const icons = {
      '20551234567': 'shopping_cart',
      '20448765432': 'inventory_2',
      '20556677889': 'electric_bolt',
      '20998877665': 'warning',
    };
    return icons[ruc] || 'receipt';
  };

  return (
    <main className="max-w-7xl mx-auto px-container-margin py-8 relative min-h-[85vh] space-y-lg text-left">
      
      {/* Hero Section / Escudo Legal */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg mb-xl">
        <div className="lg:col-span-8 bg-primary rounded-3xl p-lg flex flex-col md:flex-row items-center gap-lg relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none"></div>
          <div className="z-10 flex-1">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-xs font-black">
              Escudo Legal de Compras
            </h1>
            <p className="font-body-md text-body-md opacity-90 max-w-md leading-relaxed">
              Cada factura registrada es un ladrillo en la fortaleza de tu negocio. Formaliza tus gastos y reduce tu carga tributaria con precisión institucional.
            </p>
          </div>
          <div className="z-10 flex flex-col items-center justify-center p-md bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm min-w-[160px]">
            <span className="material-symbols-outlined text-[48px] mb-xs text-secondary-container">shield_with_heart</span>
            <span className="font-label-md text-label-md font-bold">Deducción Activa</span>
            <span className="font-headline-md text-headline-md font-black text-secondary-container">100%</span>
          </div>
        </div>

        {/* Add Invoice CTA (Desktop context) */}
        <div className="lg:col-span-4 flex flex-col gap-md">
          <div className="bg-surface-container-highest rounded-3xl p-lg flex flex-col justify-between flex-1 border border-outline-variant">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-xs font-bold">Gestión de Proveedores</h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant font-semibold leading-normal">
                Mantén un registro impecable de tus compras para optimizar el flujo de caja.
              </p>
            </div>
            <button
              onClick={() => setIsNewOpen(true)}
              className="primary-gradient w-full py-4 px-lg rounded-xl text-white font-label-md text-label-md flex items-center justify-center gap-xs mt-lg hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Registrar Factura
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid (Bento Style) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
        <div className="bg-white p-lg rounded-3xl shadow-sm border border-outline-variant/30 border-l-4 border-primary text-left">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Total Compras</span>
          <div className="font-headline-md text-headline-md font-black text-primary mt-1">
            S/ {totalCompras.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-white p-lg rounded-3xl shadow-sm border border-outline-variant/30 border-l-4 border-secondary text-left">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Facturas Validadas</span>
          <div className="font-headline-md text-headline-md font-black text-secondary mt-1">
            {verifiedCount}
          </div>
        </div>
        <div className="bg-white p-lg rounded-3xl shadow-sm border border-outline-variant/30 border-l-4 border-tertiary-container text-left">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Proveedores</span>
          <div className="font-headline-md text-headline-md font-black text-tertiary-container mt-1">
            {uniqueSuppliersCount}
          </div>
        </div>
        <div className="bg-white p-lg rounded-3xl shadow-sm border border-outline-variant/30 border-l-4 border-error text-left">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Pendientes</span>
          <div className="font-headline-md text-headline-md font-black text-error mt-1">
            0
          </div>
        </div>
      </section>

      {/* Invoice List */}
      <section className="space-y-sm">
        <div className="flex items-center justify-between mb-lg text-left">
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Historial de Facturas</h3>
          <div className="flex gap-xs">
            <span className="flex items-center gap-1 text-[11px] text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-full font-bold">
              <span className="material-symbols-outlined text-xs">receipt_long</span> {purchases.length} Facturas
            </span>
          </div>
        </div>

        <div className="space-y-sm">
          {purchases.length === 0 ? (
            <div className="p-xl bg-white rounded-3xl border border-outline-variant/30 text-center text-on-surface-variant space-y-md">
              <span className="material-symbols-outlined text-outline-variant text-[56px]">receipt_long</span>
              <p className="font-body-md">No tienes compras registradas en este periodo.</p>
            </div>
          ) : (
            purchases.map((purchase) => {
              const r = purchase.ruc;
              const isWarning = r === '20998877665'; // simulated warning if any
              return (
                <div
                  key={purchase.id}
                  className="invoice-card bg-white p-md rounded-2xl shadow-sm flex items-center gap-md border border-outline-variant hover:border-primary transition-transform hover:scale-[1.005] duration-200 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isWarning ? 'bg-error-container text-on-error-container' : 'bg-primary-fixed text-primary'
                  }`}>
                    <span className="material-symbols-outlined">
                      {getSupplierIcon(r)}
                    </span>
                  </div>

                  <div className="flex-grow grid grid-cols-2 md:grid-cols-4 items-center gap-md">
                    <div className="text-left">
                      <div className="font-label-md text-label-md text-on-surface font-bold">
                        {getSupplierName(r)}
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                        RUC: {r}
                      </div>
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Factura #</div>
                      <div className="font-label-md text-label-md font-bold">{purchase.factura}</div>
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Fecha</div>
                      <div className="font-label-md text-label-md font-bold">
                        {new Date(purchase.date).toLocaleDateString('es-PE')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-headline-md text-headline-md font-bold text-primary pr-md">
                        S/ {purchase.amount.toFixed(2)}
                      </div>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                        isWarning ? 'bg-error-container text-error' : 'bg-secondary-container text-on-secondary-container'
                      }`}>
                        {isWarning ? 'Pendiente' : 'Validado'}
                      </span>
                      <div className="flex justify-end gap-xs mt-2 pr-md">
                        <button
                          onClick={() => handleEditClick(purchase)}
                          className="p-1 hover:bg-primary/10 rounded-full text-primary transition-colors cursor-pointer"
                          title="Editar factura"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(purchase.id)}
                          className="p-1 hover:bg-error/10 rounded-full text-error transition-colors cursor-pointer"
                          title="Eliminar factura"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Modals Mounting */}
      <ModalNuevaCompra isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} />
      {selectedPurchase && (
        <ModalEditarCompraComponent
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
