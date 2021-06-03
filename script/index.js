//Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCsodUGJNVXc-tkE9Ff3XFyxDvgxpKozGY',
  authDomain: 'estacionamiento-2e54d.firebaseapp.com',
  projectId: 'estacionamiento-2e54d',
  storageBucket: 'estacionamiento-2e54d.appspot.com',
  messagingSenderId: '577804760353',
  appId: '1:577804760353:web:aca66f09f64435b7c9ba60',
});

const db = firebase.firestore();

console.log(db);

//Guardar vehiculos
const guardarVehiculo = () => {
  db.collection('vehiculos')
    .add({
      nombrePropietario: 'wiliam',
      tipo: 'carro',
      placa: 'xxx-ccc',
      hora: '21:34',
    })
    .then(docRef => {
      console.log('Agregado');
    })
    .catch(error => {
      console.log('Error agregando vehiculo', error);
    });
};

// guardarVehiculo();

//Consulta de vehiculos
const consultarVehiculos = () => {
  // const result = await db.collection('vehiculos').get();
  // console.log(result);

  db.collection('vehiculos').onSnapshot(querySnapshot => {
    querySnapshot.forEach(element => {
      console.log(element.data());
    });
  });
};

consultarVehiculos();

//Editar Vehiculo
const editarVehiculo = id => {
  const washingtonRef = db.collection('vehiculos').doc(id);

  return washingtonRef
    .update({
      nombrePropietario,
      tipo,
      placa,
      hora,
    })
    .then(() => {
      console.log('Vehiculo actualizado');
    })
    .catch(error => {
      console.error('Error updating document: ', error);
    });
};

//Eliminar vehiculo
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

eliminarVehiculo('MBLYfGxts7tvRfiszWtM');
