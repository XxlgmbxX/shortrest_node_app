const express = require("express")
const path = require('path')
const { WebSocketServer } = require("ws")
require("dotenv").config()

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

logado = false

if(!logado){
    server.get("/", (_req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
    })
}

if(logado){
    server.get("/", (_req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'teste.html'))
    })
}

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
            logado = true
        }

        if(parsedData.type === "message"){
            
            console.log(data.toString())
            wss.clients.forEach((client) => client.send(data.toString()))
        }

    })
    console.log("client connected")
})
