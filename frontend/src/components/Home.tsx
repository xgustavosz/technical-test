import Image from 'next/image';
import Container from '@/components/Container';
import CategoriesSection from '@/components/CategoriesSection';
import PriceSection from '@/components/PriceSection';
import ProductItem from './ProductItem';
import { Product } from '@/hooks/useProducts';
import { formatProductCount } from '@/utils/numberUtils';
import { useState, useEffect, useCallback } from 'react';
import SearchInput from '@/components/SearchInput';

interface HomePageProps {
    products: Product[];
}

const parsePrice = (price: string) => {
    return parseFloat(price.replace('R$ ', '').replace('.', '').replace(',', '.'));
};

export default function HomePage({ products }: HomePageProps) {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [searchQuery, setSearchQuery] = useState('');

    const filterProducts = useCallback(() => {
        let updatedProducts = products;

        if (selectedCategories.length > 0) {
            updatedProducts = updatedProducts.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        updatedProducts = updatedProducts.filter(product => {
            const price = product.discountedPrice
                ? parsePrice(product.discountedPrice)
                : parsePrice(product.originalPrice);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        if (searchQuery) {
            updatedProducts = updatedProducts.filter(product =>
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(updatedProducts);
    }, [products, selectedCategories, priceRange, searchQuery]);

    useEffect(() => {
        filterProducts();
    }, [filterProducts]);

    const handleCategoryFilterChange = (selectedFilters: string[]) => {
        setSelectedCategories(selectedFilters);
    };

    const handlePriceFilterChange = (range: number[]) => {
        setPriceRange(range);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <Container>
            <Image src="/images/banner.jpg" alt="Banner" width={1440} height={320} />
            <div className="sm:px-4 md:px-6 xl:px-[104px] pb-6">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center mt-12">
                    <p className="font-semibold text-base sm:text-lg">{formatProductCount(filteredProducts.length)} items found</p>
                    <SearchInput onSearch={handleSearch} />
                </div>
                <div className="flex flex-col sm:flex-row mt-12 gap-6">
                    <div className="flex flex-row sm:flex-col items-start gap-5">
                        <CategoriesSection onFilterChange={handleCategoryFilterChange} />
                        <PriceSection onPriceChange={handlePriceFilterChange} />
                    </div>
                    <div className="flex-grow flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductItem key={product.id} {...product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
