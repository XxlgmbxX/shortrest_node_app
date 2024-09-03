const express = require("express")
const path = require('path')
const { WebSocketServer } = require("ws")
require("dotenv").config()
const router = express.Router();
//

const server = express()
const port = process.env.PORT || 3000
server.use(express.static(path.join(__dirname, 'src')));
//

// Inicia o servidor HTTP
const serverExpress = server.listen(port, () => {
    console.log("Server is running")
})

//Arquivo html
router.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'))
})

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
        //console.log(data.toString())
        wss.clients.forEach((client) => client.send(data.toString()))
    })
    console.log("client connected")
})
