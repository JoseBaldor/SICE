import { useForm } from 'react-hook-form';
import axios from "axios";
import s from "./Form.module.css";
import { mayorQueCero, fuacadValidator} from '../functions/validators';
import { getCarreras } from '../redux/actions/carreras';
import { getPlanes } from '../redux/actions/planesEstudios';
import { getSemestres } from '../redux/actions/semestres';
import { getMaterias } from '../redux/actions/materias';
import { selectedRows } from '../redux/actions/planesMaterias';
import { deleteRows, deleteData } from '../redux/actions/planesEstudios';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IonButtons, IonToolbar } from '@ionic/react';
import Botones from './Botones';
import { DataTable } from "./DataTable";
import Modals from './Modals';
import { DataTableSelect } from './DataTableSelect';
import TableExample1 from './TablesExamples/TableExample1';



const FormPlanesMaterias = (props) =>{
    const carreras = useSelector((state)=>state.carrerasReducer.carreras);
    const planes = useSelector((state)=>state.planesEstudiosReducer.planes);    
    const semestres = useSelector((state)=>state.semestresReducer.semestres);
    const materias = useSelector((state)=>state.materiasReducer.materias);
    const rows = useSelector((state)=>state.planesEstudiosReducer.rows);
    const {register, reset, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const [errorData, setErrorData] = useState({errorData:'true'});
    const [data, setData] = useState([]);
    const [lista, setLista] = useState(false);
    const [plan, setPlan] = useState([]);
    const [materia, setMateria] = useState([]);
    const [mat, setMat] = useState('');

      useEffect(() => {
        dispatch(getCarreras());
      }, [dispatch]);

      useEffect(() => {
        dispatch(getMaterias());
      }, [dispatch]);
      

      useEffect(() => {
        dispatch(getSemestres());
      }, [dispatch]);

      useEffect(() => {
        dispatch(getPlanes());
      }, [dispatch]);

    const abrirCerrarLista =() =>{
      setLista(!lista);
    }

    const columns = [
      { name: "id", label: "ID", options: { filter: false, sort: false }},
      { name: "descripcion", label: "DESCRIPCION" },
      { name: "carrera", label: "CARRERA" },
      { name: "fechai", label: "INICIO" },
      { name: "estatus", label: "ACTIVA" },      
    ];

    const columnsMaterias = [
      { name: "id", label: "ID", options: {filter: false, sort: false}},
      { name: "descripcion", label: "DESCRIPCION" },
    ];
    

  const obtenerData = async() =>{
      await axios.get('http://localhost:8080/api/planes/all',
          {headers:{"Content-Type" : "application/json"}})
          .then((response)=>{
            console.log(response.data);
            console.log(carreras);
              const result = response.data?.map(plan => {
                return({
                  id: plan.id,
                  descripcion: plan.descripcion,
                  carrera: carreras.filter(carr => carr.id === plan.idcarrera)[0].descripcion,
                  fechai: plan.fechainicio,
                  estatus: plan.estatus ? "Si" : "No",
                })
              })
              setData(result)
          })
          .catch((error)=>{
              alert("No se han cargado los registros " + "(" +error.message + ")")
              setErrorData(error.message);
          });
  };    

  const postData = async(input)=>{
      console.log(input);
      await axios.post(
          'http://localhost:8080/api/planes/save', 
          JSON.stringify(input), 
          {headers:{"Content-Type" : "application/json"}})
          .then((response)=>{
              alert("Registro Guardado con éxito")
              obtenerData();
          })
          .catch((error)=>{
              alert("No se pudo guardar el registro " + "(" +error.message + ")")
              setErrorData(error.message);
          });
  };   

  const deleteD = () =>{
    if(rows.length > 1){
        if(window.confirm("¿Esta seguro que desea borrar los " + rows.length + " Datos seleccionados?"))
        rows.map((res)=>{
            dispatch(deleteData(data[res].id));
        });
    }else{
        if(window.confirm("¿Esta seguro que desea borrar el Dato seleccionado?"))
        rows.map((res)=>{
            console.log(data[res].id);
            dispatch(deleteData(data[res].id));
        });
    }
    rows.map((res)=>{
        const filterRows = data.filter(resp => resp.id!== data[res].id );
        setData(filterRows);
    });
}


 const listData = () =>{
    obtenerData();
    abrirCerrarLista();
  }

  const onSubmit =  (data, e) =>{
    e.preventDefault();
    postData(data);  
    reset();
  } 

  const handleCarreras = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const newArray = planes.filter(plan => plan.idcarrera == value);
    setPlan(newArray);
  };

  const handleSemestres = (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.log(value);
    console.log(semestres);
    console.log(materias);
    const newArray = materias.filter(mat => mat.idsemestre == value);
    console.log(newArray);
    setMateria(newArray);
  };

    return(
      <>
      <IonToolbar>
          <IonButtons slot='end'>
              <Botones 
                  delete={deleteD}
                  list = {listData}
                  nameForm = {props.name}
              />
          </IonButtons>
      </IonToolbar>
      <form id={props.name} className={s.formulario} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Clave:</label>
            <input className={s.input_clave}  type='text' 
            // {...register("id", {required: true, minLength: 3})}
                disabled/>
            <div>
              {errors.id?.type === 'required' && <small className={s.error}>La Clave no puede estar vacía...</small>}
              {errors.id?.type ==='minLength' && <small className={s.error}>La Clave debe tener como minimo 3 caracteres...</small>}
            </div>
          </div>
          <div></div>
          <div className={s.group}>
              <div>
                <label>Carrera:</label>
                <select className={s.semestre} {...register("idcarrera", {validate: mayorQueCero})} onChange={(e) => handleCarreras(e)}>
                  <option value="0">Selecciona la Carrera</option>
                  {carreras.map((carr)=>(
                    <option key={carr.id} value={carr.id}>{carr.descripcion}</option>
                  ))}
                </select>
                <div className={s.error}>
                  {errors.idcarrera && <small>Debe seleccionar una opción...</small>}
                </div>
              </div>
              <div></div>
          </div>
          <div className={s.group}>
              <div>
                <label>Plan de Estudios:</label>
                <select className={s.semestre} {...register("idplanestudio", {validate: mayorQueCero})}>
                  <option value="0">Selecciona un plan de estudios...</option>
                  {plan.map((plan)=>(
                    <option key={plan.id} value={plan.id}>{plan.descripcion}</option>
                  ))}
                </select>
                <div className={s.error}>
                  {errors.idplanestudio && <small>Debe seleccionar una opción...</small>}
                </div>
              </div>
              <div></div>
          </div>
          <div className={s.group}>
              <div>
                <label>Semestre:</label>
                <select className={s.semestre} {...register("idsemestre", {validate: mayorQueCero})} onChange={(e) => handleSemestres(e)}>
                  <option value="0">Selecciona un semestre...</option>
                  {semestres.map((semestre)=>(
                    <option key={semestre.id} value={semestre.id}>{semestre.descripcion}</option>
                  ))}
                </select>
                <div className={s.error}>
                  {errors.idsemestre && <small>Debe seleccionar una opción...</small>}
                </div>
              </div>
              <div></div>
          </div>
          <div className={s.group}>
              <div>
                <label>Materias:</label>
                <select className={s.semestre} {...register("idmateria", {validate: mayorQueCero})}>
                  <option value="0">Selecciona una Materia...</option>
                  {materia.map((mat)=>(
                    <option key={mat.id} value={mat.id}>{mat.descripcion}</option>
                  ))}
                </select>
                <div className={s.error}>
                  {errors.idmateria && <small>Debe seleccionar una opción...</small>}
                </div>
              </div>
              <div></div>
          </div>

          <div className={s.group_search}>
            <div>
              <label>Materia:</label>
              <input 
                  className={s.input_coordinador}  type='hidden' {...register("idMateria", { required: true, minLength: 1 })} />
              <input 
                  placeholder="Selecciona una Materia..."
                  className={s.input_coordinador} name="materia" type='text' value={materia || ""} readOnly/>
            </div>
            <Modals>
                <DataTableSelect 
                  titulo = {""}
                  data = {materia}
                  columns = {columnsMaterias}
                  selectedRows = {selectedRows}
                />
              </Modals>
          </div>
          <div className={s.error}>
                {errors.numempleado && <small>Debe seleccionar una opción...</small>}
          </div>

        </form>
        <div>
          <TableExample1/>
        </div>
        <div className={s.table} > 
        {
            lista ? (
              <DataTable 
                titulo = {"Listado Planes de Estudio"}
                data = {data}
                columns = {columns}
                deleteRows = {deleteRows}
                />
            ) : ( <p></p>)
        }
        </div>

        </>
    );}

export default FormPlanesMaterias;