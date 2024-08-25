'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/hooks/useProducts';
import Image from 'next/image';
import Container from '@/components/Container';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`http://localhost:8000/products/${id}`, { cache: 'no-store' });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data: Product = await res.json();
                setProduct(data);
            } catch (error: any) {
                setError(error.message);
            }
        }

        fetchProduct();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth='1252px'>
            <div className='flex flex-col lg:flex-row items-center lg:items-stretch lg:justify-between gap-10 px-5 py-[52px]'>
                <div className='flex gap-6 lg:min-w-[600px]'>
                    <div className='flex flex-col gap-6'>
                        {[...Array(4)].map((_, index) => (
                            <Image
                                key={index}
                                src={product.imageSrc}
                                alt={product.description}
                                width={105}
                                height={105}
                                className='rounded-lg'
                            />
                        ))}
                    </div>
                    <Image
                        src={product.imageSrc}
                        alt={product.description}
                        width={470}
                        height={470}
                        className='rounded-lg'
                    />
                </div>
                <div className='flex flex-col justify-between max-w-[600px]'>
                    <div>
                        <p className='text-sm text-gray-500'>{product.category}</p>
                        <p className='font-medium text-[1.75rem] mt-2'>{product.description}</p>
                        <div className='flex flex-col justify-center mt-10 items-center bg-[#F9FAFB] h-[231px]'>
                            <Image src="/pix.svg" width={24} height={24} alt='pix' />
                            <p className='text-gray-400 text-sm line-through'>{product.discountedPrice && `De: ${product.originalPrice}` }</p>
                            <p className='text-[2rem] font-semibold'>{product.discountedPrice || product.originalPrice}</p>
                            <p className='text-sm'>
                                no pix <span className='text-primary-orange'>10%</span> de desconto
                            </p>
                        </div>
                    </div>
                    <button
                        className="mt-[52px] w-full h-12 rounded text-xs sm:text-sm md:text-base text-white bg-primary-orange hover:opacity-90 transition-opacity duration-200"
                    >
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </Container>
    );
}
