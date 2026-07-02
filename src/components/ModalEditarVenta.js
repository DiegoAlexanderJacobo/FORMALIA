'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export default function ModalEditarVenta({ isOpen, onClose, saleData }) {
  const { editSale } = useApp();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // Prefill when open
  useEffect(() => {
    if (saleData) {
      setAmount(saleData.amount.toString());
      setDescription(saleData.description || '');
      setDate(saleData.date || '');
    }
  }, [saleData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0 || !saleData) return;

    editSale(saleData.id, {
      amount: parseFloat(amount),
      description,
      date,
    });

    onClose();
  };

  if (!isOpen || !saleData) return null;

  return (
    <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-outline-variant/30 animate-toast">
        {/* Header */}
        <div className="p-lg bg-surface-container flex justify-between items-center border-b border-outline-variant/20">
          <div className="flex items-center gap-sm text-primary">
            <span className="material-symbols-outlined text-2xl">edit_note</span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Editar Venta</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-lg space-y-lg">
            {/* Amount Input */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="edit-amount">
                Monto de la Venta (S/)
              </label>
              <div className="relative flex items-center bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-outline mr-sm">payments</span>
                <input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface outline-none"
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="edit-date">
                Fecha de Emisión
              </label>
              <div className="relative flex items-center bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-outline mr-sm">calendar_today</span>
                <input
                  id="edit-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="edit-description">
                Detalles / Descripción
              </label>
              <div className="relative flex items-start bg-surface-container-lowest border border-outline-variant rounded-xl p-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-outline mr-sm mt-0.5">description</span>
                <textarea
                  id="edit-description"
                  rows="3"
                  placeholder="Detalles de la venta..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none resize-none"
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
