'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      href: '/cart',
      iconSrc: '/cart.svg',
      iconAlt: 'Carrinho',
      label: 'Carrinho',
    },
    user
      ? {
          href: '#',
          iconSrc: '/person.svg',
          iconAlt: 'Usuário',
          label: user.name,
          onClick: logout,
        }
      : {
          href: '/login',
          iconSrc: '/person.svg',
          iconAlt: 'Entrar',
          label: 'Entrar',
        },
  ];

  return (
    <nav className="bg-white py-5 px-4 sm:px-24">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image src="/flowLogo.svg" alt="Flow Logo" width={147} height={24} />
          </Link>
        </div>

        <button
          className="sm:hidden flex items-center text-gray-500 hover:text-primary-orange"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image src="/hamburguerMenu.svg" alt="Menu" width={24} height={24} />
        </button>

        <div className="hidden sm:flex items-center space-x-9">
          {menuItems.map((item) => (
            <div key={item.href} className="flex items-center space-x-2">
              <Link
                href={item.href}
                onClick={item.onClick}
                className="flex items-center text-gray-500 hover:text-primary-orange"
              >
                <Image src={item.iconSrc} alt={item.iconAlt} width={13} height={13} />
                <span className="ml-2">{item.label}</span>
              </Link>
            </div>
          ))}
          {user && (
            <button
              onClick={logout}
              className="flex items-center text-gray-500 hover:text-primary-orange"
            >
              <span className="ml-2">Sair</span>
            </button>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-white border-t border-gray-200 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 sm:hidden`}
      >
        <div className="p-4">
          <button
            className="flex items-center text-gray-500 hover:text-primary-orange"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image src="/close.svg" alt="Fechar" width={24} height={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (item.onClick) item.onClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center text-gray-500 hover:text-primary-orange"
            >
              <Image src={item.iconSrc} alt={item.iconAlt} width={24} height={24} />
              <span className="ml-2 text-lg">{item.label}</span>
            </Link>
          ))}
          {user && (
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="flex items-center text-gray-500 hover:text-primary-orange"
            >
              <span className="ml-2 text-lg">Sair</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
