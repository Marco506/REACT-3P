//import {Alert} from "react-bootstrap"
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { PostTareas } from "../services/PostTareas";
import { GetTareas } from "../services/GetTareas";
import { DeleteTareas } from "../services/DeleteTareas";
import { PutTareas } from "../services/PutTareas";
import "../styles/Tareas.css";
import Footer from "./Footer";


function PageTareas() {
  const [inputTareas, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      const data = await GetTareas();
      setTareas(data);
    };
    fetchTareas();
  }, []);

  function guardarTarea(event) {
    setTarea(event.target.value);
  }


  const cargarTarea = async () => {
    if (inputTareas === "") return;

    await PostTareas({ tarea: inputTareas });
    const obtenerValor = await GetTareas();
    setTareas(obtenerValor);
    setTarea("");
  };

  const eliminarTarea = async (id) => {
    await DeleteTareas(id);
    const eliminardato = tareas.filter((tarea) => tarea.id !== id);
    setTareas(eliminardato);
  };

  const editarTarea = async (id, tareaActual) => {
    const newText = prompt("Nuevo texto", tareaActual);
    if (newText === "" || newText == null) {
      return alert("El espacio no debe de estar en blanco");
    }

    await PutTareas(id, { tarea: newText });
    alert("Se editó con éxito");

    const guardarEdit = await GetTareas();
    setTareas(guardarEdit);
  };

  return (
    <div>
      <div className="Tareas">
        <h1>Tareas</h1>

        <div className="inputContainer">
          <input
            className="inputTarea"
            type="text"
            placeholder="Agregar tarea"
            value={inputTareas}
            onChange={guardarTarea}
          />
          <button className="agregarTarea" onClick={cargarTarea}>
            Agregar
          </button>
        </div>

        <div className="tareasContainer">
          <ul>
            {tareas.map((tarea) => (
              <li key={tarea.id} className="tareaItem">
                {tarea.tarea}
                <div className="buttonContainer">
                  <button className="botonEliminar" onClick={() => eliminarTarea(tarea.id)}>
                    <FaTrash />
                  </button>
                  <button className="botonEditar" onClick={() => editarTarea(tarea.id, tarea.tarea)}>
                  <BiSolidEditAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer><Footer /></footer>
    </div>
  );
}

export default PageTareas;

