const { auth } = require('../services/firebaseconfig.js'); 
const { signInWithEmailAndPassword } = require('firebase/auth');

const express = require("express")
const { type } = require("os")
const path = require('path')
const { WebSocketServer } = require("ws")
require("dotenv").config()



// Função para fazer login
 const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login bem-sucedido
        const user = userCredential.user;
        console.log('Usuário logado:', user);
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
      });
  };
//

const port = process.env.PORT || 3000
const server = express()
server.use(express.static(path.join(__dirname, '..', 'public')))

//

// Inicia o servidor HTTP
const serverExpress = server.listen(port, () => {
    console.log("Server is running")
})

//Arquivo html

let logado = false; // Deve ser dinâmico
/*// Middleware para autenticação (exemplo básico)
const checkLogin = (req, res, next) => {
    // Aqui você deve substituir a lógica com base na autenticação real

    if (logado) {
        res.sendFile(path.join(__dirname, '..', 'public', 'teste.html'));
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }
};*/

if(!logado){
    server.get("/login", (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
})

}

    server.get("/", (_req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

// Roteamento
//server.get("/", checkLogin);
//

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

        if(parsedData.type === "login"){
            console.log(data.toString())
            const authResponse = loginUser(parsedData.userEmail, parsedData.userPassword)
            logado = true

            console.log(authResponse)
        }

        if(parsedData.type === "message"){
            
            console.log(data.toString())
            wss.clients.forEach((client) => client.send(data.toString()))
        }

    })
    console.log("client connected")
})
