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

export default mostrarVehiculos;
