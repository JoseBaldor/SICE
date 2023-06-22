import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { IonButtons, IonToolbar } from '@ionic/react';
import axios from "axios";

import s from "./Form.module.css";
import {  deleteEjes, deleteRows } from "../redux/actions/ejesFormativos";
import Botones from "./Botones";
import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
 

const FormEjes = () =>{

    const rows = useSelector((state)=>state.ejesReducer.rows);
    const {register, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const [errorEjes, setErrorEjes] = useState({errorEjes:'true'});
    const [ejes, setEjes] = useState([]);
    const [lista, setLista] = useState(false);

    useEffect(() => {
        obtenerEjes();
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

    const obtenerEjes = async() =>{
        await axios.get('http://localhost:8080/api/ejes/all',
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                setEjes(response.data)
            })
            .catch((error)=>{
                alert("No se han cargado los registros " + "(" +error.message + ")")
                setErrorEjes(error.message);
            });
    };   

    const postEjes = async(input)=>{
        await axios.post(
            'http://localhost:8080/api/ejes/save', 
            JSON.stringify(input), 
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                alert("Registro Guardado con éxito")
                obtenerEjes();
            })
            .catch((error)=>{
                alert("No se pudo guardar el registro " + "(" +error.message + ")")
                setErrorEjes(error.message);
            });
    };   

    const deleteEje = () =>{
        console.log(rows.length);
        if(rows.length!==0){
            if(rows.length > 1){
                if(window.confirm("¿Esta seguro que desea borrar los " + rows.length + " Datos seleccionados?"))
                rows.map((res)=>{
                    dispatch(deleteEjes(ejes[res].id));
                });
            }else{
                if(window.confirm("¿Esta seguro que desea borrar el Eje seleccionado?"))
                rows.map((res)=>{
                    dispatch(deleteEjes(ejes[res].id));
                });
            }
        }
        rows.map((res)=>{
            const filterRows = ejes.filter(resp => resp.id!== ejes[res].id );
            setEjes(filterRows);
        });
    }

    const listEjes = () =>{
        abrirCerrarLista();
    }

    const onSubmit =  (data, e) =>{
        e.preventDefault();
        postEjes(data);  
    } 


    return(
        <>
        <IonToolbar>
            <IonButtons slot='end'>
                <Botones 
                    delete={deleteEje}
                    list = {listEjes}
                    nameForm = "formEjes"
                />
            </IonButtons>
        </IonToolbar>

        <form id="formEjes" className={s.formulario} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Clave:</label>
                <input
                className={s.input_clave}
                type="text"
                // {...register("idEje", { required: true, minLength: 1 })}
                disabled/>
                <div>
                    {errors.idEje?.type === "required" && (
                        <small className={s.error}>La Clave no puede estar vacía...</small>
                    )}
                    {errors.idEje?.type === "minLength" && (
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
                placeholder="Eje Formativo..."
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
                titulo = {"Listado de Ejes Formativos"}
                data = {ejes}
                columns = {columns}
                deleteRows = {deleteRows}
                />
            ) : ( <p></p>)
        }
        </div>
        {/* <div>
            <TableExample/>
        </div> */}
        </>
    );
}

export default FormEjes;