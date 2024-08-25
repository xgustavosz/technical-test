import Image from 'next/image';
import Container from '@/components/Container';
import SearchButton from '@/components/SearchButton';
import CategoriesSection from '@/components/CategoriesSection';
import PriceSection from './PriceSection';
import ProductItem from './ProductItem';
import { Product } from '@/hooks/useProducts';
import { formatProductCount } from '@/utils/numberUtils';

interface HomePageProps {
    products: Product[];
}

export default function HomePage({ products }: HomePageProps) {
    return (
        <Container>
            <Image src="/images/banner.jpg" alt="Banner" width={1440} height={320} />
            <div className="sm:px-4 md:px-6 xl:px-[104px] pb-6">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center mt-12">
                    <p className="font-semibold text-base sm:text-lg">{formatProductCount(products.length)} itens encontrados</p>
                    <SearchButton />
                </div>
                <div className="flex flex-col sm:flex-row mt-12 gap-6">
                    <div className="flex flex-row sm:flex-col items-start gap-5">
                        <CategoriesSection />
                        <PriceSection />
                    </div>
                    <div className="flex-grow flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => (
                                <ProductItem key={product.id} {...product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
