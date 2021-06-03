import db from './firebase.js';
import mostrarGuardadoExitoso from './exitoso.js';

const editarVehiculo = (id, vehiculo) => {
  const washingtonRef = db.collection('vehiculos').doc(id);
  washingtonRef
    .update(vehiculo)
    .then(() => {
      mostrarGuardadoExitoso();
      console.log('Vehiculo actualizado');
    })
    .catch(error => {
      console.error('Error updating document: ', error);
    });
};

export default editarVehiculo;
