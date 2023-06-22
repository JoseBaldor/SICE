import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { IonButtons, IonToolbar } from '@ionic/react';
import axios from "axios";
import { mayorQueCero, fuacadValidator } from '../functions/validators'; 
import s from "./Uacademicas.module.css";
import { deleteData, deleteRows, selectedRows } from "../redux/actions/unidadesAcademicas";
import {getEmpleados} from '../redux/actions/empleados'
import { getMunicipios } from "../functions/httpaux";
import Botones from "./Botones";
import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { DataTableSelect } from "./DataTableSelect";
import Modals from "./Modals";
 
const columns = [
  { name: "id", label: "ID", options: {filter: false, sort: false}},
  { name: "descripcion", label: "DESCRIPCION" },
  { name: "coordinador", label: "COORDINADOR" },
  { name: "calle", label: "CALLE" },
  { name: "numero", label: "NUMERO" },
  { name: "codigopostal", label: "CP" },
  { name: "municipio", label: "MUNICIPIO" },
  { name: "estado", label: "ESTADO"},
];

const columnsEmpleados = [
  { name: "id", label: "ID", options: {filter: false, sort: false}},
  { name: "rfc", label: "RFC" },
  { name: "nombre", label: "NOMBRE" },
  { name: "appaterno", label: "APELLIDO PATERNO" },
  { name: "apmaterno", label: "APELLIDO MATERNO" },
];


