'use client';

import { useState } from 'react';
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import CartDetails from "@/components/CartDetails";
import RegisterModal from "@/components/RegisterModal";
import OrderCompletedModal from "@/components/OrderCompletedModal";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from '@/contexts/AuthContext';

export default function Cart() {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const [isOrderCompletedModalOpen, setOrderCompletedModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

    const handleCheckout = () => {
        if (user) {
            setOrderCompletedModalOpen(true);
        } else {
            setRegisterModalOpen(true);
        }
    };

    const handleCloseRegisterModal = () => {
        setRegisterModalOpen(false);
    };

    const handleCloseOrderCompletedModal = () => {
        setOrderCompletedModalOpen(false);
        clearCart();
    };

    return (
        <Container>
            <div className="flex flex-col-reverse lg:flex-row items-start justify-between gap-10 px-5 my-[42px]">
                <div>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))
                    ) : (
                        <p>Seu carrinho está vazio.</p>
                    )}
                </div>
                {
                    cart.length !== 0 && <CartDetails cart={cart} onCheckout={handleCheckout} />
                }
            </div>
            <RegisterModal isOpen={isRegisterModalOpen} onClose={handleCloseRegisterModal} />
            <OrderCompletedModal isOpen={isOrderCompletedModalOpen} onClose={handleCloseOrderCompletedModal} />
        </Container>
    );
}
