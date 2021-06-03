import db from './firebase.js';
import mostrarGuardadoExitoso from './exitoso.js';

const guardarVehiculo = vehiculo => {
  db.collection('vehiculos')
    .add(vehiculo)
    .then(docRef => {
      mostrarGuardadoExitoso();
      console.log('Agregado');
    })
    .catch(error => {
      console.log('Error agregando vehiculo', error);
    });
};

export default guardarVehiculo;
