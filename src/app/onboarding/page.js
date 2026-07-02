'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateProfile, completeMission } = useApp();

  const [step, setStep] = useState(1);

  // Paso 1 State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Paso 2 State
  const [dni, setDni] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Paso 3 State: Signature Canvas
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Paso 4 State: RUC
  const [hasRuc, setHasRuc] = useState(true);
  const [rucNum, setRucNum] = useState('');

  // Canvas context setups
  useEffect(() => {
    if (step === 3 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#00236f'; // brand primary
    }
  }, [step]);

  // Stepper validation helpers
  const isStep1Valid = email.includes('@') && email.includes('.') && password.length >= 8 && password === confirmPassword;
  const isStep2Valid = dni.length === 8 && name.trim().length > 3 && address.trim().length > 5;
  const isStep3Valid = hasDrawn;
  const isStep4Valid = !hasRuc || rucNum.length === 11;

  // Drawing handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Get mouse/touch coords relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Stepper submit handlers
  const handleStepSubmit = (e) => {
    e.preventDefault();

    if (step === 1 && isStep1Valid) {
      setStep(2);
    } else if (step === 2 && isStep2Valid) {
      setStep(3);
    } else if (step === 3 && isStep3Valid) {
      // Capture signature from canvas and store in profile state
      const canvas = canvasRef.current;
      const signatureDataUrl = canvas.toDataURL();
      updateProfile({ signature: signatureDataUrl });
      setStep(4);
    } else if (step === 4 && isStep4Valid) {
      // Finish onboarding
      updateProfile({
        email,
        dni,
        name,
        address,
        ruc: hasRuc ? rucNum : '',
        hasRuc,
        registrationDone: true,
        loggedIn: true,
      });

      if (hasRuc && rucNum.length === 11) {
        completeMission(1);
      }

      router.push('/dashboard');
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body-md text-left">
      {/* Navbar header */}
      <header className="w-full top-0 sticky bg-surface shadow-sm z-40 h-16">
        <div className="flex justify-between items-center px-container-margin py-md w-full max-w-7xl mx-auto h-full">
          <span className="font-headline-md text-headline-md font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FORMALIA
          </span>
          <button className="text-on-surface-variant hover:opacity-80 transition-opacity flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">help_outline</span>
          </button>
        </div>
      </header>

      {/* Main Stepper Frame */}
      <main className="flex-grow flex flex-col items-center justify-start px-container-margin py-lg max-w-lg mx-auto w-full">
        {/* Stepper components */}
        <div className="w-full mb-xl">
          <div className="flex justify-between items-center mb-xs">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
              Paso {step} de 4
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {step === 1 && 'Credenciales'}
              {step === 2 && 'Datos Personales'}
              {step === 3 && 'Firma Digital'}
              {step === 4 && 'Formalización'}
            </span>
          </div>
          <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        {/* Stepper Forms */}
        <form onSubmit={handleStepSubmit} className="w-full flex-grow flex flex-col">
          
          {/* STEP 1: CREDENTIALS */}
          {step === 1 && (
            <div className="space-y-lg flex-grow">
              <div className="text-left mb-xl">
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg text-primary mb-xs">
                  Crea tu cuenta
                </h1>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Comencemos con tus credenciales de acceso para proteger tu negocio.
                </p>
              </div>

              {/* Email */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="email">
                  Correo electrónico
                </label>
                <div className="relative flex items-center bg-white border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-outline mr-sm">mail</span>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="nombre@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                  />
                  {email.includes('@') && email.includes('.') && (
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="password">
                  Contraseña
                </label>
                <div className="relative flex items-center bg-white border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-outline mr-sm">lock</span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Contraseña de acceso"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="material-symbols-outlined text-outline cursor-pointer"
                  >
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-xs mt-base ml-base">
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${password.length >= 8 ? 'bg-secondary' : 'bg-outline-variant'}`} />
                    <span className={`font-label-sm text-label-sm ${password.length >= 8 ? 'text-secondary' : 'text-outline'}`}>
                      8+ caracteres
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="confirm-password">
                  Confirmar contraseña
                </label>
                <div className="relative flex items-center bg-white border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-outline mr-sm">lock</span>
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Repite la contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="material-symbols-outlined text-outline cursor-pointer"
                  >
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-error font-semibold ml-base mt-1">Las contraseñas no coinciden.</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: PERSONAL DATA */}
          {step === 2 && (
            <div className="space-y-lg flex-grow">
              <div className="text-left mb-xl">
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg text-primary mb-xs">
                  Datos Personales
                </h1>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Ingresa tus datos de identidad para la generación de tus formularios y sustentos tributarios.
                </p>
              </div>

              {/* DNI */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="dni">
                  DNI (Documento Nacional de Identidad)
                </label>
                <div className="relative flex items-center bg-white border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-outline mr-sm">badge</span>
                  <input
                    id="dni"
                    type="text"
                    required
                    maxLength={8}
                    placeholder="8 dígitos"
                    value={dni}
                    onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                  />
                  {dni.length === 8 && (
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                  )}
                </div>
              </div>

              {/* Nombres */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="fullname">
                  Nombres y Apellidos completos
                </label>
                <div className="relative flex items-center bg-white border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-outline mr-sm">person</span>
                  <input
                    id="fullname"
                    type="text"
                    required
                    placeholder="Como figura en tu DNI"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none"
                  />
                </div>
              </div>

              {/* Dirección fiscal */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="address">
                  Domicilio Fiscal (Dirección de tu negocio/casa)
                </label>
                <div className="relative flex items-start bg-white border border-outline-variant rounded-xl p-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-outline mr-sm mt-0.5">home_pin</span>
                  <textarea
                    id="address"
                    rows="3"
                    required
                    placeholder="Ej. Av. Gran Chimú 456, San Juan de Lurigancho, Lima"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DIGITAL SIGNATURE */}
          {step === 3 && (
            <div className="space-y-lg flex-grow flex flex-col">
              <div className="text-left mb-xl">
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-xs">Firma Digital</h1>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Dibuja tu firma en el recuadro para estamparla rápidamente en tus trámites de formalización.
                </p>
              </div>

              {/* Canvas area */}
              <div className="relative w-full aspect-[4/3] bg-surface-container-lowest rounded-[24px] border border-outline-variant shadow-sm overflow-hidden flex flex-col group transition-all duration-300">
                <div className="absolute top-4 right-4 text-on-surface-variant/30 pointer-events-none group-focus-within:text-primary/50">
                  <span className="material-symbols-outlined text-[32px]">draw</span>
                </div>
                
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={300}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="signature-canvas w-full h-full z-10"
                />

                {!hasDrawn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300">
                    <span className="material-symbols-outlined text-outline-variant text-[48px] mb-xs">edit</span>
                    <p className="font-label-sm text-label-sm text-outline">Dibuja aquí con tu dedo o mouse</p>
                  </div>
                )}
              </div>

              {/* Clear button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="flex items-center gap-xs font-label-md text-label-md text-error hover:opacity-75 transition-opacity py-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Limpiar Firma
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RUC STATUS */}
          {step === 4 && (
            <div className="space-y-lg flex-grow">
              <div className="text-left mb-xl">
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-sm">
                  ¿Ya cuentas con RUC 10?
                </h1>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Esto nos ayudará a configurar tu Roadmap de formalización de manera personalizada.
                </p>
              </div>

              {/* Bifurcation cards */}
              <div className="w-full space-y-md">
                
                {/* Yes RUC */}
                <div
                  onClick={() => setHasRuc(true)}
                  className={`p-lg rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    hasRuc
                      ? 'bg-surface-container-lowest border-primary shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                      : 'bg-surface-container-low border-outline-variant/30 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-md mb-md">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasRuc ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>
                      <span className="material-symbols-outlined">lock</span>
                    </div>
                    <h2 className="font-label-md text-label-md text-on-surface">Sí, tengo mi RUC 10</h2>
                  </div>

                  {hasRuc && (
                    <div className="relative mb-2" onClick={(e) => e.stopPropagation()}>
                      <label className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-primary uppercase tracking-tighter" htmlFor="ruc-input">
                        Número de RUC
                      </label>
                      <input
                        id="ruc-input"
                        type="text"
                        maxLength={11}
                        placeholder="10XXXXXXXXX"
                        value={rucNum}
                        onChange={(e) => setRucNum(e.target.value.replace(/\D/g, '').slice(0, 11))}
                        className="w-full h-14 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-md font-body-lg tracking-[0.2em] outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center py-sm">
                  <div className="flex-grow h-[1px] bg-outline-variant/30"></div>
                  <span className="px-md font-label-sm text-label-sm text-outline">O</span>
                  <div className="flex-grow h-[1px] bg-outline-variant/30"></div>
                </div>

                {/* No RUC */}
                <button
                  type="button"
                  onClick={() => {
                    setHasRuc(false);
                    setRucNum('');
                  }}
                  className={`w-full p-lg rounded-xl border-2 border-dashed flex items-center justify-between transition-colors group cursor-pointer ${
                    !hasRuc
                      ? 'border-secondary bg-secondary-container/10'
                      : 'border-outline-variant bg-surface-container-lowest hover:border-secondary'
                  }`}
                >
                  <div className="flex items-center gap-md">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!hasRuc ? 'bg-secondary text-white' : 'bg-secondary-container text-on-secondary-container'}`}>
                      <span className="material-symbols-outlined">add_circle</span>
                    </div>
                    <div className="text-left">
                      <span className="block font-label-md text-label-md text-on-surface">Aún no tengo RUC</span>
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">Quiero tramitarlo con Formalia</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">
                    chevron_right
                  </span>
                </button>

              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-xl grid grid-cols-2 gap-md pt-lg border-t border-outline-variant/20">
            <button
              type="button"
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else router.push('/');
              }}
              className="w-full flex items-center justify-center py-md rounded-xl border border-outline-variant bg-surface-container-lowest font-label-md text-label-md text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={
                (step === 1 && !isStep1Valid) ||
                (step === 2 && !isStep2Valid) ||
                (step === 3 && !isStep3Valid) ||
                (step === 4 && !isStep4Valid)
              }
              className={`w-full flex items-center justify-center py-md rounded-xl font-label-md text-label-md font-bold shadow transition-all flex items-center justify-center gap-xs cursor-pointer ${
                ((step === 1 && isStep1Valid) ||
                 (step === 2 && isStep2Valid) ||
                 (step === 3 && isStep3Valid) ||
                 (step === 4 && isStep4Valid))
                  ? 'bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95'
                  : 'bg-outline-variant text-on-surface-variant/40 cursor-not-allowed shadow-none'
              }`}
            >
              {step === 4 ? (
                <>
                  Finalizar
                  <span className="material-symbols-outlined">rocket_launch</span>
                </>
              ) : (
                <>
                  Siguiente
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}
