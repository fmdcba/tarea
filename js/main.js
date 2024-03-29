document.querySelector('#siguiente-paso').onclick = function(e) {
  const $integrantes = document.querySelector('#integrantes');
  const cantidadIntegrantes = Number($integrantes.value);

  borrarIntegrantesAnteriores();
  borrarErroresAnteriores();
  const esValido = validarCampo($integrantes, cantidadIntegrantes);

  if (esValido) {
    mostrarBoton('calcular-edades');
    crearIntegrantes(cantidadIntegrantes);
    manejarBotonesSalario();
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
    manejarSalarios();
  }

  e.preventDefault()
}

document.querySelector('#calcular-salarios').onclick = function(e) {
  const $salarios = document.querySelectorAll('.salarios');
  const esValido = [];
  const salarios = [];

  borrarErroresAnteriores();

  $salarios.forEach(function($salario) {
    const salarioIntegrante = Number($salario.value);
    salarios.push(salarioIntegrante);

    esValido.push(validarCampo($salario, salarioIntegrante));
  })

  if (!esValido.includes(false)) {
    mostrarResultado('salario', salarios);
  }

  e.preventDefault()
}

function manejarBotonesSalario(){
  const $botonesSalario = document.querySelectorAll('.boton-salario');

  for (let i  = 0; i < $botonesSalario.length; i++) {
    $botonesSalario[i].onclick = function(e) {
      crearCampoSalario(i);
      mostrarBoton('calcular-salarios');
      ocultarBoton(`boton-agregar-${i}`);
      manejarBotonesCancelarSalario();

      e.preventDefault();
    }
  }
}

function manejarBotonesCancelarSalario(){
  const $botonesCancelarSalario = document.querySelectorAll('.boton-cancelar-salario');
  contador = 0;

  for(let i = 0; i < $botonesCancelarSalario.length; i++) {
    $botonesCancelarSalario[i].onclick = function() {
      const $idBotonCancelar = Number($botonesCancelarSalario[i].id);

      while (contador !== $idBotonCancelar) {
        contador++;
      }

      if (contador === $idBotonCancelar) {
        removerCamposSalario(contador, $botonesCancelarSalario[i]);
        contador = 0;
      }
    }
  }
}

function removerCamposSalario(numero, boton) {
  const $textoSalarioARemover = document.querySelector(`#texto-salario-${numero}`);
  const $campoSalarioARemover = document.querySelector(`#campo-salario-${numero}`);

  $textoSalarioARemover.remove();
  $campoSalarioARemover.remove();
  boton.remove();

  mostrarBoton(`boton-agregar-${numero}`);

  $botonesCancelarRestantes = document.querySelectorAll('.boton-cancelar-salario');

  if ($botonesCancelarRestantes.length === 0) {
    ocultarBoton('calcular-salarios');
  }
}

function crearCampoSalario(indice) {
  const $textoSalario = document.createElement('label');
  $textoSalario.textContent = 'Salario Anual: $';
  $textoSalario.id = `texto-salario-${indice}`;

  const $campoSalario = document.createElement('input');
  $campoSalario.type = 'number';
  $campoSalario.id = `campo-salario-${indice}`;
  $campoSalario.className = `salarios`;

  const $botonCancelar = document.createElement('button');
  $botonCancelar.textContent = 'Cancelar';
  $botonCancelar.id = indice;
  $botonCancelar.className = 'boton-cancelar-salario';

  const $camposIntegrantes = document.querySelectorAll('.integrantes');

  $camposIntegrantes[indice].appendChild($textoSalario);
  $camposIntegrantes[indice].appendChild($campoSalario);
  $camposIntegrantes[indice].appendChild($botonCancelar);
}

function mostrarResultado(tipo, resultados){
  document.querySelector(`#mayor-${tipo}`).textContent = obtenerMayorNumero(resultados);
  document.querySelector(`#menor-${tipo}`).textContent = obtenerMenorNumero(resultados);

  if (tipo === 'salario') {
    const numerosParaSalarioMensual=[];

    resultados.forEach(function(resultado) {
      numerosParaSalarioMensual.push(resultado / 12);
    })

    document.querySelector(`#promedio-${tipo}-anual`).textContent = obtenerPromedio(resultados);
    document.querySelector(`#promedio-${tipo}-mensual`).textContent = obtenerPromedio(numerosParaSalarioMensual);
  } else {
    document.querySelector(`#promedio-${tipo}`).textContent = obtenerPromedio(resultados);
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

function ocultarBoton(id) {
  const $boton = document.querySelector(`#${id}`)
  $boton.classList.add('oculto');
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
