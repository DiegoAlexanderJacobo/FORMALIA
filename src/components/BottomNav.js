'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on landing, login, and onboarding steps
  if (pathname === '/' || pathname === '/onboarding' || pathname === '/login') {
    return null;
  }

  const navItems = [
    { name: 'Inicio', path: '/dashboard', icon: 'home' },
    { name: 'Ventas', path: '/ventas', icon: 'payments' },
    { name: 'Compras', path: '/compras', icon: 'shopping_cart' },
    { name: 'Roadmap', path: '/roadmap', icon: 'map' },
    { name: 'Perfil', path: '/perfil', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.08)] rounded-t-[20px] border-t border-outline-variant/30">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 active:scale-95 transition-all duration-150 ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                  : 'text-on-surface-variant'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-[10px] mt-0.5">{item.name}</span>
            </Link>
          );
        })}
    </nav>
  );
}
