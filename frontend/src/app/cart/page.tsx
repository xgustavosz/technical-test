'use client';

import CartDetails from "@/components/CartDetails";
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
    const { cart } = useCart();

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
                    cart.length !== 0 && <CartDetails cart={cart} />
                }
            </div>
        </Container>
    );
}
