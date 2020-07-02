import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";
const Formulario = () => {
  //Traer los datos de los contexts
  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

  //state del formulario para leer los datos
  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    categoria: "",
  });
  const { nombre, categoria } = busqueda;
  //state para guardar el error
  const [error, guardarError] = useState(false);
  //funcion para leer los datos
  const obtenerDatosReceta = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  //validar onSubmit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    buscarRecetas(busqueda);
    guardarConsultar(true);
  };

  return (
    <form className="col-12" onSubmit={handleSubmit}>
      {error ? <p className=""> No dejar campos vacios </p> : null}
      <fieldset className="text-center">
        <legend>Busca bebidas por catetoria o ingrediente</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Buscar por ingrediente"
            onChange={obtenerDatosReceta}
          />
        </div>
        <div className="col-md-4">
          <select
            name="categoria"
            className="form-control"
            onChange={obtenerDatosReceta}
          >
            <option value="">--Seleccione la categoria--</option>
            {categorias.map((categoria, i) => (
              <option key={i} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar Receta"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
