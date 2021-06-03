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

//Guardar vehiculos
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

// guardarVehiculo();

//Consulta de vehiculos
const consultarVehiculos = () => {
  db.collection('vehiculos').onSnapshot(querySnapshot => {
    querySnapshot.forEach(element => {
      console.log(element.data());
    });
  });
};

// consultarVehiculos();

//Editar Vehiculo
const editarVehiculo = id => {
  const washingtonRef = db.collection('vehiculos').doc(id);

  return washingtonRef
    .update({
      nombrePropietario: 'Sergio',
      tipo: 'Cicla',
      placa: 'CCD-FCSD',
      hora: '34:43',
    })
    .then(() => {
      console.log('Vehiculo actualizado');
    })
    .catch(error => {
      console.error('Error updating document: ', error);
    });
};

// editarVehiculo('fz2D16LfsTWVRmpmX2Po');

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

// eliminarVehiculo('MBLYfGxts7tvRfiszWtM');

//Validacion del formulario

const $form = document.getElementById('formulario');

$form.addEventListener('submit', async e => {
  e.preventDefault();

  let nombre = e.target.nombre.value;
  let placa = e.target.placa.value;
  let tipovehiculo = e.target.tipo.value;

  //Validacion de los campos
  if (nombre.trim() === '') {
    mostrarError('El nombre es obligatorio');
    return;
  }

  if (placa.trim() === '') {
    mostrarError('La placa es obligatoria');
    return;
  }

  if (tipovehiculo === '') {
    mostrarError('Seleccione el tipo de vehiculo');
    return;
  }

  guardarVehiculo({
    nombre,
    placa,
    tipovehiculo,
    precio: tipovehiculo === 'carro' ? 1000 : 500,
    hora: fullHora(),
  });
});

const mostrarError = contenido => {
  const $errorformulario = document.querySelector('.error');
  $errorformulario.textContent = contenido;
  $errorformulario.style.display = 'block';
  setTimeout(() => {
    $errorformulario.style = 'none';
  }, 2000);
};

const mostrarGuardadoExitoso = () => {
  const $exitoso = document.querySelector('.guardado');
  $exitoso.style.display = 'block';
  $form.reset();
  setTimeout(() => {
    $exitoso.style = 'none';
  }, 2000);
};

const fullHora = () => {
  let fecha = new Date();
  return fecha.toLocaleTimeString();
};

console.log(fullHora());
