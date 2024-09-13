        // Login elements
        const loginForm = document.querySelector(".loginForm");
        const loginEmailInput = document.querySelector(".login_container .loginEmailInput");
        const loginPasswordInput = document.querySelector(".login_container .loginPasswordInput");
        
        // Sign up form elements
        const registerForm = document.querySelector(".registerForm");
        const signUpEmailInput = document.querySelector(".signUp_container .loginEmailInput");
        const signUpPasswordInput = document.querySelector(".signUp_container .loginPasswordInput");

        let user = {id: "", email: "", password: ""};
    
        const handleLogin = async(event) => {
            event.preventDefault();
            //user.id = crypto.randomUUID();
            user.email = loginEmailInput.value;
            user.password = loginPasswordInput.value;
        

            const res = await fetch(`http://${window.location.host}/api/login`, {
                method: "POST",
                headers: {
                    "email": user.email,
                    "senha": user.password
                }
            });
            const data = await res.json()
            console.log(data.success)
        };

        //fazer função de handle sign up
        const handleRegister = async (event) =>{
            event.preventDefault();
            user.email = signUpEmailInput.value;
            user.password = signUpPasswordInput.value;

            const res = await fetch(`http://${window.location.host}/api/register`,{
                method: "POST",
                headers: {
                    "email": user.email,
                    "senha": user.password
                }
            });
            const data = await res.json()
            console.log(data.success);
        };
        
        loginForm.addEventListener("submit", handleLogin);
        registerForm.addEventListener("submit", handleRegister);

        function showSignUp() {
            document.querySelector('.login_container').style.display = 'none';
            document.querySelector('.signUp_container').style.display = 'flex';
        }
        
        function showLogin() {
            document.querySelector('.signUp_container').style.display = 'none';
            document.querySelector('.login_container').style.display = 'flex';
        }