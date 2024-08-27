'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SearchInputProps {
    onSearch: (searchTerm: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center rounded-md overflow-hidden border transition-all border-gray-100">
            <input
                type="text"
                placeholder="Pesquisar"
                className="bg-gray-100 text-sm px-4 h-10 w-full focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button
                className="bg-gray-100 h-10 px-4 py-2"
                onClick={handleSearch}
            >
                <Image src="/search.svg" alt="Pesquisar" width={16} height={16} />
            </button>
        </div>
    );
}
