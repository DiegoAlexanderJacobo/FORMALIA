'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function VentaRapida() {
  const router = useRouter();
  const { addQuickSale } = useApp();
  
  const [amountStr, setAmountStr] = useState('0');
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const parsedAmount = parseFloat(amountStr) / 100;

  const handleKeyPress = (key) => {
    setErrorMsg('');
    if (key === 'clear') {
      setAmountStr('0');
    } else if (key === 'backspace') {
      if (amountStr.length <= 1) {
        setAmountStr('0');
      } else {
        setAmountStr(amountStr.slice(0, -1));
      }
    } else {
      // Append number digits
      const newStr = amountStr === '0' ? key : amountStr + key;
      
      // Safety limit: avoid integer overflow in typing
      if (newStr.length > 6) return;

      const newParsed = parseFloat(newStr) / 100;
      if (newParsed > 5.00) {
        setErrorMsg('El monedero rápido solo permite ventas de hasta S/ 5.00.');
        return;
      }

      setAmountStr(newStr);
    }
  };

  const handleRegister = () => {
    if (parsedAmount <= 0) {
      setErrorMsg('Por favor introduce un monto mayor a S/ 0.00.');
      return;
    }
    if (parsedAmount > 5.00) {
      setErrorMsg('Monto máximo permitido en Venta Rápida es S/ 5.00.');
      return;
    }

    // Add to monedero
    addQuickSale(parsedAmount);

    // Show success animation
    setSuccess(true);
    
    // Redirect to dashboard after 1.2s
    setTimeout(() => {
      setSuccess(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-between items-center text-center">
      
      {/* Header bar */}
      <header className="w-full bg-white shadow-sm h-16 flex items-center px-container-margin justify-between">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-on-surface-variant flex items-center gap-xs font-label-md cursor-pointer hover:opacity-75"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Cancelar
        </button>
        <span className="font-headline-md text-headline-md font-bold text-secondary">Venta Rápida</span>
        <div className="w-12 h-12 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            account_balance_wallet
          </span>
        </div>
      </header>

      {success ? (
        /* SUCCESS ANIMATION VIEW */
        <main className="flex-grow flex flex-col items-center justify-center space-y-md animate-toast">
          <div className="w-24 h-24 rounded-full bg-secondary-container text-secondary flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
            <span className="material-symbols-outlined text-[72px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
          <h2 className="font-headline-lg text-secondary font-black">S/ {parsedAmount.toFixed(2)}</h2>
          <p className="font-headline-md text-on-surface font-bold">¡Venta Registrada!</p>
          <p className="font-label-sm text-outline">Sumado al monedero acumulado de hoy.</p>
        </main>
      ) : (
        /* KEYPAD ENTRY VIEW */
        <main className="flex-grow w-full max-w-md flex flex-col justify-between py-lg px-container-margin">
          
          {/* Display screen */}
          <div className="py-xl space-y-md">
            <p className="text-sm font-bold text-outline uppercase tracking-wider">Monto a cobrar</p>
            <div className="flex flex-col items-center">
              <span className={`font-black text-[56px] tracking-tight transition-all duration-150 ${parsedAmount > 0 ? 'text-primary' : 'text-outline/40'}`}>
                S/ {parsedAmount.toFixed(2)}
              </span>
              {errorMsg ? (
                <span className="text-xs text-error font-bold mt-1 block">{errorMsg}</span>
              ) : (
                <span className="text-[11px] text-on-surface-variant font-semibold">Exclusivo para ventas ≤ S/ 5.00</span>
              )}
            </div>
          </div>

          {/* Touch Keypad */}
          <div className="space-y-lg">
            
            {/* Keypad Grid */}
            <div className="grid grid-cols-3 gap-y-md gap-x-md text-2xl font-bold">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyPress(num.toString())}
                  className="h-16 rounded-2xl bg-white hover:bg-surface-container border border-outline-variant/20 flex items-center justify-center text-primary font-bold shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  {num}
                </button>
              ))}
              
              <button
                type="button"
                onClick={() => handleKeyPress('clear')}
                className="h-16 rounded-2xl bg-surface-container-high/40 hover:bg-surface-container border border-outline-variant/20 flex items-center justify-center text-on-surface-variant text-base cursor-pointer"
              >
                C
              </button>
              
              <button
                type="button"
                onClick={() => handleKeyPress('0')}
                className="h-16 rounded-2xl bg-white hover:bg-surface-container border border-outline-variant/20 flex items-center justify-center text-primary font-bold shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                0
              </button>
              
              <button
                type="button"
                onClick={() => handleKeyPress('backspace')}
                className="h-16 rounded-2xl bg-surface-container-high/40 hover:bg-surface-container border border-outline-variant/20 flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined">backspace</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-md pt-lg border-t border-outline-variant/10">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="w-full h-14 bg-surface-container-high/60 hover:bg-surface-container text-on-surface-variant font-label-md rounded-xl flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              >
                Atrás
              </button>
              
              <button
                type="button"
                onClick={handleRegister}
                disabled={parsedAmount <= 0}
                className={`w-full h-14 font-label-md rounded-xl flex items-center justify-center gap-xs shadow-lg transition-all active:scale-95 font-bold cursor-pointer ${
                  parsedAmount > 0
                    ? 'bg-secondary text-on-secondary shadow-secondary/20 hover:scale-[1.02]'
                    : 'bg-outline-variant text-on-surface-variant/40 cursor-not-allowed shadow-none'
                }`}
              >
                Registrar
                <span className="material-symbols-outlined text-[18px]">done</span>
              </button>
            </div>

          </div>

        </main>
      )}

    </div>
  );
}
