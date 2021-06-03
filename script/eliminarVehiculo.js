import db from './firebase.js';

const eliminarVehiculo = id => {
  db.collection('vehiculos')
    .doc(id)
    .delete()
    .then(() => {
      console.log('eliminado con exito');
    })
    .catch(error => {
      console.error('Error removing document: ', error);
    });
};

export default eliminarVehiculo;
