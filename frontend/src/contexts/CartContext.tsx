'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  category: string;
  description: string;
  originalPrice: string;
  discountedPrice?: string;
  discountPercentage?: string;
  imageSrc: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addItem = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });

    toast.success('Item adicionado ao carrinho!');
  };

  const removeItem = (id: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(cartItem => cartItem.id !== id);
      
      toast.success('Item removido do carrinho!');
      
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Carrinho limpo!');
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(cartItem =>
        cartItem.id === id
          ? { ...cartItem, quantity }
          : cartItem
      )
    );
    toast.success('Quantidade atualizada!');
  };

  if (!isHydrated) return null;

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
