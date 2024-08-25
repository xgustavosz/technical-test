'use client';

import HomePage from '@/components/Home';
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const { products, error } = useProducts();

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return <HomePage products={products} />;
}
