const ORDER_ASC_BY_PRICE ="1->2";
const ORDER_DESC_BY_PRICE = "2->1";
const ORDER_DESC_BY_COUNT = "COUNT -> count";



var productsArray = [];

var minPag = undefined;
var maxPag = undefined;
var buscar = undefined;
function sortProducts(criterio,array){
    let result =[];
    
    if(criterio === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a,b){
            if(a.cost < b.cost){return -1;}
            if(a.cost > b.cost){return 1;}
            return 0;
        });
    }else if(criterio === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a,b){
            if(a.cost > b.cost){return -1;}
            if(a.cost < b.cost){return 1;}
            return 0;
        });
    }else if(criterio === ORDER_DESC_BY_COUNT){
        result = array.sort(function(a,b){
            if(a.soldCount > b.soldCount){return -1;}
            if(a.soldCount < b.soldCount){return 1;}
            return 0;
});
    }
    return result;
}

function verProducto(){
window.location="product-info.html"
}



function showProducts(array){

    let contenido = "";
    
    for( let i = 0; i<array.length;i++){
        let product = array[i];
        let aBuscar = product.name + product.description;

if(((minPag == undefined)|| (minPag != undefined && parseInt(product.cost) >= minPag))&&
((maxPag == undefined) || (maxPag != undefined && parseInt(product.cost) <= maxPag))){
    if(buscar == undefined || aBuscar.toLowerCase().indexOf(buscar) != -1){

        contenido += `
        <div class="row">
        <div class="col-3" id="img-ver"><img src ="`+ product.imgSrc + `"  class="img-thumbnail" onclick="verProducto()"></div>
        <div class="col">
         <h4>` + product.name + `</h4>
        <p class="mb-1"> ` + product.description + `</p><br>
        <p class ="mb-2"> Precio: ` + product.currency + " "+ product.cost + ` </p>

        <small class="text-muted"> ` + product.soldCount +` Disponibles</small>

         
           </div>
      </div>
      <br><hr><br>
      `
    }
}
      document.getElementById("product-container").innerHTML = contenido;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
getJSONData(PRODUCTS_URL).then(function(resultObj){
    if(resultObj.status === "ok"){
        productsArray = resultObj.data;

        productsArray = sortProducts(ORDER_ASC_BY_PRICE,productsArray);
        showProducts(productsArray);
    }
});


});




document.getElementById("sortPagAsc").addEventListener("click",function(){
    productsArray = sortProducts(ORDER_ASC_BY_PRICE,productsArray);

showProducts(productsArray);
});

document.getElementById("sortPagDesc").addEventListener("click",function(){
    productsArray = sortProducts(ORDER_DESC_BY_PRICE,productsArray);

showProducts(productsArray);
});
document.getElementById("sortCountDesc").addEventListener("click",function(){
    productsArray = sortProducts(ORDER_DESC_BY_COUNT,productsArray);

showProducts(productsArray);
});





document.getElementById("filtrar").addEventListener("click",function(){

    minPag = document.getElementById("rango-min").value;
    maxPag = document.getElementById("rango-max").value;

    if((minPag != undefined) && (minPag != "") && (parseInt(minPag)) >= 0){
        minPag = parseInt(minPag);
    }else{
        minPag = undefined;
    }
    if((maxPag != undefined) && (maxPag != "") && (parseInt(maxPag)) >= 0){
        maxPag = parseInt(maxPag);
    }else{
        maxPag = undefined;
    }
    showProducts(productsArray);
});

document.getElementById("limpiar").addEventListener("click",function(){
    document.getElementById("rango-min").value = "";
    document.getElementById("rango-max").value = "";

    minPag = undefined;
    maxPag = undefined;

    showProducts(productsArray);
})

 
document.getElementById("search").addEventListener("input",function(){
    buscar = document.getElementById("search").value.toLowerCase();
   


    showProducts(productsArray);
   });
  
   document.getElementById("btn-buscar").addEventListener("click",function(){
    document.getElementById("search").style="display:flex";
})

 

