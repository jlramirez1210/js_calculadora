var Calculadora = (function(){
  var presionar = function(t){
    document.getElementById(t).style.transform = "scale(0.9,0.9)";
  };
  var soltar = function(t){
    document.getElementById(t).style.transform = "none";
  };
  var iniciar = function(t){

  };
  return{
    iniciar: iniciar,
    presionar: presionar,
    soltar: soltar
  }
})();
//Al cargar la pagina
window.onload = function () {
  var clase = document.getElementsByClassName('tecla');
  for(x=0;x<clase.length;x++){
    clase[x].addEventListener('mousedown', function(e){
      var img = (e.target) ? e.target : e.srcElement;
      Calculadora.presionar(img.id);
    });
    clase[x].addEventListener('mouseup', function(e){
      var img = (e.target) ? e.target : e.srcElement;
      Calculadora.soltar(img.id);
    });
  }
}
