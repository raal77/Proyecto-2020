
document.addEventListener("DOMContentLoaded", function (e) {
   
    let loginNeed =localStorage.getItem("login-need");

    if(loginNeed){
        loginNeed =JSON.parse(loginNeed);
        document.getElementById("alert").innerHTML=`
        
        <div class="alert alert-danger alert-dismissible fade" id="mensaje" role="alert">
        <span id="msg">${loginNeed.msg}</span>
        <a href="#" class="close" data-dismiss="alert">&times;</a>
        </div>    `;
    
        document.getElementById("mensaje").classList.add("alert-success");
        document.getElementById("mensaje").classList.add("show");
    }   
   
   
   
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
            if(loginNeed){
                localStorage.removeItem("login-need");
            window.location=loginNeed.from;
            }else{
            window.location = "inicio.html";
            }
        }

    });
});

