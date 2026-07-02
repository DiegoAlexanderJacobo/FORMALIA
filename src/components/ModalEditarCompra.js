'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export default function ModalEditarCompra({ isOpen, onClose, purchaseData }) {
  const { editPurchase } = useApp();
  const [amount, setAmount] = useState('');
  const [ruc, setRuc] = useState('');
  const [factura, setFactura] = useState('');
  const [date, setDate] = useState('');

  // Prefill when open
  useEffect(() => {
    if (purchaseData) {
      setAmount(purchaseData.amount.toString());
      setRuc(purchaseData.ruc || '');
      setFactura(purchaseData.factura || '');
      setDate(purchaseData.date || '');
    }
  }, [purchaseData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0 || !ruc || !factura || !purchaseData) return;

    editPurchase(purchaseData.id, {
      amount: parseFloat(amount),
      ruc,
      factura,
      date,
    });

    onClose();
  };

  const handleRucChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setRuc(value);
  };

  if (!isOpen || !purchaseData) return null;

  return (
    <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-outline-variant/30 animate-toast">
        {/* Header */}
        <div className="p-lg bg-surface-container flex justify-between items-center border-b border-outline-variant/20">
          <div className="flex items-center gap-sm text-primary">
            <span className="material-symbols-outlined text-2xl">edit_document</span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Editar Compra</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-lg space-y-md">
            
            {/* RUC Proveedor */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="edit-ruc-proveedor">
                RUC del Proveedor
              </label>
              <div className="relative flex items-center bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-outline mr-sm">business</span>
                <input
                  id="edit-ruc-proveedor"
                  type="text"
                  required
                  placeholder="20XXXXXXXXX"
                  value={ruc}
                  onChange={handleRucChange}
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                />
              </div>
            </div>

            {/* Número de Factura */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="edit-factura-num">
                N° de Factura
              </label>
              <div className="relative flex items-center bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-outline mr-sm">tag</span>
                <input
                  id="edit-factura-num"
                  type="text"
                  required
                  placeholder="F001-0000123"
                  value={factura}
                  onChange={(e) => setFactura(e.target.value.toUpperCase())}
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                />
              </div>
            </div>

            {/* Monto de la Compra */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="edit-compra-amount">
                Monto de la Compra (S/)
              </label>
              <div className="relative flex items-center bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-outline mr-sm">payments</span>
                <input
                  id="edit-compra-amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface outline-none"
                />
              </div>
            </div>

            {/* Fecha de Emisión */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="edit-compra-date">
                Fecha de Emisión
              </label>
              <div className="relative flex items-center bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-outline mr-sm">calendar_today</span>
                <input
                  id="edit-compra-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                />
              </div>
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
              className="px-xl py-2.5 bg-secondary hover:bg-on-secondary-container text-on-secondary rounded-xl font-label-md text-label-sm shadow active:scale-95 transition-all cursor-pointer"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
