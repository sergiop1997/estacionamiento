import db from './firebase.js';
import mostrarVehiculos from './mostrarVehiculos.js';

let firsDocument = null;
let lastDocument = null;

export const paginarConsultaAnterior = () => {
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

export const paginarConsultaSiguiente = () => {
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
