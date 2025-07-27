// src/pages/LoginPage.js
import React, { useState } from 'react';
import { supabase } from '../supabase/client';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage('Cadastro feito! Verifique seu e-mail para confirmar.');
    }
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage('Login realizado com sucesso!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Entrar ou Cadastrar</h2>
      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleSignIn}>Entrar</button>
        <button onClick={handleSignUp}>Cadastrar</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default LoginPage;
