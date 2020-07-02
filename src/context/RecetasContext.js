import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  //state para guardar las recetas traidas de la API
  const [recetas, guardarRecetas] = useState([]);
  //state para guardar los datos introducidos por el usuario desde el formulario
  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });
  //
  const [consultar, guardarConsultar] = useState(false);

  const { nombre, categoria } = busqueda;
  useEffect(() => {
    if (consultar) {
      const obtenerRecetasAPI = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const resultado = await axios.get(url);
        //console.log(resultado.data.drinks);
        guardarRecetas(resultado.data.drinks);
      };
      obtenerRecetasAPI();
      guardarConsultar(false);
    }
  }, [busqueda]);
  return (
    <RecetasContext.Provider
      value={{ recetas, buscarRecetas, guardarConsultar }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
