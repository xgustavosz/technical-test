'use client';

import Modal from "@/components/Modal";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: ModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Cadastre-se" buttonTitle="Criar minha conta" titleIcon="/person.svg">
            <div className="flex flex-col gap-4">
                <input type="text" placeholder="Nome completo" className="border rounded-[4px] w-full h-12 px-3" />
                <input type="text" placeholder="E-mail" className="border rounded-[4px] w-full h-12 px-3" />
                <input type="text" placeholder="Telefone" className="border rounded-[4px] w-full h-12 px-3" />
                <input type="password" placeholder="Senha" className="border rounded-[4px] w-full h-12 px-3" />
            </div>
        </Modal>
    );
}

