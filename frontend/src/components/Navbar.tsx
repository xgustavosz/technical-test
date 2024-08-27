'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/cart`);
  };

  const menuItems = [
    {
      href: '/cart',
      iconSrc: '/cart.svg',
      iconAlt: 'Carrinho',
      label: 'Carrinho',
      onClick: () => handleClick(),
    },
    {
      href: '/checkout',
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
        <div className="flex space-x-9">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={item.onClick}
              className="flex items-center text-gray-500 hover:text-primary-orange space-x-2"
            >
              <Image src={item.iconSrc} alt={item.iconAlt} width={13} height={13} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
