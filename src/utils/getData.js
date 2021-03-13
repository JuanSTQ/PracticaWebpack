const API = process.env.API; //ocultamos la api, que solo es funcional si el programador cuenta con las variables de entorno
//Normalmente ↑ los DevOps genera estos procesos de despliege para no exponer informacion


const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;