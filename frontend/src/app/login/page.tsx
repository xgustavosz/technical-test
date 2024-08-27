'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import PasswordInput from '@/components/PasswordInput';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (user: { email: string; password: string }) => user.email === email && user.password === password
    );

    if (user) {
      login(user.name);
      toast.success('Login realizado com sucesso!');
      router.push('/');
    } else {
      toast.error('Credenciais inválidas.');
    }
  };

  const handleRedirectToRegister = () => {
    router.push('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Entrar</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="E-mail"
            className="border rounded-[4px] w-full h-12 px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <button
            onClick={handleLogin}
            className="bg-primary-orange text-white text-sm rounded hover:opacity-90 transition-opacity duration-200 h-11 w-full"
          >
            Login
          </button>
          <button
            onClick={handleRedirectToRegister}
            className="text-primary-orange text-sm mt-4 hover:underline"
          >
            Não tem uma conta? Registre-se
          </button>
        </div>
      </div>
    </div>
  );
}
