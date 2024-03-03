document.querySelector('#siguiente-paso').onclick = function(e) {
  const $form = document.querySelector('form');
  const cantidadIntegrantes = Number($form.integrantes.value);

  borrarIntegrantesAnteriores();
  const esExito = validarCampo('integrantes', cantidadIntegrantes) === 0;

  esExito ? crearIntegrante(cantidadIntegrantes) : '';

  e.preventDefault();
}

/* document.querySelector('#calcular-edades').onclick = function(e) {
  const numeros = obtenerEdadesIntegrantes();
} */

function obtenerEdadesIntegrantes(){
  const $edades = document.querySelectorAll('#edades');
  const edades = [];

  $edades.forEach(function(edad) {
    validarEdad()
    edades.push(edad)
  })
}

function validarCampo(){}

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

function validarCampo(campo, datos){
  const error = {};

  if (campo === 'integrantes') {
    error[campo] = validarCantidad(datos);
  } else if (campo === 'edades') {
    error[campo] = validarEdad(datos);
  } else if (campo === 'salarios') {
    error[campo] = validarSalario(datos);
  }

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

      const $botoncalcularEdades = document.querySelector('#calcular-edades');
      $botoncalcularEdades.className = '';
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


function validarEdad(edad) {
  if (edad <= 0) {
    return 'La edad debe ser mayor a 0';
  }

  if(!Number.isInteger(edad)) {
    return 'La edad debe ser un número entero';
  }

  if(edad > 130) {
    return 'La edad no puede superar 130';
  }

  return '';
}

function validarSalario(salario) {
  if (salario <= 0) {
    return 'El salario debe ser mayor a 0';
  }

  if(salario > 10000000000) {
    return 'El salario no puede superar 10000000000';
  }

  return '';
}
