'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import PasswordInput from '@/components/PasswordInput';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user: { email: string }) => user.email === email);

    if (userExists) {
      toast.error('Usuário já existe.');
      return;
    }

    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    login(name);
    toast.success('Cadastro realizado com sucesso!');
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Registrar</h2>
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
          <button
            onClick={handleRegister}
            className="bg-primary-orange text-white text-sm rounded hover:opacity-90 transition-opacity duration-200 h-11 w-full"
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}
