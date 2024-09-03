const express = require("express");
const path = require('path');
const { WebSocketServer } = require("ws");
require("dotenv").config();

const server = express();
const port = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta 'src'
server.use(express.static(path.join(__dirname, 'src')));

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Página HTML
server.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.use((_req, res) => {
    res.status(404).send("Página não encontrada");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    ws.on("error", console.error);

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()));
    });
    console.log("Client connected");
});
