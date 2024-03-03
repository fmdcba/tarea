document.querySelector('#siguiente-paso').onclick = function(e) {
  const $form = document.querySelector('form');
  const cantidadIntegrantes = Number($form.integrantes.value);

  borrarIntegrantesAnteriores();
  const esExito = validarCantidadIntegrantes(cantidadIntegrantes) === 0;

  esExito ? crearIntegrante(cantidadIntegrantes) : '';

  e.preventDefault();
}

function crearIntegrante(cantidad){
  for (let i = 0; i < cantidad; i++) {
    const $campoIntegrante = document.createElement('div');
    $campoIntegrante.className = 'integrantes'

    const $IntegranteTexto = document.createElement('label');
    $IntegranteTexto.textContent = `Integrante Nº ${i + 1}:`;

    const $IntegranteEdad = document.createElement('input');
    $IntegranteEdad.type = 'number';
    $IntegranteEdad.placeholder = 'Ingresar Edad';
    $IntegranteEdad.className = 'edades';

    const $botonAgregarSalario = document.createElement('button');
    $botonAgregarSalario.textContent = 'Agregar Salario';
    $botonAgregarSalario.className = `boton-salario`;
    $botonAgregarSalario.id = `boton-agregar-${i}`

    $campoIntegrante.appendChild($IntegranteTexto);
    $campoIntegrante.appendChild($IntegranteEdad);
    $campoIntegrante.appendChild($botonAgregarSalario);

    const $contenedorIntegrantes = document.querySelector('#integrantes');
    $contenedorIntegrantes.appendChild($campoIntegrante);
  }
}

function borrarIntegrantesAnteriores(){
  document.querySelectorAll('.integrantes').forEach(function (integrante) {
    integrante.remove();
  })
}

function validarCantidadIntegrantes(integrantes){
  const error = {'integrantes': validarCantidad(integrantes)};

  return manejarErrores(error);
}

function manejarErrores(errores){
  const keys = Object.keys(errores)
  const $errores = document.querySelector('#errores');
  let contador = 0;

  keys.forEach(function(key) {
    const error = errores[key];
    const $form = document.querySelector('form');
    const $errorAnterior = document.querySelector('li');

    if (error) {
      $form[key].className = 'error';
      contador++;

      if($errorAnterior !== null) {
        $errorAnterior.remove();
      }

      const $error = document.createElement('li');
      $error.textContent = error;
      $errores.appendChild($error);

    } else {
      $form[key].className = '';

      if($errorAnterior !== null) {
        $errorAnterior.remove();
      }
    }
  });

  return contador;
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
