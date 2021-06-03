import db from './firebase.js';

let numeroCarros = 0;
let numeroMotos = 0;
let cupoMaximoCarros = 20;
let cupoMaximoMotos = 15;
const $cuposCarros = document.querySelector('.cupos-carros');
const $cuposMotos = document.querySelector('.cupos-motos');

export const contarRegistro = () => {
  numeroCarros = 0;
  numeroMotos = 0;
  const query = db.collection('vehiculos').get();

  query.then(snap => {
    snap.forEach(el => {
      if (el.data().tipovehiculo === 'carro') {
        ++numeroCarros;
      } else {
        ++numeroMotos;
      }
    });

    $cuposMotos.textContent = `Motos: ${cupoMaximoMotos - numeroMotos}`;
    $cuposCarros.textContent = `Carros: ${cupoMaximoCarros - numeroCarros}`;
  });
};

export const sumarVehiculo = tipovehiculo => {
  if (tipovehiculo === 'carro') {
    numeroCarros++;
    $cuposCarros.textContent = `Carros: ${cupoMaximoCarros - numeroCarros}`;
  } else {
    numeroMotos++;
    $cuposMotos.textContent = `Motos: ${cupoMaximoMotos - numeroMotos}`;
  }
};

export const disminuirVehiculo = tipovehiculo => {
  if (tipovehiculo === 'carro') {
    numeroCarros--;
    $cuposCarros.textContent = `Carros: ${cupoMaximoCarros - numeroCarros}`;
  } else {
    numeroMotos--;
    $cuposMotos.textContent = `Motos: ${cupoMaximoMotos - numeroMotos}`;
  }
};
