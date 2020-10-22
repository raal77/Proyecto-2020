var cartArray = [];
var totalConEnvio;
///////////////////////////////////////////////////////////////////////////////////////////////// 
function calcTotal(){
   let subs= document.getElementsByClassName("subtotal")
   let suma = 0;
   for(let i=0; i<subs.length;i++){
       suma+= parseInt(subs[i].innerHTML)
   }
   document.getElementById("total").innerText=suma;
}
/////////////////////////////////////////////////////////////////////////////////////////////////

function calcSubtotal(unitCost,i){
   let cantidad = parseInt(document.getElementById(`cantidad${i}`).value); 
    document.getElementById(`artSubtotal${i}`).innerHTML= cantidad * unitCost; ; 
   
   calcTotal();
}
/////////////////////////////////////////////////////////////////////////////////////////////////

function showCart(array){
   let cart = "";
  
   for(let i = 0; i<array.articles.length; i++){
       let art = array.articles[i];
        
           if(art.currency==="UYU"){
              unitCost = art.unitCost/40;
           }else{
              unitCost = art.unitCost;
           }
           let sub =  unitCost * art.count ;


       cart+= `
       <tr class="cart">
       <td><img class="imgcart" src="${art.src}"><br>${art.name}</td>
    
       <td>${art.currency} ${ art.unitCost}</td>
       <td><input style="width:60px;" onchange="calcSubtotal(${ unitCost},${i})"
       type="number" id="cantidad${i}" value="${art.count}" min="1"></td>
       
        <td><span class="subtotal" id="artSubtotal${i}" style="font-weight:bold;"> ${sub}</span></td> 
      
        <td><button class="btn btn-danger" onclick="eliminar(${i})">X</button></td>
        </tr>
       `

       document.getElementById("contenido").innerHTML = cart;


   }
calcTotal();
}
/////////////////////////////////////////////////////////////////////////////////////////////////
 
function eliminar(i){
   if(cartArray.articles.length > 1){
       cartArray.articles.splice(i,1);
       showCart(cartArray);
   }else{
       document.getElementById("sell").classList.add("d-none");
   document.getElementById("prodcart").innerHTML = `
   <div class="elim">
   <h2>No hay productos en su carrito</h2>
   <p>Ingrese a ver la lista de productos <a href="products.html">Ver Productos</a></p>
   </div>
   `;
   }
}
/////////////////////////////////////////////////////////////////////////////////////////////////

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
/////////////////////////////////////////////////////////////////////////////////////////////////

