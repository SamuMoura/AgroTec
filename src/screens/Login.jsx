import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../assets/AgroTec.png';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            alert(response.data);
        } catch (error) {
            alert(error.response ? error.response.data : 'Erro ao conectar ao servidor.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="AgroTec Logo" className="login-logo" />
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Usuário"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
