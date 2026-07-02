'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { updateProfile } = useApp();
  const [email, setEmail] = useState('jose.vasquez@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate auth, update status in profile
    updateProfile({ loggedIn: true });
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-between">
      {/* TopAppBar */}
      <header className="w-full top-0 bg-surface shadow-sm z-40">
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
        {/* Header Content */}
        <div className="w-full text-left mb-xl">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-xs">
            Iniciar Sesión
          </h1>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Ingresa tus credenciales para acceder a tu cuaderno de control inteligente.
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
                placeholder="nombre@empresa.com"
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
                placeholder="••••••••"
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

          {/* Submit Button */}
          <div className="pt-md">
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

      <footer className="w-full py-md text-center border-t border-outline-variant/20 bg-surface-container-low font-label-sm text-on-surface-variant">
        FORMALIA © 2026. Todos los derechos reservados.
      </footer>
    </div>
  );
}
