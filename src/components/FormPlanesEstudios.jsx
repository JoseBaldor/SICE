import { useForm } from 'react-hook-form';
import axios from "axios";
import s from "./Form.module.css";
import { mayorQueCero, fuacadValidator} from '../functions/validators';
import { getCarreras } from '../redux/actions/carreras';
import { getPlanes } from '../redux/actions/planesEstudios';
import { deleteRows, deleteData } from '../redux/actions/planesEstudios';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IonButtons, IonToolbar } from '@ionic/react';
import Botones from './Botones';
import { DataTable } from "./DataTable";



const FormPlanesEstudios = (props) =>{
    const carreras = useSelector((state)=>state.carrerasReducer.carreras);
    const rows = useSelector((state)=>state.planesEstudiosReducer.rows);
    const {register, reset, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const [errorData, setErrorData] = useState({errorData:'true'});
    const [data, setData] = useState([]);
    const [lista, setLista] = useState(false);

      useEffect(() => {
        dispatch(getCarreras());
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
          <div>
              <label>Nombre:</label>
              <input 
                placeholder="Nombre del Plan de Estudios..."
                className={s.input_description} type='text' {...register("descripcion", {required:true, minLength: 5})}/>
              <div>
                {errors.descripcion?.type === 'required' && <small className={s.error}>El Nombre no puede estar vacío...</small>}
                {errors.descripcion?.type ==='minLength' && <small className={s.error}>La Nombre debe tener como minimo 5 caracteres...</small>}
              </div>
          </div>

          <div className={s.group}>
              <div>
                <label>Carrera:</label>
                <select className={s.semestre} {...register("idcarrera", {validate: mayorQueCero})}>
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
          <div></div>
          <div className={s.group}>
            <div>
                <label>Fecha de Inicio:</label>
                <input className={s.input_date} type="date" {...register("fechainicio", { required: true, validate: fuacadValidator })}/>
                <div>
                    {errors.fechainicio && (<small className={s.error}> La Fecha debe ser igual o menor que hoy...</small>)}
                </div>
            </div>
          </div>
          <div></div>
          <div className={s.group_optativa}>
            <label>Activo:</label>
            <input  type="checkbox" {...register("estatus")}/>
          </div>
        </form>
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

export default FormPlanesEstudios;