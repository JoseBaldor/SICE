import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { IonButtons, IonToolbar } from '@ionic/react';
import axios from "axios";

import s from "./Form.module.css";
import { deleteGrupos, deleteRows } from "../redux/actions/gruposEtnicos";
import Botones from "./Botones";
import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
 

const FormEtnicos = () =>{
    const rows = useSelector((state)=>state.gruposReducer.rows);
    const {register, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const [errorGrupos, setErrorGrupos] = useState({errorGrupos:'true'});
    const [grupos, setGrupos] = useState([]);
    const [lista, setLista] = useState(false);

    useEffect(() => {
        obtenerGrupos();
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

    const obtenerGrupos = async() =>{
        await axios.get('http://localhost:8080/api/grupos/all',
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                setGrupos(response.data)
            })
            .catch((error)=>{
                alert("No se han cargado los registros " + "(" +error.message + ")")
                setErrorGrupos(error.message);
            });
    };   

    const postGrupos = async(input)=>{
        await axios.post(
            'http://localhost:8080/api/grupos/save', 
            JSON.stringify(input), 
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                alert("Registro Guardado con éxito")
                obtenerGrupos();
            })
            .catch((error)=>{
                alert("No se pudo guardar el registro " + "(" +error.message + ")")
                setErrorGrupos(error.message);
            });
    };   

    const deleteGrupo = () =>{
        if(rows.length > 1){
            if(window.confirm("¿Esta seguro que desea borrar los " + rows.length + " Grupos seleccionados?"))
            rows.map((res)=>{
                dispatch(deleteGrupos(grupos[res].id));
            });
        }else{
            if(window.confirm("¿Esta seguro que desea borrar el Grupo seleccionado?"))
            rows.map((res)=>{
                dispatch(deleteGrupos(grupos[res].id));
            });
        }
        rows.map((res)=>{
            const filterRows = grupos.filter(grupo => grupo.id!== grupos[res].id );
            setGrupos(filterRows);
        });
    }

    const listGrupos = () =>{
        abrirCerrarLista();
    }

    const onSubmit =  (data, e) =>{
        e.preventDefault();
        postGrupos(data);  
    } 


    return(
        <>
        <IonToolbar>
            <IonButtons slot='end'>
                <Botones 
                    delete={deleteGrupo}
                    list = {listGrupos}
                    nameForm = "formGrupos"
                />
            </IonButtons>
        </IonToolbar>

        <form id="formGrupos" className={s.formulario} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Clave:</label>
                <input
                className={s.input_clave}
                type="text"
                // {...register("idEje", { required: true, minLength: 1 })}
                disabled/>
                <div>
                    {errors.idGrupo?.type === "required" && (
                        <small className={s.error}>La Clave no puede estar vacía...</small>
                    )}
                    {errors.idGrupo?.type === "minLength" && (
                        <small className={s.error}>
                        La Clave debe tener como minimo 1 caracter...
                        </small>
                    )}
                </div>
            </div>
            <div></div>
            <div>
                <label>Descripción:</label>
                <input
                placeholder="Grupo Étnico..."
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
        </form>
        <div className={s.table} > 
        {
            lista ? (
                <DataTable 
                titulo = {"Listado de Grupos Étnicos"}
                data = {grupos}
                columns ={columns}
                deleteRows = {deleteRows}
                />
            ) : ( <p></p>)
        }
        </div>
        </>
    );
}
export default FormEtnicos;