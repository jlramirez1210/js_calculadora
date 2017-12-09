var Calculadora = (function(){
  var numActual;
  var numUltimo = null;
  var signo = false;
  var operacion;
  var operar = false;
  var igual = false;
  var num = 0;
  var consec = false;

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
    val = String(val);
    if(val.length<=8){
      numActual.innerHTML = val;
    }else{
      numActual.innerHTML = val.substring(0,8);
    }
  };
  var setOperador = function(val){
    if(val=='igual'){
      igual = true;
      signo = false;
      calcular();
      return;
    }
    if(!igual) calcular();
    igual = false;
    operacion = val;
    operar = true;
    signo = false;
    numUltimo = parseFloat(numActual.innerHTML);
  };
  var divide = function(a, b){
    if(b==0){
      alert("Division bajo cero");
      return 0;
    }
    return a / b;
  };
  var multiplica = function(a, b){
    return a * b;
  };
  var resta = function(a, b){
    return a - b;
  };
  var suma = function(a, b){
    return a + b;
  };
  var calcular = function(){
    if(!operacion || numUltimo==null) return;
    if(consec==false){
      num = parseFloat(numActual.innerHTML);
    }
    var result=0;
    switch (operacion) {
      case 'dividido':
        result = divide(numUltimo,num);
        break;
      case 'por':
        result = multiplica(numUltimo,num);
        break;
      case 'menos':
        result = resta(numUltimo,num);
        break;
      case 'mas':
        result = suma(numUltimo,num);
        break;
    }
    setValor(result);
    numUltimo = result;
  };
  var limpiar = function(){
    setValor('0');
    signo = false;
    numUltimo = null;
    igual = false;
    operar = false;
  };
  var alfa = function(x){
    if(parseInt(x)>=0 && parseInt(x)<=9){
      if(numActual.innerHTML=='0' || operar==true){
        setValor('');
        operar = false;
      }
      setValor(numActual.innerHTML+x);
      consec = false;
    }else if(x=='punto'){
      setValor(numActual.innerHTML+'.');
      consec = false;
    }else if(x=='sign' && numActual.innerHTML!=0){
      if(signo==false){
        setValor('-'+numActual.innerHTML);
        signo = true;
      }else{
        setValor(numActual.innerHTML.substring(1,numActual.innerHTML.length));
        signo = false;
      }
      consec = false;
    }else if(x=='dividido' || x=='por' || x=='menos' || x=='mas') {
      setOperador(x);
      setValor('');
      consec = false;
    }else if(x=='igual') {
      setOperador(x);
      consec = true;
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
