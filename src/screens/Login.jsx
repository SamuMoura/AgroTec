import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import '../styles/Login.css';
import logo from '../assets/AgroTec.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Credenciais locais para testes
    const testCredentials = {
        email: 'teste@agrotec.com',
        password: '123456',
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Verificação local
        if (email === testCredentials.email && password === testCredentials.password) {
            alert('Login realizado localmente com sucesso!');
            navigate('/menu', { state: { userName: email } });
            return;
        }

        // Se não for local, tentar com o Firebase
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Obtém os detalhes do usuário
            alert(`Login realizado com sucesso via Firebase! Bem-vindo, ${user.email}!`);
            navigate('/menu', { state: { userName: user.email } });
        } catch (error) {
            // Mensagens de erro amigáveis
            let errorMessage = 'Erro ao realizar login.';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'Usuário não encontrado.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Senha incorreta.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'E-mail inválido.';
            }
            alert(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="AgroTec Logo" className="login-logo" />
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
