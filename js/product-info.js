var productosArray =[];
var comentariosArray= [];
var prodArray = [];

function verRelacionados(){
    window.location="product-info.html";
}
function showRelatedProds(arrayListado,arrayRelacionados){
    let contenido ="";
    arrayRelacionados.forEach(function(i){
    contenido += `<div class="card" style="width: 25rem; margin:auto">
    <img src="${arrayListado[i].imgSrc}" class="card-img-top" style="cursor:pointer" onclick="verRelacionados()">
    <div class="card-body">
      <h5 class="card-title">${arrayListado[i].name}</h5>
      <p class="card-text">${arrayListado[i].description}</p>
      <a href="#" class="btn btn-primary" onclick="verRelacionados()">Ver Producto</a>
    </div>
  </div>`
})
    document.getElementById("relatedProduct").innerHTML = contenido;
}




function showProducto(array,arrayComments){

    for(let i=0; i<productosArray.length;i++){
        let product = array[i];
        let info = "";
        let imgs ="";
        let comentarios = "";
         info += ` 
         <h1 class="title-prod">${product.name}</h1>
        <p class="desc-prod">${product.description}</p><br>
        <p class ="price-prod"> Precio:${product.currency} ${product.cost}</p>

        <small class="soldcount-prod">${product.soldCount} Disponibles</small>
        `;
         imgs+= `
         <ul class="slider">
         <li id="slide1"><img src="img/prod1.jpg"></li>
         <li id="slide2"><img src="img/prod1_1.jpg"></li>
         <li id="slide3"><img src="img/prod1_2.jpg"></li>
         <li id="slide4"><img src="img/prod1_3.jpg"></li>
         <li id="slide5"><img src="img/prod1_4.jpg"></li>
         </ul>
         
        
         
           `;

     
        


         arrayComments.forEach(function(comment){
             let puntos="";
          comentarios +=`
          <strong>${comment.user}</strong> dice:<br>
          <p>${comment.description}</p>   
          `;
          for(let i =1; i<= comment.score; i++ ){
              puntos += `<span class="fa fa-star checked"></span>`; 
          }
          for(let i=comment.score +1; i<=5; i++){
              puntos +=`<span class="fa fa-star"></span>`;
          }
          comentarios += `<div style="text-align:right;">${puntos}</div>`;
          comentarios += `<p class="date-prod">${comment.dateTime}</p><hr>`

        })

        document.getElementById("contenido").innerHTML= info;
        document.getElementById("imagenes").innerHTML= imgs;
        document.getElementById("comentarios").innerHTML= comentarios;
        document.getElementById("relacionado").innerHTML = productosArray[0].relatedProducts;
    }
}








//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   let userLogged = localStorage.getItem("User-Logged");
   if(userLogged){
       document.getElementById("newComment").style ="display:flex";
   }

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            comentariosArray= resultObj.data;
        
             
        }

    });
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            productosArray= resultObj.data;
        
            showProducto(productosArray,comentariosArray);
         }
    });

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            prodArray = resultObj.data;
            showRelatedProds(prodArray,productosArray[0].relatedProducts);
        }
    })


    document.getElementById("enviarComm").addEventListener("click",function(){
        let x = new Date();
        let  dateTime= x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate() + "  "
          + x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds();
         
        let newComment= { 
            // score: parseInt(document.getElementById("stars").value),
           score: getRating(),
            description: document.getElementById("newComm").value,
            user: JSON.parse(localStorage.getItem("User-Logged")).email,
            dateTime:dateTime
        };
        comentariosArray.push(newComment);
    
        showProducto(productosArray,comentariosArray);
    })
      

});