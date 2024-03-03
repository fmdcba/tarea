function obtenerMayorNumero(numeros) {
  let mayorNumero = 0;

  for (let i = 0; i < numeros.length; i++) {
    if (mayorNumero < numeros[i]) {
      mayorNumero = numeros[i]
    }
  }

  return mayorNumero;
}

function obtenerMenorNumero(numeros) {
  let menorNumero = numeros[0];

  for (let i = 0; i < numeros.length; i++) {
    if (menorNumero > numeros[i]) {
      menorNumero = numeros[i]
    }
  }

  return menorNumero;
}

function obtenerPromedio(numeros) {
  let numerosSumados = 0;

  for (let i = 0; i < numeros.length; i++) {
    numerosSumados += numeros[i];
  }

  return (numerosSumados / numeros.length).toFixed(2)
}