const FormUacademicas = (props) => {
  const rows = useSelector((state)=>state.unidadesAcademicasReducer.rows);
  const selectRows = useSelector((state)=>state.unidadesAcademicasReducer.selectRows);
  const empleados = useSelector((state)=>state.empleadosReducer.empleados);
  const dispatch = useDispatch();
  const [errorData, setErrorData] = useState({errorData:'true'});
  const [data, setData] = useState([]);
  const [lista, setLista] = useState(false);
  const [municipios, setMunicipios] = useState([]);
  const [coord, setCoord] = useState('');

  const {register, handleSubmit, reset, setValue, formState:{errors}} = useForm();

  useEffect(()=>{
    setValue('estado', 'MICHOACAN');
  });

  useEffect(()=>{
    console.log(selectRows);
    if (selectRows.length){
      const coordinador = empleados[selectRows].nombre + ' ' + empleados[selectRows].appaterno + ' ' + empleados[selectRows].apmaterno;
      const numEmpleado = empleados[selectRows].id;
      setValue('numempleado', numEmpleado);
      setCoord(coordinador);
    }else{
      setCoord('');
      setValue('numempleado', '');
    }
  });


  useEffect(() => {
    getMunicipios().then(response => setMunicipios(response.data));
  }, []);

  useEffect(() => {
    dispatch(getEmpleados());
  }, [dispatch]);

  const abrirCerrarLista =() =>{
      setLista(!lista);
  }


  const obtenerData = async() =>{
      await axios.get('http://localhost:8080/api/unidades/all',
          {headers:{"Content-Type" : "application/json"}})
          .then((response)=>{
            const result = response.data?.map(res => {
              return({
                id: res.id,
                descripcion: res.descripcion,
                coordinador: empleados.filter(emp => emp.id === res.numempleado)[0].nombre + ' ' 
                              + empleados.filter(emp => emp.id === res.numempleado)[0].appaterno + ' '
                              + empleados.filter(emp => emp.id === res.numempleado)[0].apmaterno,
                calle: res.calle,
                numero: res.numero,
                codigopostal: res.codigopostal,
                municipio: municipios.filter(mun => mun.id === res.idmunicipio)[0].descripcion,
                estado: res.estado
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
      await axios.post(
          'http://localhost:8080/api/unidades/save', 
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
      setCoord('');
      setValue('numempleado', '');
      dispatch(selectedRows([]));
  } 

  return (
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
        <input
          className={s.input_clave}
          type="text"
          // {...register("claveUacad", { required: true, minLength: 3 })}
        disabled/>
        <div>
          {errors.id?.type === "required" && (
            <small className={s.error}>La Clave no puede estar vacía...</small>
          )}
          {errors.id?.type === "minLength" && (
            <small className={s.error}>
              La Clave debe tener como minimo 3 caracteres...
            </small>
          )}
        </div>
      </div>
      <div></div>
      <div>
        <label>Descripción:</label>
        <input
          placeholder="Nombre de la Unidad Académica"
          className={s.input_description}
          type="text"
          {...register("descripcion", { required: true, minLength: 5 })}
        />
        <div>
          {errors.descripcion?.type === "required" && (
            <small className={s.error}>
              La Descipción no puede estar vacía...
            </small>
          )}
          {errors.descripcion?.type === "minLength" && (
            <small className={s.error}>
              La Descripción debe tener como minimo 5 caracteres...
            </small>
          )}
        </div>
      </div>
      <div></div>
      <div>
        <label>Calle:</label>                
        <input
          placeholder="Nombre de la calle o vialidad"
          className={s.input_calle}
          type="text"
          {...register("calle", { required: true, minLength: 4 })}
        />
        <div>
            {errors.calle?.type === "required" && (
              <small className={s.error}>
                La Calle no puede estar vacía...
              </small>
            )}
            {errors.calle?.type === "minLength" && (
              <small className={s.error}>
                La Calle debe tener como minimo 4 caracteres...
              </small>
            )}
        </div>
      </div>
      <div className={s.group}>
        <div>
          <label >Número:</label>
          <input 
            placeholder="Numero Ext"
            className={s.input_numero}  type='text' {...register("numero", {validate: mayorQueCero})}/>
          <div className={s.error}>
            {errors.numero && <small>Debe ser un número mayor que 0...</small>}
          </div>
        </div>
        <div>
          <label >Código Postal:</label>
          <input className={s.input_numero}  type='text' {...register("codigopostal", {validate: mayorQueCero})}/>
          <div className={s.error}>
            {errors.codigopostal && <small>Debe ser un número mayor que 0...</small>}
          </div>
        </div>
        <div></div>
      </div>
      <div className={s.group}>
        <div>
          <label>Municipio:</label>
          <select className={s.input_municipio} {...register("idmunicipio", {validate: mayorQueCero})}>
            <option value="0">Selecciona el Municipio...</option>
            {municipios.map((res)=>(
              <option key={res.id} value={res.id}>{res.descripcion}</option>
            ))}
          </select>
          <div className={s.error}>
            {errors.idmunicipio && <small>Debe seleccionar una opción...</small>}
          </div>
        </div>
        <div>
          <label >Estado:</label>
          <input 
            placeholder="Nombre del Estado"
            className={s.input_municipio}  type='text' {...register("estado", { required: true, minLength: 5 })} disabled/>
          <div>
            {errors.estado?.type === "required" && (
              <small className={s.error}>
                El Nombre del Estado no puede estar vacio...
              </small>
            )}
            {errors.estado?.type === "minLength" && (
              <small className={s.error}>
                El Nombre debe tener como minimo 5 caracteres...
              </small>
            )}
          </div>
        </div>
        <div></div>
      </div>
      <div className={s.group_search}>
        <div>
          <label>Coordinador:</label>
          <input 
              className={s.input_coordinador}  type='hidden' {...register("numempleado", { required: true, minLength: 1 })} />
          <input 
              placeholder="Selecciona al personal..."
              className={s.input_coordinador} name="coord" type='text' value={coord || ""} readOnly/>
        </div>
        <Modals>
            <DataTableSelect 
              titulo = {""}
              data = {empleados}
              columns = {columnsEmpleados}
              selectedRows = {selectedRows}
            />
          </Modals>
      </div>
      <div className={s.error}>
            {errors.numempleado && <small>Debe seleccionar una opción...</small>}
      </div>
      <div>
        <label>Fecha de Creación:</label>
        <input
          className={s.input_date}
          type="date"
          {...register("fechacreacion", {
            required: true,
            validate: fuacadValidator,
          })}
        />
        <div>
          {errors.fechacreacion && (<small className={s.error}> La Fecha debe ser igual o menor que hoy...</small>
          )}
        </div>
      </div>
    </form>
    <div className={s.table} > 
        {
            lista ? (
                <DataTable 
                titulo = {"Listado de Unidades Académicas"}
                data = {data}
                columns = {columns}
                deleteRows = {deleteRows}
                />
            ) : ( <p></p>)
        }
      </div>
    </>
  );
};

export default FormUacademicas;
