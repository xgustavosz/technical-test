"use client";

import { useEffect, useState } from "react";

export interface Product {
  id: string;
  category: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  discountPercentage: string;
  imageSrc: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:8000/products/", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchProducts();
  }, []);

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  return { products, error, getProductById };
}
