import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

//
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 350,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Receta = ({ receta }) => {
  //configuracion del modal del material UI
  //state para obtener las configuraciones CSS del modal
  const [modalStyle] = useState(getModalStyle);
  //state para controlar la apertura y cierre del modal
  const [open, SetOpen] = useState(false);

  const clases = useStyles();
  //Funciones para cerrar y abrir el modal
  const handleOpen = () => {
    SetOpen(true);
  };
  const handleClose = () => {
    SetOpen(false);
  };

  //Extraer valores de receta
  const { idDrink, strDrink, strDrinkThumb } = receta;

  //Extraer valores del context
  const { informacionreceta, guardarIdReceta, guardarReceta } = useContext(
    ModalContext
  );

  //Mostrar y formatear los ingredientes
  const mostrarIngredientes = (informacionreceta) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (informacionreceta[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={i}>
            {informacionreceta[`strIngredient${i}`]}
            {informacionreceta[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{strDrink}</h2>
        <img
          className="card-img-top"
          src={strDrinkThumb}
          alt={`Imagen de de ${strDrink}`}
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              guardarIdReceta(idDrink);
              handleOpen();
            }}
          >
            Ver Receta
          </button>
          <Modal
            open={open}
            onClose={() => {
              handleClose();
              guardarReceta({});
              guardarIdReceta(null);
            }}
          >
            <div style={modalStyle} className={clases.paper}>
              <h2>{informacionreceta.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{informacionreceta.strInstructions}</p>
              <img
                className="img-fluid my-4"
                src={informacionreceta.strDrinkThumb}
              />
              <h3>Ingredientes y cantidades</h3>
              <ul>{mostrarIngredientes(informacionreceta)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
