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

        const data: Product[] = await res.json();

        if (!data || data.length === 0) {
          throw new Error("No products found in the response");
        }

        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchProducts();
  }, []);

  return { products, error };
}
