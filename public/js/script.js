        // Login elements
        const loginForm = document.querySelector(".loginForm");
        const loginEmailInput = document.querySelector(".loginEmailInput");
        const loginPasswordInput = document.querySelector(".loginPasswordInput")

        //console.log(loginEmailInput.value);

        let user = {id: "", email: "", password: ""};
        let websocket;
        
        const createMessage = (userName, content) => {
            const div = document.createElement("div");
            const span = document.createElement("span");
            const lineBreak = document.createElement("br");
            const text = document.createElement("p");
        
            div.classList.add("messages");
            span.classList.add("userSender");
        
            div.appendChild(span);
            div.appendChild(lineBreak);
            div.appendChild(text);
        
            span.innerHTML = userName;
            text.innerHTML = content;
        
            return div;
        };
        
        const createRoll = (userName, content) => {
            const div = document.createElement("div");
            const span = document.createElement("span");
            const lineBreak = document.createElement("br");
            const roll = document.createElement("p");
        
            div.classList.add("messages");
            span.classList.add("userSender");
        
            div.appendChild(span);
            div.appendChild(lineBreak);
            div.appendChild(roll);
        
            span.innerHTML = userName
            roll.innerHTML = content
        
            return div;
        };
        const scrollScreen = () => {
            const lastMessage = messagesArea.lastElementChild;
            lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
        };
        const processMessage = ({ data }) => {
            const { type, userId, userName, content, action, auth} = JSON.parse(data);
            let element;
        
            if (type === "roll") {
                element = createRoll(userName, content);
            } 
            if (type === "message") {
                element = createMessage(userName, content);
            }
            
            if (type === "auth" && auth == "success"){
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            }

            else{
                alert("dados invalidos")
            }
        
            messagesArea.appendChild(element);
            scrollScreen();
        };

        const handleLogin = async(event) => {
            event.preventDefault();
            user.id = crypto.randomUUID();
            user.email = loginEmailInput.value;
            user.password = loginPasswordInput.value;
            
            /*
            //alert(user.email)
            //alert(user.password)
        
            websocket = new WebSocket(`wss://${window.location.host}`);
            websocket.onopen = () => {
                const userData = JSON.stringify({userEmail: user.email, userPassword: user.password , type: "login"});
                websocket.send(userData)
            };

            websocket.onmessage = ({ data })=>{
                const { type, userId, userName, content, action} = JSON.parse(data);

                    processMessage({data});
                
            };
        
            websocket.onerror = function(error) {
                console.error("Erro ao conectar ao servidor WebSocket:", error);
            };*/

            const res = await fetch(`http://${window.location.host}/api/login`, {
                headers: {
                    "email": user.email,
                    "senha": user.password
                }
            });
            const data = await res.json()
            console.log(data.success)
        };
        //manda mensagem pra o servidor
        const sendMessage = (messageContent) => {
            event.preventDefault();
        
            const message = {
                userId: user.id,
                userName: user.email,
                content: messageContent,
                type: "message"
            };
        
            websocket.send(JSON.stringify(message));
            textarea.value = "";
        };
        const sendRoll = (dice) => {
            const roll = {
                userId: user.id,
                userName: user.email,
                content: Math.floor(Math.random() * dice) + 1,
                type: "roll"
            }
        
            websocket.send(JSON.stringify(roll));
        }
        loginForm.addEventListener("submit", handleLogin);

        function showSignUp() {
            document.querySelector('.login_container').style.display = 'none';
            document.querySelector('.signUp_container').style.display = 'flex';
        }
        
        function showLogin() {
            document.querySelector('.signUp_container').style.display = 'none';
            document.querySelector('.login_container').style.display = 'flex';
        }