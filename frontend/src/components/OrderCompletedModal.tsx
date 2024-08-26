'use client';

import Modal from "@/components/Modal";
import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function OrderCompletedModal({ isOpen, onClose }: ModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Sucesso!" buttonTitle="Entendi" titleIcon="/checkCircle.svg">
            <div className="flex flex-col items-center justify-center gap-4">
                <Image src="/orderCompleted.svg" alt="sucesso" width={160} height={160} />
                <div>
                    <p className="font-medium text-xl text-center">Seu pedido foi concluído!</p>
                    <p className="text-sm text-gray-500 text-center">Retornaremos com atualizações em seu e-mail.</p>
                </div>
            </div>
        </Modal>
    );
}

