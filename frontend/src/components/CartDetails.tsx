interface CartDetailsProps {
    cart: {
        id: string;
        category: string;
        description: string;
        originalPrice: string;
        discountedPrice?: string;
        discountPercentage?: string;
        imageSrc: string;
        quantity: number;
    }[];
}

export default function CartDetails({ cart }: CartDetailsProps) {
    const subtotal = cart.reduce((total, item) => {
        const price = item.discountedPrice 
          ? parseFloat(item.discountedPrice.replace("R$", "").replace(".", "").replace(",", "."))
          : parseFloat(item.originalPrice.replace("R$", "").replace(".", "").replace(",", "."));
        return total + price * item.quantity;
    }, 0);

    return (
        <div
            className="
            flex
            flex-col
            w-[384px]
            border
            border-gray-200
            rounded-[4px]
            gap-[45px]
            p-8
            "
        >
            <div className="flex justify-between items-center">
                <p className="text-gray-500">Sub total:</p>
                <p className="font-medium">R$ {subtotal.toFixed(2).replace(".", ",")}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-gray-500">Frete:</p>
                <p className="text-[#008000] font-medium">Grátis</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-gray-500">Valor total:</p>
                <p className="font-semibold text-[1.375rem]">R$ {subtotal.toFixed(2).replace(".", ",")}</p>
            </div>
            <button className="w-full h-11 rounded-[4px] text-white bg-primary-orange text-sm hover:opacity-90 transition-opacity duration-200">
                Finalizar Pedido
            </button>
        </div>
    );
}
