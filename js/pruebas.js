/* function probarValidarCantidadFamiliares(){
  console.assert(validarCantidadFamiliares(0) === 'Ingresa la cantidad de familiares para continuar',
  'Validar cantidad de familiares no validó que se haya ingresado al menos un número');

  console.assert(validarCantidadFamiliares(1) === 'Este campo solo admite valores positivos y mayores a 1',
  'Validar cantidad de familiares no validó que el número ingresado sea mayor a 1');

  console.assert(validarCantidadFamiliares(1.5) === 'Este campo no admite decimales',
  'Validar cantidad de familiares no validó que el número ingresado no sea un decimal');

  console.assert(validarCantidadFamiliares(16) === 'Esos son muchos familiares! Ingresá una cantidad de familiares menor a 15',
  'Validar cantidad de familiares no validó que el número ingresado sea menor a 15');
}

function probarValidarEdadesFamiliares(){
  console.assert(validarEdadesFamiliares([]) === 'Ingresa algun valor',
  'Validar edades no validó que se haya ingresado al menos un número');

  console.assert(validarEdadesFamiliares([0]) === 'Este campo no acepta valores iguales a 0',
  'Validar edades no validó que el número ingresado sea mayor a 0');

  console.assert(validarEdadesFamiliares([155]) === 'Este campo no acepta edades mayores a 125',
  'Validar edades no validó que el valor ingresado sea menor a 125');

  console.assert(validarEdadesFamiliares([-1]) === 'Este campo solo acepta números positivos',
  'Validar edades no validó que el valor ingresado sea positivo');

  console.assert(validarEdadesFamiliares([1.2]) === 'Las edades no pueden tener decimales',
  'Validar edades no validó que el valor ingresado no sea un decimal');
}

function probarvalidarSalariosFamiliares(){
  console.assert(validarSalariosFamiliares([]) === 'Ingresa algun valor',
  'Validar salarios no validó que se haya ingresado al menos un número');

  console.assert(validarSalariosFamiliares([0]) === 'Este campo no acepta valores iguales a 0',
  'Validar salarios no validó que el número ingresado sea mayor a 0');

  console.assert(validarSalariosFamiliares([-1]) === 'Este campo solo acepta números positivos',
  'Validar salarios no validó que el número ingresado sea mayor a 0');
}

probarValidarCantidadFamiliares();
probarValidarEdadesFamiliares();
probarvalidarSalariosFamiliares();
 */

function probarValidarCantidad(){
  console.assert(validarCantidad(-2) === 'La cantidad de integrantes debe ser mayor a 0',
    'Validar cantidad integrantes no validó que la cantidad de integrantes no fuera 0'
  );

  console.assert(validarCantidad(1.2) === 'La cantiadad de integrantes debe ser un número entero',
    'Validar cantidad integrantes no validó que el numero ingresado sea un entero'
  );

  console.assert(validarCantidad(190) === 'La cantidad de integrantes no puede superar 180',
    'Validar cantidad integrantes no validó que la cantidad sea menor a 180'
  );
}

probarValidarCantidad();
