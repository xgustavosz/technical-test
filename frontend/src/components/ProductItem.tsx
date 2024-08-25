'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductItemProps {
    id: string;
    imageSrc: string;
    category: string;
    description: string;
    originalPrice: string;
    discountedPrice?: string;
    discountPercentage?: string;
}

export default function ProductItem({
    id,
    imageSrc,
    category,
    description,
    originalPrice,
    discountedPrice,
    discountPercentage,
}: ProductItemProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${id}`);
    };

    const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        console.log(`Produto ${id} adicionado ao carrinho`);
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer flex flex-col min-w-[240px] max-w-[290px] w-full"
        >
            <Image
                src={imageSrc}
                alt="Produto"
                width={290}
                height={330}
                quality={100}
                className="rounded-t-lg w-full"
            />
            <div className="flex flex-col justify-between flex-1 bg-white rounded-b-lg">
                <div>
                    <p className="text-xs sm:text-sm md:text-base font-normal text-gray-500 mt-6 mb-2">
                        {category}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-medium text-left line-clamp-2">{description}</p>
                    {discountedPrice ? (
                        <>
                            <p className="text-xs sm:text-sm md:text-base text-gray-400 line-through">
                                De {originalPrice}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-lg sm:text-xl md:text-2xl font-semibold">{discountedPrice}</p>
                                <p className="text-xs sm:text-sm md:text-base text-primary-orange">
                                    {discountPercentage}% OFF
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold">{originalPrice}</p>
                    )}
                </div>
                <button
                    onClick={handleAddToCartClick}
                    className="mt-6 w-full h-12 border border-primary-orange rounded text-xs sm:text-sm md:text-base text-primary-orange hover:bg-primary-orange hover:text-white transition-colors duration-200"
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    );
}