function calcEnvio(){
   let total = parseInt(document.getElementById("total").innerHTML);
   let envio;

   let elementos = document.getElementsByName("envio");

   for(var i=0; i<elementos.length;i++){
       if(elementos[i].checked && elementos[i].value==1 ){
           envio = Math.round(total*0.15);
       }if(elementos[i].checked && elementos[i].value==2 ){
        envio = Math.round(total*0.07);
    }if(elementos[i].checked && elementos[i].value==3 ){
        envio = Math.round(total*0.05);
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
/////////////////////////////////////////////////////////////////////////////////////////////////

function ok(){
   window.location="cart.html"
}
/////////////////////////////////////////////////////////////////////////////////////////////////

 function seleccionarPago(){
    var pagos =document.getElementsByName("formaPago");
    for(var i=0;i<pagos.length;i++){
        if(pagos[i].checked && (pagos[i].value)=="1"){

            document.getElementById("datosTarjeta").classList.remove("d-none");
            document.getElementById("datosBanco").classList.add("d-none");
       
        }else if(pagos[i].checked && (pagos[i].value)=="2"){
        document.getElementById("datosTarjeta").classList.add("d-none");
        document.getElementById("datosBanco").classList.remove("d-none");
    }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////

function pagoValido(){
    let titularTarjeta = document.getElementById("owner").value;
    let numTarjeta = document.getElementById("cardNumber").value;
    let cvv = document.getElementById("cvv").value;
    let cuenta = document.getElementById("cuenta").value;
    let formaPago = document.getElementsByName("formaPago");
    let pagoValido = true;

    for (var i=0;i<formaPago.length;i++){
        if(formaPago[i].checked && (formaPago[i].value)=="1"){
            if(numTarjeta =="" || titularTarjeta =="" || cvv ==""){
                pagoValido=false;
            }else{
                pagoValido = true;
            }
        }else if(formaPago[i].checked && (formaPago[i].value)=="2"){
              if(cuenta==""){
                  pagoValido = false;
              }else{
                  pagoValido = true;
              }
        }
    }
    return pagoValido;
}
/////////////////////////////////////////////////////////////////////////////////////////////////

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
/////////////////////////////////////////////////////////////////////////////////////////////////

getJSONData(CART_INFO_URL).then(function(resultObj){
   if(resultObj.status === "ok"){
       cartArray=resultObj.data;
       showCart(cartArray);
       calcEnvio();
   }
});
});
/////////////////////////////////////////////////////////////////////////////////////////////////

let elementos = document.getElementsByName("envio");
for(var i = 0; i<elementos.length; i++){
    elementos[i].addEventListener("change",function(){
        calcEnvio()
    })
   }
/////////////////////////////////////////////////////////////////////////////////////////////////

let tiposPago = document.getElementsByName("formaPago");
for(var i =0; i<tiposPago.length;i++){
    tiposPago[i].addEventListener("change",function(){
        seleccionarPago();
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////
 
 document.getElementById("comprar").addEventListener("click",function(e){
let validation =true;
let nombre= document.getElementById("nombre");
let direccion= document.getElementById("direccion");
let no= document.getElementById("no");
let esquina= document.getElementById("esquina");

if(nombre.value===""){
    nombre.classList.add("is-invalid");
    validation=false;
}else{
    nombre.classList.remove("is-invalid")
}


if(direccion.value=== ""){
    direccion.classList.add("is-invalid");
    validation=false;
}else{
    direccion.classList.remove("is-invalid");
}


if(no.value===""){
    no.classList.add("is-invalid");
    validation=false;
}else{
    no.classList.remove("is-invalid");
}


if(esquina.value===""){
    esquina.classList.add("is-invalid");
    validation=false;
}else{
    esquina.classList.remove("is-invalid");
}

if(!pagoValido()){
    document.getElementById("btnPago").classList.remove("btn-primary");
    document.getElementById("btnPago").classList.remove("btn-success");
    document.getElementById("btnPago").classList.add("btn-danger");

    document.getElementById("elegir").classList.remove("d-none");
    document.getElementById("elegir").classList.add("rojo");
    document.getElementById("elegido").classList.add("d-none")
     validation=false;
}else{
    document.getElementById("btnPago").classList.remove("btn-primary");
    document.getElementById("btnPago").classList.remove("btn-danger");
    document.getElementById("btnPago").classList.add("btn-success");
    document.getElementById("elegir").classList.add("d-none");
    document.getElementById("elegido").classList.remove("d-none")
    document.getElementById("elegido").classList.add("verde")
}

if(validation){

let confirmar ={
    nombre:document.getElementById("nombre").value,
     dir: document.getElementById("direccion").value,
     no: document.getElementById("no").value,
     esquina: document.getElementById("esquina").value,
     depto: document.getElementById("paisEnvio").value,
     precioTotal: totalConEnvio
};
document.getElementById("confirmacion").innerHTML=`
<div class="alert alert-success show" role="alert">
<button class="close" onclick="ok()">&times;</button>
<span>${confirmar.nombre}, su compra ha sido realizada con exito!</span><br><br>
<p>
Sus productos serán enviados al ${confirmar.no} de la calle ${confirmar.dir} esquina ${confirmar.esquina}, ${confirmar.depto}.
</p>
<p>El precio total de la compra es de:<b style="background:orange;"> USD ${confirmar.precioTotal}</b>.
</p><br>
<p style="text-align:center;">Muchas gracias!!!</p>
 
`;
}
 }) 
///////////////////////////////////////////////////////////////////////////////////////////////// 