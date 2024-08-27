'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

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
    <nav className="bg-white py-5 px-24">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image src="/flowLogo.svg" alt="Flow Logo" width={147} height={24} />
          </Link>
        </div>
        <div className="flex items-center space-x-9">
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
    </nav>
  );
}
