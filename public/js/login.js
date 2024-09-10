        // Login elements
        const loginForm = document.querySelector(".loginForm");
        const loginEmailInput = document.querySelector(".loginEmailInput");
        const loginPasswordInput = document.querySelector(".loginPasswordInput")

        //console.log(loginEmailInput.value);

        let user = {id: "", email: "", password: ""};
    
        const handleLogin = async(event) => {
            event.preventDefault();
            //user.id = crypto.randomUUID();
            user.email = loginEmailInput.value;
            user.password = loginPasswordInput.value;
        

            const res = await fetch(`http://${window.location.host}/api/login`, {
                headers: {
                    "email": user.email,
                    "senha": user.password
                }
            });
            const data = await res.json()
            console.log(data.success)
        };
        
        //fazer função de handle sign up

        loginForm.addEventListener("submit", handleLogin);

        function showSignUp() {
            document.querySelector('.login_container').style.display = 'none';
            document.querySelector('.signUp_container').style.display = 'flex';
        }
        
        function showLogin() {
            document.querySelector('.signUp_container').style.display = 'none';
            document.querySelector('.login_container').style.display = 'flex';
        }