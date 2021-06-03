const fullHora = () => {
  let fecha = new Date();
  return fecha.toLocaleTimeString();
};

export default fullHora;
