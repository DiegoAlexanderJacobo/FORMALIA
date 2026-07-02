'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* TopNavBar */}
      <header className="bg-surface-container-lowest shadow-sm sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full px-container-margin h-16 max-w-7xl mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary">FORMALIA</div>
          <div className="hidden md:flex items-center space-x-lg">
            <Link href="/login" className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">
              Iniciar Sesión
            </Link>
            <Link href="/onboarding" className="gradient-primary text-on-primary px-lg py-sm rounded-xl font-label-md text-label-md btn-pulse transition-all">
              Comenzar gratis
            </Link>
          </div>
          <div className="flex md:hidden items-center gap-md">
            <Link href="/login" className="text-sm font-bold text-primary px-3 py-1.5 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors">
              Ingresar
            </Link>
            <Link href="/onboarding" className="text-sm bg-primary text-white px-3 py-1.5 rounded-xl font-bold">
              Registro
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32 px-container-margin">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-xl items-center">
            
            {/* Text details */}
            <div className="order-2 md:order-1 space-y-lg text-left">
              <div className="inline-flex items-center gap-xs bg-secondary-container text-on-secondary-container px-md py-base rounded-full">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                <span className="font-label-md text-label-sm uppercase tracking-wider font-semibold">
                  Formalización Inteligente
                </span>
              </div>
              
              <h1 className="font-headline-lg-mobile md:font-headline-lg md:text-[48px] md:leading-tight text-on-surface">
                Formaliza tu negocio <span className="text-gradient font-extrabold">sin complicaciones</span>
              </h1>
              
              <p className="font-body-lg text-on-surface-variant max-w-lg leading-relaxed">
                Lucho ya está haciendo crecer su tienda. Únete a miles de emprendedores que transforman su negocio informal en una empresa establecida con herramientas digitales de confianza.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-md pt-md">
                <button
                  onClick={() => router.push('/onboarding')}
                  className="gradient-primary text-on-primary px-xl py-md rounded-xl font-headline-md flex items-center justify-center gap-sm btn-pulse transition-all cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02]"
                >
                  Comenzar ahora
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <Link
                  href="#features"
                  className="bg-surface-container-lowest border border-outline-variant text-primary px-xl py-md rounded-xl font-headline-md hover:bg-surface-container-low transition-all text-center flex items-center justify-center"
                >
                  Saber más
                </Link>
              </div>
            </div>

            {/* Hero Image / Illustration */}
            <div className="order-1 md:order-2 relative flex justify-center items-center">
              <div className="absolute -z-10 w-full h-full gradient-primary opacity-5 rounded-full blur-3xl scale-110"></div>
              <div className="relative w-full max-w-md aspect-square rounded-[40px] overflow-hidden shadow-2xl border-4 border-surface-container-lowest bg-surface-container-low">
                
                {/* Visual merchant photo */}
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800')" }} />
                
                {/* Floating Micro-card */}
                <div className="absolute bottom-6 right-6 bg-surface-container-lowest/90 backdrop-blur-md p-md rounded-xl shadow-lg border border-white/20 animate-bounce">
                  <div className="flex items-center gap-sm">
                    <div className="bg-secondary-container p-2 rounded-lg text-on-secondary-container">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-label-md text-on-surface">Impuestos al día</div>
                      <div className="font-label-sm text-on-surface-variant">Estado: Cumplido</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Bento Grid Highlights Section */}
        <section id="features" className="bg-surface-container-low py-20 px-container-margin">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-surface mb-md">
                Tu camino a la formalidad
              </h2>
              <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
                Nuestra plataforma centraliza todo lo que necesitas para operar legalmente y crecer con bases sólidas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              
              {/* Roadmap Bento Card */}
              <div className="bento-card md:col-span-2 bg-surface-container-lowest p-xl rounded-[24px] shadow-sm border-l-4 border-primary relative overflow-hidden group text-left">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-primary text-[40px] mb-lg">map</span>
                  <h3 className="font-headline-md text-on-surface mb-sm">Roadmap de Crecimiento</h3>
                  <p className="font-body-md text-on-surface-variant max-w-md mb-xl">
                    Una guía paso a paso personalizada para tu tipo de negocio. Sabe exactamente qué sigue para tu formalización.
                  </p>
                  
                  {/* Internal Mockup Progress */}
                  <div className="w-full max-w-md bg-surface-container-low rounded-xl p-md">
                    <div className="flex justify-between items-center mb-xs">
                      <span className="font-label-md text-on-surface">Progreso de registro</span>
                      <span className="font-label-md text-secondary font-bold">65%</span>
                    </div>
                    <div className="w-full bg-surface-variant h-3 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[65%] rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-500 text-primary">
                  <span className="material-symbols-outlined text-[200px]">insights</span>
                </div>
              </div>

              {/* Monedero Bento Card */}
              <div className="bento-card bg-surface-container-lowest p-xl rounded-[24px] shadow-sm border-l-4 border-secondary flex flex-col justify-between text-left">
                <div>
                  <span className="material-symbols-outlined text-secondary text-[40px] mb-lg">wallet</span>
                  <h3 className="font-headline-md text-on-surface mb-sm">Monedero Inteligente</h3>
                  <p className="font-body-md text-on-surface-variant">
                    Controla tus flujos de caja rápidos de S/ 5.00 o menos y agrúpalos automáticamente al final del día.
                  </p>
                </div>
                <div className="mt-xl flex items-center gap-sm text-secondary font-label-md cursor-pointer hover:underline">
                  Explorar transacciones
                  <span className="material-symbols-outlined">chevron_right</span>
                </div>
              </div>

              {/* Bóveda Bento Card */}
              <div className="bento-card bg-surface-container-lowest p-xl rounded-[24px] shadow-sm border-l-4 border-tertiary-container md:col-span-1 text-left">
                <span className="material-symbols-outlined text-on-tertiary-container text-[40px] mb-lg">folder_zip</span>
                <h3 className="font-headline-md text-on-surface mb-sm">Bóveda de Documentos</h3>
                <p className="font-body-md text-on-surface-variant mb-4">
                  Tus permisos, RUC y certificados tributarios firmados en un solo lugar seguro y siempre accesible.
                </p>
                <div className="mt-lg flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-surface-container-lowest bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">description</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface-container-lowest bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface-container-lowest bg-primary-container flex items-center justify-center text-on-primary-container">
                    <span className="font-label-sm font-bold">+3</span>
                  </div>
                </div>
              </div>

              {/* Reports Bento Card */}
              <div className="bento-card bg-surface-container-highest p-xl rounded-[24px] md:col-span-2 relative overflow-hidden flex flex-col md:flex-row items-center gap-lg text-left">
                <div className="flex-1">
                  <h3 className="font-headline-md text-on-surface mb-sm">Reportes al instante</h3>
                  <p className="font-body-md text-on-surface-variant">
                    Visualiza el estado de tu salud fiscal con gráficos claros y alertas de fechas importantes para evitar multas.
                  </p>
                </div>
                <div className="w-full md:w-64 bg-white/20 p-2 rounded-2xl border border-white/30 shadow-md">
                  <div className="bg-primary/5 rounded-xl p-md space-y-sm text-left">
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Historial de Ventas</span>
                    <div className="flex justify-between items-end h-20 gap-2">
                      <div className="w-full bg-secondary rounded-t-md h-[40%] animate-pulse"></div>
                      <div className="w-full bg-secondary rounded-t-md h-[60%] animate-pulse"></div>
                      <div className="w-full bg-secondary rounded-t-md h-[50%] animate-pulse"></div>
                      <div className="w-full bg-secondary rounded-t-md h-[85%] animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Bottom Section */}
        <section className="py-24 px-container-margin">
          <div className="max-w-5xl mx-auto gradient-primary rounded-[32px] p-xl md:p-24 text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4"></div>
            
            <div className="relative z-10 space-y-xl">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-primary mb-lg font-bold">
                ¿Listo para dar el siguiente paso?
              </h2>
              <p className="font-body-lg text-white/80 max-w-2xl mx-auto mb-xl">
                Únete a la nueva era de comerciantes formalizados. Menos burocracia, más crecimiento.
              </p>
              <div className="flex flex-col sm:flex-row gap-md justify-center">
                <button
                  onClick={() => router.push('/onboarding')}
                  className="bg-surface-container-lowest text-primary px-xl py-md rounded-xl font-headline-md shadow-lg hover:scale-105 transition-transform cursor-pointer font-bold"
                >
                  Crear cuenta gratis
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-transparent border border-white/30 text-on-primary px-xl py-md rounded-xl font-headline-md hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-highest py-16 px-container-margin">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-xl text-left">
          <div className="col-span-2 md:col-span-1 space-y-md">
            <div className="font-headline-md text-primary font-bold">FORMALIA</div>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Empoderando al comercio local a través de la formalización digital y el control financiero sencillo.
            </p>
          </div>
          <div>
            <h4 className="font-label-md text-on-surface mb-md">Producto</h4>
            <ul className="space-y-sm font-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Funcionalidades</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Seguridad</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Precios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-on-surface mb-md">Compañía</h4>
            <ul className="space-y-sm font-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Sobre nosotros</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Prensa</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-on-surface mb-md">Soporte</h4>
            <ul className="space-y-sm font-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Ayuda</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contacto</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Legal</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-lg border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="font-label-sm text-on-surface-variant">© 2026 FORMALIA. Todos los derechos reservados.</p>
          <div className="flex gap-lg">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">language</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">share</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
