const mostrarGuardadoExitoso = () => {
  const $exitoso = document.querySelector('.guardado');
  const $form = document.getElementById('formulario');
  $exitoso.style.display = 'block';
  $form.reset();
  setTimeout(() => {
    $exitoso.style = 'none';
  }, 3000);
};

export default mostrarGuardadoExitoso;
