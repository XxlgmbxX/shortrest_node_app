const { auth } = require('../services/firebaseconfig.js'); 
const { signInWithEmailAndPassword } = require('firebase/auth');
const { createUserWithEmailAndPassword } = require("firebase/auth");

const express = require("express")
const { type } = require("os")
const path = require('path')
const { WebSocketServer } = require("ws")
require("dotenv").config()



// Função para fazer login
const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        
        return user; // Certifique-se de retornar o usuário
    })
    .catch((error) => {
        console.error('Erro ao fazer login:', error);
        throw error; 
    });
};

const registerUser = (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        return user;
    })

    .catch((error) =>{
        console.error('Erro ao fazer login: ', error);
        throw error;
    })
}

const port = process.env.PORT || 3000
const server = express()
server.use(express.static(path.join(__dirname, '..', 'public')))

//

// Inicia o servidor HTTP
const serverExpress = server.listen(port, () => {
    console.log("Server is running")
})

//Arquivo html
// Variável de estado
let logado = false;

// Roteamento
server.get("/game", (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'game.html'));
});

server.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

server.get("/campaigns", (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'public','campaigns.html'))
});

server.post("/api/login", async (req,res) => {
    const email = req.headers["email"]
    const senha = req.headers["senha"]

    return signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
        res.status(200).send({success: true})
    })

    .catch((error) =>{
        console.error('Erro ao fazer login: ', error.code)
        res.status(500).send({success: false})
    })
})

server.post("/api/register", async (req,res) =>{
    const email = req.headers["email"]
    const senha = req.headers["senha"]

    return createUserWithEmailAndPassword(auth, email, senha)
    .then(()=>{
        res.status(200).send({success: true})
    })

    .catch((error) =>{
        console.error('Erro ao fazer login: ',error.code)
        res.status(500).send({success: false})
    })
})


// pagina de erro
server.use((_req, res) => {
    res.status(404).send("Página não encontrada")
})

//

const wss = new WebSocketServer({ server: serverExpress })

wss.on("connection", (ws) => {
    ws.on("error", console.error)

    ws.on("message", (data) => {
        const parsedData = JSON.parse(data)

        if(parsedData.type === "message"){
            
            console.log(data.toString())
            wss.clients.forEach((client) => client.send(data.toString()))
        }

    })
    console.log("client connected")
})
