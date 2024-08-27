import Image from 'next/image';
import { useState } from 'react';

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, placeholder, className }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className={`border rounded-[4px] w-full h-12 px-3 pr-10 ${className}`}
                value={value}
                onChange={onChange}
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
            >
                <Image src="/eye.svg" alt="Mostrar senha" width={24} height={24} />
            </button>
        </div>
    );
};

export default PasswordInput;
