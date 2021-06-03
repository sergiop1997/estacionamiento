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
const $tabla = document.getElementById('tabla');

let numeroCarros = 0;
let numeroMotos = 0;
let cupoMaximoCarros = 20;
let cupoMaximoMotos = 15;
const $cuposCarros = document.querySelector('.cupos-carros');
const $cuposMotos = document.querySelector('.cupos-motos');

let vehiculos = [];

//Guardar vehiculos
const guardarVehiculo = vehiculo => {
  db.collection('vehiculos')
    .add(vehiculo)
    .then(docRef => {
      mostrarGuardadoExitoso();
      // vehiculos.push(vehiculo);
      console.log('Agregado');
    })
    .catch(error => {
      console.log('Error agregando vehiculo', error);
    });
};

// guardarVehiculo();

//Consulta de vehiculos
const mostrarVehiculos = snap => {
  let num = 1;
  tabla.innerHTML = '';
  snap.forEach(vehiculo => {
    tabla.innerHTML += `
        <tr>
            <td>${num}</td>
            <td>${vehiculo.data().nombre}</td>
            <td>${vehiculo.data().placa}</td>
            <td>${vehiculo.data().tipovehiculo}</td>
            <td>${vehiculo.data().hora}</td>
            <td> $ ${vehiculo.data().precio}</td>
            <td><button class="btn btn-editar" data-id="${
              vehiculo.id
            }" data-nombre="${vehiculo.data().nombre}" data-placa="${
      vehiculo.data().placa
    }" data-tipo="${vehiculo.data().tipovehiculo}">Editar</button></td>
            <td><button class="btn btn-eliminar" data-id='${
              vehiculo.id
            }' data-tipo="${
      vehiculo.data().tipovehiculo
    }">Eliminar</button></td>
        </tr>`;

    ++num;
  });
  num = 1;
};

//Editar Vehiculo
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
const $titleForm = document.querySelector('.titulo-form');

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

  if (!e.target.id.value) {
    if (tipovehiculo === 'carro') {
      numeroCarros++;
      $cuposCarros.textContent = `Carros: ${cupoMaximoCarros - numeroCarros}`;
    } else {
      numeroMotos++;
      $cuposMotos.textContent = `Motos: ${cupoMaximoMotos - numeroMotos}`;
    }

    guardarVehiculo({
      nombre,
      placa,
      tipovehiculo,
      precio: tipovehiculo === 'carro' ? 1000 : 500,
      hora: fullHora(),
    });
  } else {
    editarVehiculo(e.target.id.value, {
      nombre,
      placa,
      tipovehiculo,
    });
    $form.id.value = '';
    $titleForm.textContent = 'AGREGAR VEHICULO';
  }
});

const mostrarError = contenido => {
  const $errorformulario = document.querySelector('.error');
  $errorformulario.textContent = contenido;
  $errorformulario.style.display = 'block';
  setTimeout(() => {
    $errorformulario.style = 'none';
  }, 3000);
};

const mostrarGuardadoExitoso = () => {
  const $exitoso = document.querySelector('.guardado');
  $exitoso.style.display = 'block';
  $form.reset();
  setTimeout(() => {
    $exitoso.style = 'none';
  }, 3000);
};

const fullHora = () => {
  let fecha = new Date();
  return fecha.toLocaleTimeString();
};

function mostrarVehiculosguardados() {
  if (vehiculos.length >= 0) {
    console.log('No hay registros');
  } else {
  }
  console.log(vehiculos);
}

document.addEventListener('click', e => {
  if (e.target.matches('.btn-eliminar')) {
    eliminarVehiculo(e.target.dataset.id);
    if (e.target.dataset.tipo === 'carro') {
      numeroCarros--;
      $cuposCarros.textContent = `Carros: ${cupoMaximoCarros - numeroCarros}`;
    } else {
      numeroMotos--;
      $cuposMotos.textContent = `Motos: ${cupoMaximoMotos - numeroMotos}`;
    }
  }
  if (e.target.matches('.btn-editar')) {
    $titleForm.textContent = 'EDITAR VEHICULO';
    $form.nombre.value = e.target.dataset.nombre;
    $form.placa.value = e.target.dataset.placa;
    $form.tipo.value = e.target.dataset.tipo;
    $form.id.value = e.target.dataset.id;
  }

  if (e.target.matches('.btn-siguiente')) {
    paginarConsultaSiguiente();
  }
  if (e.target.matches('.btn-anterior')) {
    paginarConsultaAnterior();
  }
});

let firsDocument = null;
let lastDocument = null;

const paginarConsultaSiguiente = () => {
  const query = db
    .collection('vehiculos')
    .orderBy('nombre')
    .startAfter(lastDocument);

  query.limit(5).onSnapshot(snap => {
    firsDocument = snap.docs[0] || null;
    lastDocument = snap.docs[snap.docs.length - 1] || null;

    mostrarVehiculos(snap);
  });
};

paginarConsultaSiguiente();

const paginarConsultaAnterior = () => {
  const query = db
    .collection('vehiculos')
    .orderBy('nombre')
    .endBefore(firsDocument);

  query.limit(5).onSnapshot(snap => {
    firsDocument = snap.docs[0] || null;
    lastDocument = snap.docs[snap.docs.length - 1] || null;

    mostrarVehiculos(snap);
  });
};

const contarRegistro = () => {
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

contarRegistro();
