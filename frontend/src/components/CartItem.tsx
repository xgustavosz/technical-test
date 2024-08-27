import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

interface CartItemProps {
    item: {
        id: string;
        category: string;
        description: string;
        originalPrice: string;
        discountedPrice?: string;
        discountPercentage?: string;
        imageSrc: string;
        quantity: number;
    };
}

export default function CartItem({ item }: CartItemProps) {
    const { removeItem, updateQuantity } = useCart();

    const handleRemove = () => {
        removeItem(item.id);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        } else {
            removeItem(item.id);
        }
    };

    const handleIncrement = () => {
        updateQuantity(item.id, item.quantity + 1);
    };

    return (
        <div className="flex items-start gap-10 max-w-[808px] mt-[21px]">
            <Image
                src={item.imageSrc}
                alt={`Imagem do produto ${item.description}`}
                width={150}
                height={150}
                className="rounded-lg"
            />
            <div className="w-full">
                <p className="font-medium text-2xl">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                    <p className="font-semibold text-[1.75rem]">{item.discountedPrice || item.originalPrice}</p>

                    <div className="flex gap-3">
                        <button
                            className="flex justify-center items-center w-10 h-10 rounded-lg bg-[#FF00001A]"
                            onClick={handleRemove}
                        >
                            <Image src="/trash.svg" alt="Lixeira" width={24} height={24} />
                        </button>

                        <div className="flex items-center">
                            <button
                                className="bg-gray-100 text-gray-500 h-10 w-9 rounded-l-lg"
                                onClick={handleDecrement}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                className="bg-gray-100 text-center text-gray-500 h-10 w-9 focus:outline-none"
                                value={item.quantity}
                                readOnly
                            />
                            <button
                                className="bg-gray-100 text-gray-500 h-10 w-9 rounded-r-lg"
                                onClick={handleIncrement}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
