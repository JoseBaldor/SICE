import { useForm } from 'react-hook-form';
import axios from "axios";
import s from "./Materias.module.css";
import { semestreValidator, creditoValidator, ejeValidator, especialidadValidator} from '../functions/validators';
import {getEjes} from '../redux/actions/ejesFormativos';
import {getSemestres} from '../redux/actions/semestres';
import { getEspecialidades } from '../redux/actions/areasEspecialidades';
import { deleteRows, deleteData } from '../redux/actions/materias';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IonButtons, IonToolbar } from '@ionic/react';
import Botones from './Botones';
import { DataTable } from "./DataTable";

const FormMaterias = (props)=>{
    const ejesFormativos = useSelector((state)=>state.ejesReducer.ejesFormativos);
    const semestres = useSelector((state)=>state.semestresReducer.semestres);
    const especialidades = useSelector((state)=>state.areasEspecialidadesReducer.especialidades);
    const rows = useSelector((state)=>state.materiasReducer.rows);
    const {register, reset, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const [errorData, setErrorData] = useState({errorData:'true'});
    const [data, setData] = useState([]);
    const [lista, setLista] = useState(false);

    useEffect(() => {
      dispatch(getEjes());
    }, [dispatch]);

    useEffect(() => {
      dispatch(getSemestres());
    }, [dispatch]);

    useEffect(() => {
      dispatch(getEspecialidades());
    }, [dispatch]);

    // useEffect(() => {
    //   obtenerData();
    // }, []);

  
    const abrirCerrarLista =() =>{
      setLista(!lista);
    }

    const columns = [
      {
          name: "id",
          label: "ID",
          options: {
              filter: false,
              sort: false,
             }
      },
      {
          name: "descripcion",
          label: "DESCRIPCION"
      },
      {
        name: "semestre",
        label: "SEMESTRE"
    },
    {
      name: "creditos",
      label: "CREDITOS"
    },
    {
      name: "terminal",
      label: "TERMINAL"
    },
    {
      name: "eje",
      label: "EJE FORMATIVO"
    },
    {
      name: "especialidad",
      label: "AREA DE ESPECIALIDAD"
    },
    {
      name: "optativa",
      label: "OPTATIVA"
    },
    ];

  const obtenerData = async() =>{
      await axios.get('http://localhost:8080/api/materias/all',
          {headers:{"Content-Type" : "application/json"}})
          .then((response)=>{
              const result = response.data?.map(mat => {
                return({
                  id: mat.id,
                  descripcion: mat.descripcion,
                  semestre: semestres.filter(sem => sem.id === mat.idsemestre)[0].descripcion,
                  creditos: mat.creditos,
                  terminal: mat.terminal,
                  eje: ejesFormativos.filter(eje => eje.id === mat.idejeformativo)[0].descripcion,
                  especialidad: especialidades.filter(esp => esp.id === mat.idareaespecialidad)[0].descripcion,
                  optativa: mat.optativa ? "Si" : "No",
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
          'http://localhost:8080/api/materias/save', 
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
            <input className={s.input_clave}  type='text' {...register("id", {required: true, minLength: 3})}/>
            <div>
              {errors.id?.type === 'required' && <small className={s.error}>La Clave no puede estar vacía...</small>}
              {errors.id?.type ==='minLength' && <small className={s.error}>La Clave debe tener como minimo 3 caracteres...</small>}
            </div>
          </div>
          <div></div>
          <div>
              <label>Descripción:</label>
              <input className={s.input_description} type='text' {...register("descripcion", {required:true, minLength: 5})}/>
              <div>
                {errors.descripcion?.type === 'required' && <small className={s.error}>La Descipción no puede estar vacía...</small>}
                {errors.descripcion?.type ==='minLength' && <small className={s.error}>La Descripción debe tener como minimo 5 caracteres...</small>}
              </div>
          </div>
          <div></div>
          <div className={s.group}>
              <div>
                <label>Semestre:</label>
                <select className={s.semestre} {...register("idsemestre", {validate: semestreValidator})}>
                  <option value="0">Selecciona un semestre</option>
                  {semestres.map((sem)=>(
                    <option key={sem.id} value={sem.id}>{sem.descripcion}</option>
                  ))}
                </select>
                <div className={s.error}>
                  {errors.idsemestre && <small>Debe seleccionar una opción...</small>}
                </div>
              </div>
              <div>
                <label >Creditos:</label>
                <input className={s.input_creditos}  type='text' {...register("creditos", {validate: creditoValidator})}/>
                <div className={s.error}>
                  {errors.creditos && <small>Debe ser un número mayor que 0...</small>}
                </div>
              </div>
              <div>
                <label >Terminal:</label>
                <input className={s.input_terminal} type='text' {...register("terminal")}/>
              </div>
          </div>
          <div className={s.group_ejes}>
            <div>
                <label>Eje Formativo:</label>
                <select className={s.eje_formativo} {...register("idejeformativo", {validate: ejeValidator})}>
                  <option value="0">Selecciona un eje</option>
                  {ejesFormativos.map((eje)=>(
                    <option key={eje.id} value={eje.id}>{eje.descripcion}</option>
                  ))}
                </select>
                <div className={s.error}>
                  {errors.idejeformativo && <small>Debe seleccionar una opción...</small>}
                </div>
            </div>
            <div>
              <label >Area de Especialidad:</label>
              <select className={s.eje_area} {...register("idareaespecialidad", {validate: especialidadValidator})}>
                <option value="0">Selecciona un area</option>
                {especialidades.map((area)=>(
                  <option key={area.id} value={area.id}>{area.descripcion}</option>
                ))}
              </select>
              <div className={s.error}>
                  {errors.idareaespecialidad && <small>Debe seleccionar una opción...</small>}
                </div>
            </div>
            <div></div>
          </div>
          <div className={s.group_optativa}>
            <label>Optativa:</label>
            <input  type="checkbox" {...register("optativa")}/>
          </div>
        </form>
        <div className={s.table} > 
        {
            lista ? (
              <DataTable 
                titulo = {"Listado de Materias"}
                data = {data}
                columns = {columns}
                deleteRows = {deleteRows}
                />
            ) : ( <p></p>)
        }
        </div>

        </>
    );
}

export default FormMaterias;