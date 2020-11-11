const $d=document;
const $consola=document.getElementById("entrada");
const $salida=document.getElementById("salida");
const operadores=["+","-","*","/",".","(",")"];
const numeros=["0","1","2","3","4","5","6","7","8","9"];
let cont=0;

function suma(a="",b=""){

}

function  resta(a="",b=""){

}

function  multiplicacion(a="",b=""){
   
  let res=parseFloat(a)*parseFloat(b);
  
  return new String(res);
}

function divicion(a="",b=""){
  let res=parseFloat(a)/parseFloat(b);
  
  return new String(res);
}
function tipo(cadena=""){
  let res="";
   for(let i=0;i<cadena.length;i++){
     if(cadena[i]==operadores[2]||cadena[i]==operadores[3]){
        if(cadena[i]==operadores[2]){
          res=multiplicacion(cadena[i-1],cadena[i+1]);
        }
        if(cadena[i]==operadores[3]){
          res=divicion(cadena[i-1],cadena[i+1]);
        }
        console.log(cadena.length+" "+(i+2));
        if(i+2<cadena.length){
          for(let j=i+2;j<cadena.length;j++){
            res+=cadena[j];
          }
        }
        tipo(res);
        console.log(res);
        break;
     }
   }
}

function partirP(cadena=""){
   let aux1="";
   let aux2="";
   let cont=0;
   let aux=0; 
  for(let i=0;i<cadena.length;i++){
      if(cadena[i]==operadores[5]){
        aux++;cont++;
        do{
          aux1+=cadena[i+aux];
          if(operadores[5]==cadena[i+aux+1]){
            cont++;
          }else if(operadores[6]==cadena[i+aux+1]){
            cont--;
          }
          aux++;
        }while(cont!=0);
        console.log(aux1);
        aux2=partirP(cadena);
        break;
      }
  }
  return aux1;
}

function validarCadena(cadena=""){
   let cont=0;
   /*validar que al principio es correcto*/
   for(let i=0;i<numeros.length;i++){
     if(cadena[0]==numeros[i]){
       cont++; break;
     }
   }
   if(cont==0){
     if(cadena[0]!=operadores[1]&&cadena[0]!=operadores[5]){
      console.log("Error de al inicio"); return 0;
     }
   }
   cont=0;
   /*validar que no se repitan y que no sean continuos*/
   for(let i=0;i<cadena.length;i++){
     for(let j=0;j<5;j++){
       if(cadena[i]==operadores[j]&&i<cadena.length-1){
           if(cadena[i+1]==operadores[j]){
             console.log("Error repitio un operador"); return 0;
           }
           for(let k=0;k<5;k++){
             if(cadena[i+1]==operadores[k]&&k!=j){
               console.log("Ingreso dos operadores continuos"); return 0;
             }
           }
       }
     }
   }
   /*validar que cada corchete tiene uno de cierre*/
   for(let i=0;i<cadena.length;i++){
     if(cadena[i]==operadores[5]){
         cont++;
     }else if(cadena[i]==operadores[6]){
         cont--;
     }
   }
   if(cont!=0){
     console.log("un parentecis no se cerro");
     return 0;
   }
   cont=0;
  
   /*validar que el final sea valido*/
  for(let i=0;i<numeros.length;i++){
    if(cadena[cadena.length-1]==numeros[i]){
      cont++; break;
    }
  }
  if(cont==0){
    if(cadena[cadena.length-1]!=operadores[6]){
     console.log("Error de al final"); return 0;
    }
  }
  cont=0;
   partir(cadena);
   return 1;
}

$d.addEventListener("click",(e)=>{
  const $etiqueta=e.target;
   if($etiqueta.matches(".tecleado-boton")
     &&$etiqueta.id!="elim"
     &&$etiqueta.id!="igual"
     &&$etiqueta.id!="del"
     &&cont<20){
     $consola.innerHTML+=$etiqueta.innerHTML;cont++;
   }
   if($etiqueta.id=="elim"){
    let aux=$consola.innerHTML;
    $consola.innerHTML="";
    let aux1="";
    for(let i=0;i<aux.length-1;i++){
      aux1+=aux[i];
    }
    $consola.innerHTML=aux1;
   }
   if($etiqueta.id=="del"){
     $consola.innerHTML="";
     $salida.innerHTML="";
   }
   if($etiqueta.id=="igual"){
     //console.log(validarCadena($consola.innerHTML));
     tipo($consola.innerHTML);
   }
});