const $d=document;
const $consola=document.getElementById("entrada");
const $salida=document.getElementById("salida");
const operadores=["+","-","*","/",".","(",")"];
const numeros=["0","1","2","3","4","5","6","7","8","9"];
let cont=0;

function suma(a="",b=""){
  let res=parseFloat(a)+parseFloat(b);
  return ""+res;
}

function  resta(a="",b=""){
  let res=parseFloat(a)-parseFloat(b);
  return ""+res;
}

function  multiplicacion(a="",b=""){
  let res=parseFloat(a)*parseFloat(b);
  return ""+res;
}

function divicion(a="",b=""){
  let res=parseFloat(a)/parseFloat(b);
  return ""+res;
}

function resultado(obj){
   while(obj.length!=1){
    for(let i=0;i<obj.length;i++){
      if(obj[i]==operadores[2]||obj[i]==operadores[3]){
        let res;
        if(obj[i]==operadores[2]){
          res=multiplicacion(obj[i-1],obj[i+1]);
        }else{
          res=divicion(obj[i-1],obj[i+1])
        }
        obj.splice(i-1,2);
        obj[i-1]=res;
      }          
    }
    console.log(obj);
    if(obj.length>1){
      for(let i=0;i<obj.length;i++){
        if(obj[i]==operadores[0]||obj[i]==operadores[1]){
          let res;
          if(obj[i]==operadores[0]){
            res=suma(obj[i-1],obj[i+1]);
          }else{
            res=resta(obj[i-1],obj[i+1])
          }
          obj.splice(i-1,2);
          obj[i-1]=res;
        }
      }
    }
   }
  
   return obj[0];
}

function agruparSinParentesis(cadena=""){
  let res="";
  let array=[];
   for(let i=0;i<cadena.length;i++){
     if(cadena[i]==operadores[0]||cadena[i]==operadores[1]||cadena[i]==operadores[2]||cadena[i]==operadores[3]){
       if(res.length>0){
        array.push(res);
        res="";
        }
        array.push(cadena[i]);
        res="";
     }else{
      res+=cadena[i];
     }
   }
   if(res.length>0){
    array.push(res);
    res="";
   }
   return array;
}

function parentesis(cadena=""){
  let rot="";
  let salto=0;
  let pos=0;
  for(let i=1;i<cadena.length;i++){
     if(cadena[i]==operadores[5]){
       let contp=1;let res1=""; let inc=1;
       while(contp!=0){
         res1+=cadena[i+inc];inc++;
        if(cadena[i+inc]==operadores[5]){
            contp++;
        }else if(cadena[i+inc]==operadores[6]){
            contp--;
        } 
      }
      rot=parentesis(res1);
      salto=inc;
      pos=i;
      i=i+inc;
    }
  }
  let aux="";
  if(rot.length==0){
    for(let i=0;i<cadena.length;i++){
        if(cadena[i]!=operadores[5]&&cadena[i]!=operadores[6]){
          aux+=cadena[i];
        }
    }
  }else{
    for(let i=0;i<cadena.length;i++){
      if(cadena[i]!=operadores[5]&&cadena[i]!=operadores[6]){
        aux+=cadena[i];
      }else if(i==pos){
        for(let j=0;j<numeros.length;j++){
          if(cadena[i-1]==numeros[j]){
            aux+="*"; break;
          }
        }
        aux+=rot;
        i=i+salto;
      }
    }
  }
  return resultado(agruparSinParentesis(aux));  
}

function agrupar(cadena=""){
  let res="";
  let array=[];
   for(let i=0;i<cadena.length;i++){
     if(cadena[i]==operadores[0]||cadena[i]==operadores[1]||cadena[i]==operadores[2]||cadena[i]==operadores[3]){
       if(res.length>0){
        array.push(res);
        res="";
        }
        array.push(cadena[i]);
        res="";
     }else if(cadena[i]==operadores[5]){
      if(res.length>0){
        array.push(res);
        array.push("*");
        res="";
      }
       let contp=1;let res1=cadena[i]; let inc=1;
       while(contp!=0){
         res1+=cadena[i+inc];
        if(cadena[i+inc]==operadores[5]){
            contp++;
        }else if(cadena[i+inc]==operadores[6]){
            contp--;
        }
        inc++;
      }
      array.push(res1);
      i=i+inc-1;     
     }else{
      res+=cadena[i];
     }
   }
   if(res.length>0){
    array.push(res);
    res="";
   }
   for(let i=0;i<array.length;i++){
    if(array[i][0]==operadores[5]){
      array[i]=parentesis(array[i]);
    }
   }
  
   return resultado(array);
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
      console.log("Error de al inicio"); return "Syntax Error";
     }
   }
   cont=0;
   /*validar que no se repitan y que no sean continuos*/
   for(let i=0;i<cadena.length;i++){
     for(let j=0;j<5;j++){
       if(cadena[i]==operadores[j]&&i<cadena.length-1){
           if(cadena[i+1]==operadores[j]){
             console.log("Error repitio un operador"); return "Syntax Error";
           }
           for(let k=0;k<5;k++){
             if(cadena[i+1]==operadores[k]&&k!=j){
               console.log("Ingreso dos operadores continuos"); return "Syntax Error";
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
     return "Syntax Error";
   }
   cont=0;
  
   /*validar que el final sea valido*/
  for(let i=0;i<numeros.length;i++){
    if(cadena[cadena.length-1]==numeros[i]){
      cont++; break;
    }
  }
  for(let i=0;i<cadena.length;i++){
    if(cadena[i]==operadores[6]){
      if((i+1)<cadena.length){
        for(let j=0;j<numeros.length;j++){
          if(cadena[i+1]==numeros[j]){
            console.log("Error el corchete de cierre tiene acompañante");
            return "Syntax Error"; 
          }
        }
      }
    }
  }
  if(cont==0){
    if(cadena[cadena.length-1]!=operadores[6]){
     console.log("Error de al final"); return "Syntax Error";
    }
  }
  cont=0;
  return agrupar(cadena);
}

$d.addEventListener("click",(e)=>{
  const $etiqueta=e.target;
   if($etiqueta.matches(".tecleado-boton")
     &&$etiqueta.id!="elim"
     &&$etiqueta.id!="igual"
     &&$etiqueta.id!="del"
     &&cont<20){
     $consola.innerHTML+=$etiqueta.innerHTML;cont++;
     $salida.innerHTML="";
   }
   if($etiqueta.id=="elim"){
    let aux=$consola.innerHTML;
    $consola.innerHTML="";
    let aux1="";
    for(let i=0;i<aux.length-1;i++){
      aux1+=aux[i];
    }
    $consola.innerHTML=aux1;cont--;
   }
   if($etiqueta.id=="del"){
     $consola.innerHTML="";
     $salida.innerHTML="";cont=0;
   }
   if($etiqueta.id=="igual"){
     $salida.innerHTML="";
     $salida.innerHTML=validarCadena($consola.innerHTML);
   }
});
