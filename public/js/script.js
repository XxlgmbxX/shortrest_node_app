const websocket = new WebSocket(`wss://${window.location.host}`);

websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "redirect") {
        window.location.href = data.url;
    }

    // Outras mensagens
};

// Função de login
const handleLogin = (event) => {
    event.preventDefault();
    // Preparar os dados do login e enviá-los para o servidor
    const userData = JSON.stringify({ type: "login" });
    websocket.send(userData);
};

// Supondo que você tenha um formulário de login
const loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit", handleLogin);