'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { updateProfile } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate auth, update status in profile
    updateProfile({ loggedIn: true });
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-between relative overflow-hidden">
      {/* Background Subtle Atmospheric Element */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary-fixed-dim blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-primary-fixed blur-[100px] rounded-full"></div>
      </div>
      {/* TopAppBar */}
      <header className="w-full top-0 bg-surface shadow-sm relative z-40">
        <div className="flex justify-between items-center px-container-margin py-md w-full max-w-7xl mx-auto h-16">
          <div className="font-headline-md text-headline-md font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FORMALIA
          </div>
          <button
            onClick={() => router.push('/')}
            className="text-primary hover:opacity-80 transition-opacity font-bold font-label-md flex items-center gap-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Volver
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-container-margin py-xl max-w-md mx-auto w-full">
        {/* Logo & Title Section matching the mockup */}
        <div className="flex flex-col items-center mb-xl">
          <div className="w-16 h-16 mb-md rounded-2xl primary-gradient flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-[32px]">account_balance</span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-bold">
            FORMALIA
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-base">
            Gestión empresarial con integridad
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="w-full space-y-lg text-left">
          
          {/* Email Field */}
          <div className="space-y-xs group">
            <label className="font-label-md text-label-md text-on-surface block ml-base" htmlFor="login-email">
              Correo electrónico
            </label>
            <div className="relative flex items-center bg-white border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <span className="material-symbols-outlined text-outline mr-sm">mail</span>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline/50 outline-none"
                placeholder="correo@gmail.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-xs group">
            <div className="flex justify-between items-center ml-base">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="login-password">
                Contraseña
              </label>
              <a href="#" className="text-xs text-primary font-bold hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="relative flex items-center bg-white border border-outline-variant rounded-xl h-14 px-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <span className="material-symbols-outlined text-outline mr-sm">lock</span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline/50 outline-none"
                placeholder="Escriba aquí su contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined text-outline hover:text-primary transition-colors focus:outline-none cursor-pointer"
              >
                {showPassword ? 'visibility_off' : 'visibility'}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center px-1">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
            />
            <label className="ml-sm block font-label-sm text-label-sm text-on-surface-variant cursor-pointer" htmlFor="remember-me">
              Mantener sesión iniciada
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full h-14 brand-gradient text-white font-label-md text-label-md rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-xs cursor-pointer"
            >
              Ingresar
              <span className="material-symbols-outlined">login</span>
            </button>
          </div>

        </form>

        <p className="mt-xl text-center font-label-sm text-label-sm text-on-surface-variant">
          ¿Aún no tienes cuenta?{' '}
          <button
            onClick={() => router.push('/onboarding')}
            className="text-primary font-bold underline decoration-primary/30 hover:text-primary/80"
          >
            Regístrate aquí
          </button>
        </p>
      </main>

      <footer className="w-full py-md text-center border-t border-outline-variant/20 bg-surface-container-low font-label-sm text-on-surface-variant z-10">
        FORMALIA © 2026. Todos los derechos reservados.
      </footer>

      {/* Side Imagery (Subtle Desktop Only Decoration) */}
      <div className="hidden xl:block absolute left-10 bottom-10 w-64 h-64 opacity-10 pointer-events-none z-0">
        <div
          className="w-full h-full bg-cover rounded-full mix-blend-multiply"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEU57E4cx4RK7Rvq0SP-eVsT0BJXzebOQSZfLLJwJBMBTX183IU5u8zzeTw7G45NyKVgXNfwgJrvqRSXmXCSfa45EKHvqctjTXii3Or0T17_f-ITVVAG_ABeDToxegb40RlZ570hDhDR0tXX7-bcdRL8dO5cWzpiUgXhMOhyMQoqMASsJkpPrKUKpYY-DaK4CfGoehotstRZFzyHFg7Hu322ZVnCnhIISxSXJwL-Ud6YbVsgStvlDd26g5QZ7c-IQtMcbJ8UiD_yZt')" }}
        />
      </div>
    </div>
  );
}
