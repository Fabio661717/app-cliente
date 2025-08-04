// src/pages/AuthPage.jsx
import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [modo, setModo] = useState('login') // Corrigido: sem anotação de tipo
  const [mensagem, setMensagem] = useState('')
    const navigate = useNavigate()

  const handleLoginCadastro = async () => {
    setMensagem('')

    if (modo === 'login') {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })

      if (error) {
        setMensagem('Erro: ' + error.message)
      } else if (!data.user?.email_confirmed_at) {
        setMensagem('Verifique seu e-mail antes de continuar.')
      } else {
        setMensagem('Login realizado com sucesso!')
        setTimeout(() => {
    navigate('/qr')
  }, 1500)
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
      })

      if (error) {
        setMensagem('Erro: ' + error.message)
      } else {
        setMensagem('Cadastro feito! Verifique seu e-mail antes de logar.')
      }
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{modo === 'login' ? 'Login' : 'Cadastro'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />

      <button onClick={handleLoginCadastro}>
        {modo === 'login' ? 'Entrar' : 'Cadastrar'}
      </button>

      <p
        style={{ marginTop: 10, color: 'blue', cursor: 'pointer' }}
        onClick={() => setModo(modo === 'login' ? 'cadastro' : 'login')}
      >
        {modo === 'login' ? 'Criar conta' : 'Já tem conta? Fazer login'}
      </p>

      {mensagem && (
        <p style={{ marginTop: 20, color: 'red' }}>{mensagem}</p>
      )}
    </div>
  )
}
