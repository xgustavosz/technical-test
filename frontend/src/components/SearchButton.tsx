import Image from 'next/image';

export default function SearchButton() {
    return (
        <div
            className={"flex items-center rounded-md overflow-hidden border transition-all border-gray-100"}
        >
            <input
                type="text"
                placeholder="Pesquisar"
                className="bg-gray-100 text-sm px-4 h-10 w-full focus:outline-none"
            />
            <button
                className="bg-gray-100 h-10 px-4 py-2"
            >
                <Image src="/search.svg" alt="Pesquisar" width={16} height={16} />
            </button>
        </div >
    );
}
