document.querySelector('#siguiente-paso').onclick = function(e) {
  const $form = document.querySelector('form');
  const cantidadIntegrantes = $form.integrantes.value;

  borrarIntegrantesAnteriores();
  validarCantidadIntegrantes(cantidadIntegrantes);
  crearIntegrante(cantidadIntegrantes);

  e.preventDefault();
}

function borrarIntegrantesAnteriores(){
  return '';
}

function validarCantidadIntegrantes(cantidad){
  if (cantidad === 0) {
    return 'La cantidad de integrantes debe ser mayor a 0';
  }

  if (cantidad < 0) {
    return 'La cantidad de integrantes no puede ser menor a 0';
  }

  if(!Number.isInteger(cantidad)) {
    return 'La cantiadad de integrantes debe ser un número entero';
  }

  if(cantidad > 180) {
    return 'La cantidad de integrantes no puede superar 180';
  }
}

/* function crearFamiliares(cantidadFamiliares){

  if (cantidadFamiliares > 0) {
    mostrarElemento('reiniciar');
    mostrarElemento('calcular-edades');
    ocultarElemento('crear-familiares');

    for (let i = 0; i < cantidadFamiliares; i++){
      crearFamiliar(i);
    }
  } else {
    alert('Ingresá al menos dos familiares para luego poder calcular');
  }
}

function crearFamiliar(indice){
  const $campoFamiliar = document.createElement('div');
  $campoFamiliar.className = 'familiar';

  const $familiarTexto = document.createElement('label');
  $familiarTexto.textContent = `Familiar Nº ${indice + 1}:`;

  const $familiarEdad = document.createElement('input');
  $familiarEdad.type = 'number';
  $familiarEdad.placeholder = 'Ingresar Edad';
  $familiarEdad.className = 'edades';

  const $botonAgregarSalario = document.createElement('button');
  $botonAgregarSalario.textContent = 'Agregar Salario';
  $botonAgregarSalario.className = `boton-salario`;
  $botonAgregarSalario.id = `boton-agregar-${indice}`

  $campoFamiliar.appendChild($familiarTexto);
  $campoFamiliar.appendChild($familiarEdad);
  $campoFamiliar.appendChild($botonAgregarSalario);

  const $contenedorFamiliares = document.querySelector('#familiares');
  $contenedorFamiliares.appendChild($campoFamiliar);
}

document.querySelector('#calcular-edades').onclick = function(e) {
  const numeros = obtenerNumeros('edades');
  const tipo = 'edad';

  if (procesarValidacion(validarEdadesFamiliares(numeros)) === '') {
    insertarValor('mayor', tipo, obtenerMayorNumero(numeros));
    insertarValor('menor' , tipo, obtenerMenorNumero(numeros));
    insertarValor('promedio', tipo, obtenerPromedio(numeros));

    mostrarElemento('resultado-edades');
  }

  e.preventDefault()
}

function obtenerNumeros(tipo){
  const $numeros = document.querySelectorAll(`.${tipo}`);
  const numeros = [];

  for (let i = 0; i < $numeros.length; i++) {
    if ($numeros[i].value) {
      numeros.push(Number($numeros[i].value));
    }
  }

  return numeros;
}

function mostrarElemento(id) {
  document.querySelector(`#${id}`).className = '';
}

function ocultarElemento(id) {
  document.querySelector(`#${id}`).className = 'ocultar';
}

function insertarValor(media, tipo, valor) {
  document.querySelector(`#${media}-${tipo}`).textContent = valor;
}

document.querySelector('#reiniciar').onclick = function (){
  mostrarElemento('crear-familiares');
  ocultarElemento('reiniciar');
  ocultarElemento('calcular-edades');
  ocultarElemento('calcular-salarios');

  document.querySelector('#mayor-edad').textContent = '';
  document.querySelector('#menor-edad').textContent = '';
  document.querySelector('#promedio-edad').textContent = '';
  document.querySelector('#mayor-salario').textContent = '';
  document.querySelector('#menor-salario').textContent = '';
  document.querySelector('#promedio-anual-salario').textContent = '';
  document.querySelector('#promedio-mensual-salario').textContent = '';


  const $familiares = document.querySelectorAll('.familiar');


  for (let i = 0; i < $familiares.length; i++){
    $familiares[i].remove();
  }
}

function manejarSalarios(){
  const $botonesSalario = document.querySelectorAll('.boton-salario');

  for (let i  = 0; i < $botonesSalario.length; i++) {
    $botonesSalario[i].onclick = function(e) {
      crearSalarios(i);
      mostrarElemento('calcular-salarios');

      e.preventDefault();
    }
  }
}

function crearSalarios(indice){
  ocultarElemento(`boton-agregar-${indice}`);
  crearSalario(indice);

  manejarBotonesCancelarSalario();
}

function crearSalario(indice){
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

  const $camposFamiliar = document.querySelectorAll('.familiar');

  $camposFamiliar[indice].appendChild($textoSalario);
  $camposFamiliar[indice].appendChild($campoSalario);
  $camposFamiliar[indice].appendChild($botonCancelar);
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

  mostrarElemento(`boton-agregar-${numero}`);

  $botonesCancelarRestantes = document.querySelectorAll('.boton-cancelar-salario');

  if ($botonesCancelarRestantes.length === 0) {
    ocultarElemento('#calcular-salarios');
  }
}

document.querySelector('#calcular-salarios').onclick = function (e) {
  const numeros = obtenerNumeros('salarios');
  const numerosParaSalarioMensual=[];
  const tipo = 'salario';

  for (let i = 0; i < numeros.length; i++) {
    numerosParaSalarioMensual.push(numeros[i] / 12);
  }

  if (procesarValidacion(validarSalariosFamiliares(numeros)) === '') {
    insertarValor('mayor', tipo, obtenerMayorNumero(numeros));
    insertarValor('menor' , tipo, obtenerMenorNumero(numeros));
    insertarValor('promedio-anual', tipo, obtenerPromedio(numeros));
    insertarValor('promedio-mensual', tipo, obtenerPromedio(numerosParaSalarioMensual));

    mostrarElemento('resultado-salarios');
  }

  e.preventDefault();
}

function validarCantidadFamiliares(cantidadFamiliares){
  if (!cantidadFamiliares) {
    return 'Ingresa la cantidad de familiares para continuar';
  }

  if (Number.isInteger(cantidadFamiliares) === false) {
    return 'Este campo no admite decimales';
  }

  if (cantidadFamiliares < 2) {
    return 'Este campo solo admite valores positivos y mayores a 1';
  }

  if (cantidadFamiliares >= 15) {
    return 'Esos son muchos familiares! Ingresá una cantidad de familiares menor a 15';
  }

  return '';
}

function validarEdadesFamiliares(edades){
  if (edades.length === 0) {
    return 'Ingresa algun valor';
  }

  for (let i = 0; i < edades.length; i++) {
    if (edades[i] === 0) {
      return 'Este campo no acepta valores iguales a 0';
    }

    if (edades[i] > 125) {
      return 'Este campo no acepta edades mayores a 125';
    }

    if (edades[i] < 0) {
      return 'Este campo solo acepta números positivos'
    }

    if (Number.isInteger(edades[i]) === false) {
      return 'Las edades no pueden tener decimales';
    }

  }

  return '';
}

function validarSalariosFamiliares(salarios){
  if (salarios.length === 0) {
    return 'Ingresa algun valor';
  }

  for (let i = 0; i < salarios.length; i++) {
    if (salarios[i] === 0) {
      return 'Este campo no acepta valores iguales a 0';
    }

    if (salarios[i] < 0) {
      return 'Este campo solo acepta números positivos'
    }
  }

  return '';
}

function procesarValidacion(validacion){
  const $contendorError = document.querySelector('#errores');
  const $erroresPrevios = $contendorError.children[0];

  if($erroresPrevios) {
    $erroresPrevios.remove()
  }

  if (validacion !== '') {
    const $error = document.createElement('p');
    $error.textContent = validacion;
    $error.id = 'error';

    $contendorError.appendChild($error)
  } else {
    return '';
  }
}
 */
