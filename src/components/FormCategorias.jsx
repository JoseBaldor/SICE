import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { IonButtons, IonToolbar } from '@ionic/react';
import axios from "axios";
 
import s from "./Form.module.css";
import { deleteData, deleteRows } from "../redux/actions/plazasCategorias";
import Botones from "./Botones";
import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";

const FormCategorias = (props) =>{
    const rows = useSelector((state)=>state.plazasCategoriasReducer.rows);
    const {register, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const [errorData, setErrorData] = useState({errorData:'true'});
    const [data, setData] = useState([]);
    const [lista, setLista] = useState(false);

    useEffect(() => {
        obtenerData();
    }, []);

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
    ];

    const obtenerData = async() =>{
        await axios.get('http://localhost:8080/api/categorias/all',
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                setData(response.data)
            })
            .catch((error)=>{
                alert("No se han cargado los registros " + "(" +error.message + ")")
                setErrorData(error.message);
            });
    };   

    const postData = async(input)=>{
        await axios.post(
            'http://localhost:8080/api/categorias/save', 
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
        abrirCerrarLista();
    }

    const onSubmit =  (data, e) =>{
        e.preventDefault();
        postData(data);  
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
                <input
                className={s.input_clave}
                type="text"
                // {...register("claveCat", { required: true, minLength: 1 })}
                disabled/>
                <div>
                    {errors.claveCat?.type === "required" && (
                        <small className={s.error}>La Clave no puede estar vacía...</small>
                    )}
                    {errors.claveCat?.type === "minLength" && (
                        <small className={s.error}>
                        La Clave debe tener como minimo 1 caracteres...
                        </small>
                    )}
                </div>
            </div>
            <div></div>
            <div>
                <label>Descripción:</label>
                <input
                placeholder="Nombre de la Categoría..."
                className={s.input_description}
                type="text"
                {...register("descripcion", { required: true, minLength: 3 })}
                />
                <div>
                    {errors.descripcion?.type === "required" && (
                        <small className={s.error}>
                        La Descipción no puede estar vacía...
                        </small>
                    )}
                    {errors.descripcion?.type === "minLength" && (
                        <small className={s.error}>
                        La Descripción debe tener como minimo 3 caracteres...
                        </small>
                    )}
                </div>
            </div>
        </form>
        <div className={s.table} > 
        {
            lista ? (
                <DataTable 
                titulo = {"Listado de Categorias de las Plazas"}
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

export default FormCategorias;