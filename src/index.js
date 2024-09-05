const express = require("express");
const path = require('path');
const { WebSocketServer } = require("ws");
require("dotenv").config();

const port = process.env.PORT || 3000;
const server = express();
server.use(express.static(path.join(__dirname, '..', 'public')));

const serverExpress = server.listen(port, () => {
    console.log("Server is running");
});

let logado = false;

const checkLogin = (req, res, next) => {
    if (logado) {
        res.sendFile(path.join(__dirname, '..', 'public', 'teste.html'));
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }
};

server.get("/", checkLogin);

server.use((_req, res) => {
    res.status(404).send("Página não encontrada");
});

const wss = new WebSocketServer({ server: serverExpress });

wss.on("connection", (ws) => {
    ws.on("error", console.error);

    ws.on("message", (data) => {
        const parsedData = JSON.parse(data);

        if (parsedData.type === "login") {
            console.log(data.toString());
            logado = true;
            // Enviar uma mensagem para o cliente para que ele faça o redirecionamento
            ws.send(JSON.stringify({ type: "redirect", url: "/teste.html" }));
        }

        if (parsedData.type === "message") {
            console.log(data.toString());
            wss.clients.forEach((client) => client.send(data.toString()));
        }
    });

    console.log("client connected");
});