'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { notifications, markAllNotifsRead, triggerDailyCorte, monederoAcumulado, user } = useApp();
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Helper to compute initials
  const getInitials = (name) => {
    if (!name) return 'JD';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return 'JD';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const unreadNotifs = notifications.filter(n => !n.read);
  const unreadCount = unreadNotifs.length;

  const handleNotifClick = (notif) => {
    if (notif.action === 'cierre') {
      if (confirm(`¿Deseas realizar el corte de caja diaria por S/ ${monederoAcumulado.toFixed(2)}?`)) {
        triggerDailyCorte();
      }
    } else if (notif.action === 'presentar') {
      router.push('/roadmap');
    }
    setShowNotifMenu(false);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Bóveda', path: '/boveda' },
    { name: 'Ventas', path: '/ventas' },
    { name: 'Compras', path: '/compras' },
  ];

  // Don't show navbar on landing page or onboarding stepper
  if (pathname === '/' || pathname === '/onboarding' || pathname === '/login') {
    return null;
  }

  return (
    <header className="bg-surface-container-lowest dark:bg-inverse-surface shadow-sm sticky top-0 z-40 h-16 w-full">
      <div className="flex justify-between items-center w-full px-container-margin h-16 max-w-7xl mx-auto relative">
        {/* Brand */}
        <Link href="/dashboard" className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary hover:opacity-90">
          FORMALIA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-lg h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`font-body-md text-body-md h-full flex items-center px-xs transition-colors ${
                  isActive
                    ? 'text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-1 font-bold'
                    : 'text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-md">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowProfileMenu(false);
              }}
              className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors relative cursor-pointer"
            >
              notifications
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-error text-[9px] text-white items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                </span>
              )}
            </button>

            {/* Notification Menu Dropdown */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-toast">
                <div className="flex justify-between items-center px-md py-xs border-b border-outline-variant/20 mb-2">
                  <span className="font-label-md text-label-md text-on-surface">Notificaciones</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotifsRead}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      Leídas
                    </button>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto space-y-1 px-sm custom-scrollbar">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-on-surface-variant text-center py-4">No tienes notificaciones</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotifClick(notif)}
                        className={`p-2 rounded-xl text-left transition-colors cursor-pointer hover:bg-surface-container-low ${
                          notif.read ? 'opacity-60' : 'bg-surface-container-lowest border-l-2 border-primary'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className={`text-xs font-bold ${notif.type === 'urgent' ? 'text-error' : notif.type === 'warning' ? 'text-secondary' : 'text-primary'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[9px] text-outline">{notif.time}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2 mt-0.5">
                          {notif.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-2 border-t border-outline-variant/20 pt-2 text-center">
                  <Link
                    href="/notificaciones"
                    onClick={() => setShowNotifMenu(false)}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Ver todas
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile initials / dropdown menu trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifMenu(false);
              }}
              className="w-8 h-8 rounded-full bg-primary-fixed hover:scale-105 transition-transform flex items-center justify-center text-primary font-bold text-xs cursor-pointer focus:outline-none"
            >
              {getInitials(user?.name)}
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-toast">
                <div className="px-md py-xs border-b border-outline-variant/20 mb-1 text-left">
                  <p className="font-label-md text-label-sm font-bold text-on-surface">{user?.name || 'Juan Diego'}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">Perfil: Confiable</p>
                </div>
                
                <div className="flex flex-col">
                  <Link
                    href="/perfil"
                    onClick={() => setShowProfileMenu(false)}
                    className="px-md py-2 text-left text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">person</span>
                    Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      router.push('/login');
                    }}
                    className="px-md py-2 text-left text-xs font-semibold text-error hover:bg-error-container/10 transition-colors flex items-center gap-2 cursor-pointer w-full"
                  >
                    <span className="material-symbols-outlined text-[16px] text-error">logout</span>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
