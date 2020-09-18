
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("submitBtn").addEventListener("click", function (e) {
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let boton = document.getElementById("submitBtn");
        let camposCompletos = true;



        if (inputEmail.value === "" || inputPassword.value === "") {
            inputEmail.classList.add("invalid");
            inputPassword.classList.add("invalid")
            camposCompletos = false;

            alert("Ingrese todos los datos!");
        }
        if (camposCompletos) {

            localStorage.setItem("User-Logged", JSON.stringify({email: inputEmail.value}));

            window.location = "inicio.html";

        }

    });
});

