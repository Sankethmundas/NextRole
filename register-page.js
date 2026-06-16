const togglePasswords = document.querySelectorAll(".toggle-password");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const authMessage = document.querySelector("#auth-message");
const registerBtn = document.querySelector("#register-btn")
togglePasswords.forEach(
    (toggle) => {
        toggle.addEventListener(
            "click",
            () => {

                const target =
                    document.querySelector(
                        `#${toggle.dataset.target}`
                    );

                if(target.type === "password"){
                    target.type = "text";
                }
                else{
                    target.type = "password";
                }

                setTimeout(
                    () => {
                        target.type = "password";
                    },
                    200
                );
            }
        );
    }
);

registerBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if(
        password.value.trim() === "" ||
        confirmPassword.value.trim() === ""
    ){
        authMessage.textContent = "Please fill all fields";
        authMessage.className = "error-message";
        return;
    }

        if(
            password.value !==
            confirmPassword.value
        ){

            authMessage.className =
                "error-message";
            authMessage.textContent =
                "Passwords do not match";


            return;
        }

        authMessage.className =
            "success-message";

        authMessage.textContent =
            "✓ Account Created Successfully";

});