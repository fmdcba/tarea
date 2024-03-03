document.querySelector('#siguiente-paso').onclick = function(e) {
  const $form = document.querySelector('form');
  const cantidadIntegrantes = Number($form.integrantes.value);

  borrarIntegrantesAnteriores();
  validarCantidadIntegrantes(cantidadIntegrantes);
  //crearIntegrante(cantidadIntegrantes);

  e.preventDefault();
}

function borrarIntegrantesAnteriores(){
  return '';
}

function validarCantidadIntegrantes(integrantes){
  const error = {'integrantes': validarCantidad(integrantes)};

  manejarErrores(error);
}

function manejarErrores(errores){
  const keys = Object.keys(errores)
  const $errores = document.querySelector('#errores');

  keys.forEach(function(key) {
    const error = errores[key];
    const $form = document.querySelector('form');

    if (error) {
      $form[key].className = 'error';

      const $error = document.createElement('li');
      $error.textContent = error;
      $errores.appendChild($error);
    } else {
      $form[key].className = '';
    }
  });


}

function validarCantidad(cantidad){
  if (cantidad <= 0) {
    return 'La cantidad de integrantes debe ser mayor a 0';
  }

  if(!Number.isInteger(cantidad)) {
    return 'La cantidad de integrantes debe ser un número entero';
  }

  if(cantidad > 180) {
    return 'La cantidad de integrantes no puede superar 180';
  }

  return '';
}
