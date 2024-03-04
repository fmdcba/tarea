document.querySelector('#siguiente-paso').onclick = function(e) {
  const $integrantes = document.querySelector('#integrantes');
  const cantidadIntegrantes = Number($integrantes.value);

  borrarIntegrantesAnteriores();
  borrarErroresAnteriores();
  const esValido = validarCampo($integrantes, cantidadIntegrantes);

  if (esValido) {
    mostrarBoton('calcular-edades');
    crearIntegrantes(cantidadIntegrantes);
  }

  e.preventDefault();
}

document.querySelector('#calcular-edades').onclick = function(e) {
  const $edades = document.querySelectorAll('.edades');
  const esValido = [];
  const edades = [];

  borrarErroresAnteriores();

  $edades.forEach(function($edad) {
    const edadIntegrante = Number($edad.value);
    edades.push(edadIntegrante);

    esValido.push(validarCampo($edad, edadIntegrante));
  })

  if (!esValido.includes(false)) {
    mostrarResultado('edad', edades);
  }

  e.preventDefault()
}

function mostrarResultado(tipo, resultado){
  document.querySelector(`#mayor-${tipo}`).textContent = obtenerMayorNumero(resultado);
  document.querySelector(`#menor-${tipo}`).textContent = obtenerMenorNumero(resultado);
  document.querySelector(`#promedio-${tipo}`).textContent = obtenerPromedio(resultado);

  if (tipo === 'salario') {
    document.querySelector(`#promedio-${tipo}-anual`).textContent = obtenerPromedio(resultado);
    document.querySelector(`#promedio-${tipo}-mensual`).textContent = obtenerPromedio(resultado);
  }
}

function crearIntegrantes(cantidad){
  for (let i = 0; i < cantidad; i++) {
    const $campoIntegrante = document.createElement('div');
    $campoIntegrante.className = 'integrantes'

    const $IntegranteTexto = document.createElement('label');
    $IntegranteTexto.textContent = `Integrante Nº ${i + 1}:`;

    const $IntegranteEdad = document.createElement('input');
    $IntegranteEdad.type = 'number';
    $IntegranteEdad.placeholder = 'Ingresar Edad';
    $IntegranteEdad.className = 'edades';
    $IntegranteEdad.id = `edad-${i + 1}`;

    const $botonAgregarSalario = document.createElement('button');
    $botonAgregarSalario.textContent = 'Agregar Salario';
    $botonAgregarSalario.className = `boton-salario`;
    $botonAgregarSalario.id = `boton-agregar-${i}`

    $campoIntegrante.appendChild($IntegranteTexto);
    $campoIntegrante.appendChild($IntegranteEdad);
    $campoIntegrante.appendChild($botonAgregarSalario);

    const $contenedorIntegrantes = document.querySelector('#contenedor-integrantes');
    $contenedorIntegrantes.appendChild($campoIntegrante);
  }
}

function borrarIntegrantesAnteriores() {
  document.querySelectorAll('.integrantes').forEach(function (integrante) {
    integrante.remove();
  })
}

function borrarErroresAnteriores() {
  const $errorAnterior = document.querySelectorAll('li');

  $errorAnterior.forEach(function($error) {
    if($error !== null) {
      $error.remove();
    }
  })

}

function validarCampo($campo, contenido) {
  const error = {};
  const idCampo = $campo.id;

  if ($campo.id === 'integrantes') {
    error[idCampo] = validarCantidad(contenido);
  }

  if ($campo.classList.contains('edades')) {
    error[idCampo] = validarEdad(contenido);
  } else if ($campo.classList.contains('salarios')) {
    error[idCampo] = validarSalario(contenido);
  }

  return manejarErrores(error, $campo);
}

function manejarErrores(errores, $campo){
  const keys = Object.keys(errores)
  const $errores = document.querySelector('#errores');

  let esValido = true;

  keys.forEach(function(key) {
    const error = errores[key];

    if (error) {
      esValido = false;
      $campo.classList.add('error');

      const $error = document.createElement('li');
      $error.textContent = error;
      $errores.appendChild($error);
    } else {
      esValido = true;
      $campo.classList.remove('error')
    }
  });

  return esValido;
}

function mostrarBoton(id) {
  const $boton = document.querySelector(`#${id}`)
  $boton.classList.remove('oculto');
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
