const express = require("express");
const path = require('path');
const { WebSocketServer } = require("ws");
require("dotenv").config();

const server = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta 'src'
server.use(express.static(path.join(__dirname, 'src')));

// Enviar o arquivo HTML na rota raiz
server.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Página de erro 404
server.use((_req, res) => {
    res.status(404).send("Página não encontrada");
});

// Inicia o servidor HTTP
const serverExpress = server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Configuração do WebSocket Server
const wss = new WebSocketServer({ server: serverExpress });

wss.on("connection", (ws) => {
    ws.on("error", console.error);

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()));
    });
    console.log("client connected");
});