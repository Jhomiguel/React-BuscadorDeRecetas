import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  //state del provider
  const [idreceta, guardarIdReceta] = useState(null);
  //state para guardar los datos de la receta retornados de la API
  const [informacionreceta, guardarReceta] = useState({});

  //una vez tenemos una receta, llamamos a la API
  useEffect(() => {
    const obtenerDetallesRecetaAPI = async () => {
      if (!idreceta) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const resultado = await axios.get(url);

      guardarReceta(resultado.data.drinks[0]);
    };
    obtenerDetallesRecetaAPI();
  }, [idreceta]);
  return (
    <ModalContext.Provider
      value={{ informacionreceta, guardarIdReceta, guardarReceta }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
