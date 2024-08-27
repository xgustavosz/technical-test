'use client';

import { useState } from 'react';
import Modal from "@/components/Modal";
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import PasswordInput from '@/components/PasswordInput';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: ModalProps) {
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const userExists = users.some(
            (user: { email: string }) => user.email === email
        );
        
        if (userExists) {
            toast.error('Já existe uma conta com esse e-mail.');
            return;
        }
        
        if (name && email && phone && password) {
            const newUser = { name, email, phone, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            login(name);
            toast.success('Conta criada e logado com sucesso!');
            onClose();
        } else {
            toast.error('Por favor, preencha todos os campos.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleRegister}
            title="Cadastre-se"
            buttonTitle="Criar minha conta"
            titleIcon="/person.svg"
        >
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Nome completo"
                    className="border rounded-[4px] w-full h-12 px-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="E-mail"
                    className="border rounded-[4px] w-full h-12 px-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    className="border rounded-[4px] w-full h-12 px-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <PasswordInput
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                />
            </div>
        </Modal>
    );
}
