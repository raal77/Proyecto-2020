var cartArray = [];
var totalConEnvio;
function calcTotal(){
   let subs= document.getElementsByClassName("subtotal")
   let suma = 0;
   for(let i=0; i<subs.length;i++){
       suma+= parseInt(subs[i].innerHTML)
   }


   
   document.getElementById("total").innerText=suma;
}




function calcSubtotal(unitCost,i){
   let cantidad = parseInt(document.getElementById(`cantidad${i}`).value); 
   if(unitCost<=100){
       var result = cantidad * (unitCost/40);
        
       return document.getElementById(`artSubtotal${i}`).innerHTML= result ; 
   }else{
       document.getElementById(`artSubtotal${i}`).innerHTML= cantidad * unitCost; ; 
   
   }
   
 
   calcTotal();
}






function showCart(array){
   let cart = "";
  
   for(let i = 0; i<array.articles.length; i++){
       let art = array.articles[i];
       let sub = art.unitCost * art.count ;
        
           if(art.currency==="UYU"){
              unitCost = art.unitCost/40;
           }else{
              unitCost = art.unitCost;
           }
       

       cart+= `
       <tr class="cart">
       <td><img class="imgcart" src="${art.src}"><br>${art.name}</td>
    
       <td>${art.currency} ${art.unitCost}</td>
       <td><input style="width:60px;" onchange="calcSubtotal(${art.unitCost},${i})"
       type="number" id="cantidad${i}" value="${art.count}" min="1"></td>
       
        <td><span class="subtotal" id="artSubtotal${i}" style="font-weight:bold;"> ${sub}</span></td> 
      
        <td><button class="btn btn-danger" onclick="eliminar(${i})">X</button></td>
        </tr>
       `

       document.getElementById("contenido").innerHTML = cart;


   }
calcTotal();
}

function eliminar(i){
   if(cartArray.articles.length > 1){
       cartArray.articles.splice(i,1);
       showCart(cartArray);
   }else{
   document.getElementById("prodcart").innerHTML = `
   <div class="elim">
   <h2>No hay productos en su carrito</h2>
   <p>Ingrese a ver la lista de productos <a href="products.html">Ver Productos</a></p>
   </div>
   `;
   }
}
function envio(){
   
   let elementos = document.getElementsByName("envio");
   let envio;
   for(var i=0; i<elementos.length;i++){
       if(elementos[i].checked){
           envio = parseInt(elementos[i].value);
       }
   }
   return envio;
}



function calcEnvio(){
   let total = parseInt(document.getElementById("total").innerHTML);
   let envio;

   let elementos = document.getElementsByName("envio");

   for(var i=0; i<elementos.length;i++){
       if(elementos[i].checked){
           envio = parseInt(elementos[i].value);
       }
   }
    totalConEnvio = total + envio;
   let contenido =`
   <tr>
   <td>USD ${total}</td>
   <td>${envio}</td>
   <td style="font-size:20px; height:50px; background:grey;"><b> USD ${totalConEnvio}</b></td>
   
   `
   document.getElementById("cargototal").innerHTML=contenido;

}
function ok(){
   window.location="inicio.html"
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
let userLogged =localStorage.getItem("User-Logged");
if(!userLogged){
   localStorage.setItem("login-need",JSON.stringify({
       from:"cart.html",
       msg:"Debes estar logueado para poder comprar!"
   }));
   window.location="index.html"
}




getJSONData(CART_INFO_URL).then(function(resultObj){
   if(resultObj.status === "ok"){
       cartArray=resultObj.data;
       showCart(cartArray);
       calcEnvio();
   }
});
});

let elementos = document.getElementsByName("envio");
for(var i = 0; i<elementos.length; i++){
    elementos[i].addEventListener("change",function(){
        calcEnvio()
    })
   }
   let form = document.getElementById("needs-validation");
  
   form.addEventListener("submit",function(event){
       if(form.checkValidity() === false){
           event.preventDefault();
           event.stopPropagation();
       }else{
           event.preventDefault();
           event.stopPropagation();

           let confirmData ={
               usuario: document.getElementById("nombre").value + " " + document.getElementById("apellido").value,
               depto: document.getElementById("depto").value,
               dir: document.getElementById("dir").value,
               envio:envio(),
               precioTotal: totalConEnvio
           };
           document.getElementById("modal-body").innerHTML=`
           <div class="alert alert-success show" role="alert">
           <button class="close" onclick="ok()">&times;</button>
           <span>${confirmData.usuario}, su compra ha sido realizada con exito!</span><br><br>
           <p>
           Los productos seran enviados a ${confirmData.dir}, en el departamento de ${confirmData.depto}.<br>
           Y llegarán aproximadamente en <b>${envio()}</b> dias <br><br>
           Su costo total es de: <b style="background:orange;">USD ${confirmData.precioTotal}</b> 
           </p>
           </div> 
           `;
       }
       form.classList.add("was-validated");
      });