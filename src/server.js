const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Configurações
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Altere se necessário
    password: '', // Altere se necessário
    database: 'agrotec', // Nome do banco
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota para autenticação
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            res.status(500).send('Erro no servidor.');
            return;
        }
        if (results.length > 0) {
            res.status(200).send('Login bem-sucedido!');
        } else {
            res.status(401).send('Usuário ou senha incorretos.');
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
