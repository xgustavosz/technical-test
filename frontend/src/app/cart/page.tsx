'use client';

import { useState } from 'react';
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import CartDetails from "@/components/CartDetails";
import RegisterModal from "@/components/RegisterModal";
import OrderCompletedModal from "@/components/OrderCompletedModal"; // Adicione o caminho correto para seu modal
import { useCart } from "@/contexts/CartContext";
import { useAuth } from '@/contexts/AuthContext';

export default function Cart() {
    const { cart } = useCart();
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
    };

    return (
        <Container>
            <div className="flex items-start justify-between gap-10 my-[42px]">
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
