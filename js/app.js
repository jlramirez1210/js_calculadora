var Calculadora = (function(){
  var numActual;
  var punto = false;
  var signo = false;
  var iniciar = function(display){
    numActual = display;
  };
  var presionar = function(t){
    document.getElementById(t).style.transform = "scale(0.9,0.9)";
  };
  var soltar = function(t){
    document.getElementById(t).style.transform = "none";
  };
  var setValor = function(val){
    numActual.innerHTML = val;
  };
  var setOperador = function(val){

  };
  var limpiar = function(){
    setValor('0');
    punto = false;
    signo = false;
  };
  var numero = function(t){
    alert("numero "+t);
  };
  var alfa = function(x){
    if(parseInt(x)>=0 && parseInt(x)<=9){
      if(numActual.innerHTML=='0'){
        setValor('');
      }
      setValor(numActual.innerHTML+x);
    }else if(x=='punto' && punto==false){
      setValor(numActual.innerHTML+'.');
      punto=true;
    }else if(x=='sign' && numActual.innerHTML!=0){
      if(signo==false){
        setValor('-'+numActual.innerHTML);
        signo = true;
      }else{
        setValor(numActual.innerHTML.substring(1,numActual.innerHTML.length));
        signo = false;
      }
    }else if(x=='dividido' || x=='por' || x=='menos' || x=='mas') {
      setOperador(x);
    }else if(x=='on'){
      limpiar();
    }
  }
  return{
    iniciar: iniciar,
    presionar: presionar,
    soltar: soltar,
    alfa: alfa
  }
})();
//Al cargar la pagina
window.onload = function () {
  var clase = document.getElementsByClassName('tecla');
  for(x=0;x<clase.length;x++){
    //Efecto de tecla presionada
    clase[x].addEventListener('mousedown', function(e){
      var img = (e.target) ? e.target : e.srcElement;
      Calculadora.presionar(img.id);
    });
    //Efecto de tecla soltar tecla
    clase[x].addEventListener('mouseup', function(e){
      var img = (e.target) ? e.target : e.srcElement;
      Calculadora.soltar(img.id);
    });
    //click
    clase[x].addEventListener('click', function(e){
      var img = (e.target) ? e.target : e.srcElement;
      Calculadora.alfa(img.id);
    });
  }
  //Numero en pantalla
  var display = document.getElementById('display');
  Calculadora.iniciar(display);
}
