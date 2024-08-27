import Image from 'next/image';
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    titleIcon?: string;
    buttonTitle?: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, buttonTitle, titleIcon }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[384px]">
                <div className="flex justify-between items-center mb-[49px]">
                    <div className="flex flex-row items-center gap-4">
                        {titleIcon &&  <Image src={titleIcon} alt="ícone" width={16} height={16} />}
                        <h2 className="text-gray-500">{title}</h2>
                    </div>
                    <button onClick={onClose}>
                        <Image src="/x.svg" alt="botão de fechar" width={16} height={16} />
                    </button>
                </div>
                <div className="mb-4">{children}</div>
                {buttonTitle && (
                    <button
                        onClick={onClose}
                        className="bg-primary-orange text-white text-sm rounded hover:opacity-90 transition-opacity duration-200  h-11 w-full"
                    >
                        {buttonTitle}
                    </button>
                )}
            </div>
        </div>
    );
}
