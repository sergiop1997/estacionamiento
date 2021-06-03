const mostrarError = contenido => {
  const $errorformulario = document.querySelector('.error');
  $errorformulario.textContent = contenido;
  $errorformulario.style.display = 'block';
  setTimeout(() => {
    $errorformulario.style = 'none';
  }, 3000);
};

export default mostrarError;
