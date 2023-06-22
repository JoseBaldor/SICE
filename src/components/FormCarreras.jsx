import { useForm } from 'react-hook-form';
import axios from "axios";
import s from "./Carreras.module.css";
import { mayorQueCero, fuacadValidator} from '../functions/validators';
import { getCarreras } from '../redux/actions/carreras';
import { deleteRows, deleteData } from '../redux/actions/carreras';
import { getAreasAcademicas } from '../redux/actions/areasAcademicas';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IonButtons, IonToolbar } from '@ionic/react';
import Botones from './Botones';
import { DataTable } from "./DataTable";



const FormCarreras = (props) =>{
    const areasAcademicas = useSelector((state)=>state.areasAcademicasReducer.academicas);
    const rows = useSelector((state)=>state.carrerasReducer.rows);
    const {register, reset, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const [errorData, setErrorData] = useState({errorData:'true'});
    const [data, setData] = useState([]);
    const [lista, setLista] = useState(false);


      useEffect(() => {
        dispatch(getAreasAcademicas());
      }, [dispatch]);
      
    const abrirCerrarLista =() =>{
      setLista(!lista);
    }

    const columns = [
      { name: "id", label: "ID", options: {filter: false, sort: false}},
      { name: "descripcion", label: "DESCRIPCION" },
      { name: "areaacademica", label: "A. ACADEMICA" },
      { name: "abreviatura", label: "ABREVIATURA" },
      { name: "creditos", label: "NUM CREDITOS" },
      { name: "materias", label: "NUM MATERIAS" },
      { name: "semestres", label: "NUM SEMESTRES" },
      { name: "fechac", label: "CREACIÓN" },
      { name: "fechaa", label: "ACTUALIZACION" },      
      { name: "estatus", label: "ACTIVA" },      
    ];


  const obtenerData = async() =>{
      await axios.get('http://localhost:8080/api/carreras/all',
          {headers:{"Content-Type" : "application/json"}})
          .then((response)=>{
            console.log(response.data);
              const result = response.data?.map(carr => {
                return({
                  id: carr.id,
                  descripcion: carr.descripcion,
                  areaacademica: areasAcademicas.filter(aaca => aaca.id === carr.idareaacademica)[0].descripcion,
                  abreviatura: carr.abreviatura,
                  creditos: carr.numcreditos,
                  materias: carr.nummaterias,
                  semestres: carr.numsemestres,
                  fechac: carr.fechacreacion,
                  fechaa: carr.fechaactualizacion,
                  estatus: carr.estatus ? "Si" : "No",
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
          'http://localhost:8080/api/carreras/save', 
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
                placeholder="Nombre de la Carrera..."
                className={s.input_description} type='text' {...register("descripcion", {required:true, minLength: 5})}/>
              <div>
                {errors.descripcion?.type === 'required' && <small className={s.error}>El Nombre no puede estar vacío...</small>}
                {errors.descripcion?.type ==='minLength' && <small className={s.error}>La Nombre debe tener como minimo 5 caracteres...</small>}
              </div>
          </div>
          <div></div>
          <div className={s.group}>
              <div>
                <label>Área Académica:</label>
                <select className={s.semestre} {...register("idareaacademica", {validate: mayorQueCero})}>
                  <option value="0">Selecciona el Área Académica</option>
                  {areasAcademicas.map((area)=>(
                    <option key={area.id} value={area.id}>{area.descripcion}</option>
                  ))}
                </select>
                <div className={s.error}>
                  {errors.idareaacademica && <small>Debe seleccionar una opción...</small>}
                </div>
              </div>
              <div>
                <label>Abreviatura:</label>
                <input className={s.input_creditos}  type='text' {...register("abreviatura", {required:true, minLength: 2})}/>
                <div>
                    {errors.abreviatura?.type === 'required' && <small className={s.error}>El Abreviatura no puede estar vacía...</small>}
                    {errors.abreviatura?.type ==='minLength' && <small className={s.error}>La Abreviatura debe tener como minimo 2 caracteres...</small>}
                </div>
              </div>
              <div></div>
          </div>
          <div className={s.group}>
            <div>
                <label>Creditos:</label>
                <input 
                    className={s.input_creditos} type='text' {...register("numcreditos", {validate: mayorQueCero})}/>
                <div>
                    {errors.numcreditos && <small className={s.error}>Debe ser Mayor que 0...</small>} 
                </div>
            </div>
            <div>
                <label>Número de Materias:</label>
                <input 
                    className={s.input_creditos} type='text' {...register("nummaterias", {validate: mayorQueCero})}/>
                <div>
                    {errors.nummaterias && <small className={s.error}>Debe ser Mayor que 0...</small>} 
                </div>
            </div>
            <div>
                <label>Número de Semestres:</label>
                <input 
                    className={s.input_creditos} type='text' {...register("numsemestres", {validate: mayorQueCero})}/>
                <div>
                    {errors.numsemestres && <small className={s.error}>Debe ser Mayor que 0...</small>} 
                </div>
            </div>
          </div>
          <div></div>
          <div className={s.group}>
            <div>
                <label>Fecha de Creación:</label>
                <input className={s.input_date} type="date" {...register("fechacreacion", { required: true, validate: fuacadValidator })}/>
                <div>
                    {errors.fechacreacion && (<small className={s.error}> La Fecha debe ser igual o menor que hoy...</small>)}
                </div>
            </div>
            <div>
                <label>Fecha de Actualización:</label>
                <input className={s.input_date} type="date" {...register("fechaactualizacion", { required: true, validate: fuacadValidator })}/>
                <div>
                    {errors.fechaactualizacion && (<small className={s.error}> La Fecha debe ser igual o menor que hoy...</small>)}
                </div>
            </div>
            <div></div>
            <div></div>
          </div>
          <div></div>
          <div className={s.group_optativa}>
            <label>Activa:</label>
            <input  type="checkbox" {...register("estatus")}/>
          </div>
        </form>
        <div className={s.table} > 
        {
            lista ? (
              <DataTable 
                titulo = {"Listado de Carreras"}
                data = {data}
                columns = {columns}
                deleteRows = {deleteRows}
                />
            ) : ( <p></p>)
        }
        </div>

        </>
    );}

export default FormCarreras;