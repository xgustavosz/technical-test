'use client';

import { useState } from 'react';
import SearchButton from './SearchButton';

const filters = [
    { id: 'boots', label: 'Botas' },
    { id: 'flip-flops', label: 'Chinelos' },
    { id: 'cleats', label: 'Chuteiras' },
    { id: 'sandals', label: 'Sandálias' },
];

export default function CategoriesSection() {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setSelectedFilters(prev =>
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    return (
        <div className="w-full max-w-[290px] min-h-[424px] p-4 gap-2 bg-[#F9FAFB] rounded-t-lg">
            <div className="w-full max-w-[258px] h-auto min-h-[392px] rounded-lg p-4 gap-4 bg-white">
                <p className="font-semibold mb-4 text-base sm:text-lg">Categorias</p>
                <SearchButton />
                <div className="flex flex-col gap-4 mt-4">
                    {filters.map(filter => (
                        <div key={filter.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={filter.id}
                                value={filter.label}
                                checked={selectedFilters.includes(filter.label)}
                                onChange={handleChange}
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor={filter.id} className="text-gray-500 text-sm sm:text-base cursor-pointer">{filter.label}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
