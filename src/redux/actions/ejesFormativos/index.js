import { Login } from "@mui/icons-material";
import axios from "axios";
export const POST_EJES = 'POST_EJES';
export const ERROR = 'ERROR';
export const GET_EJES = 'GET_EJES';
export const DELETE_ROWS = 'DELETE_ROWS';


export const postEjes = (input)=>{
    return async function(dispatch){
        const response = await axios.post(
            'http://localhost:8080/api/ejes/save', 
            JSON.stringify(input), 
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                alert("Registro Guardado con éxito")
            })
            .catch((error)=>{
                alert("No se pudo guardar el registro " + "(" +error.message + ")")
                dispatch({type: ERROR, payload: error.message});
            });
    } ;   
}

export const deleteEjes = (id) =>{
    return async function(dispatch){
        try {
            const response = await axios.delete(`http://localhost:8080/api/ejes/delete/${id}`, 
            {
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Content-Range, Content-Disposition, Content-Description"
                }});
        } catch (error) {
            alert("No se pudo procesar la petición eliminar" + "(" +error.message + ")");
            await dispatch({type: ERROR, payload: error.message});
        }

    };
}

export const deleteRows = (rows) =>{
    return function(dispatch){
        dispatch({type: DELETE_ROWS, payload: rows});
    }

}

export const getEjes = () =>{
    return async function(dispatch){
        await axios.get('http://localhost:8080/api/ejes/all',
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                dispatch({type: GET_EJES, payload: response.data})
        })
        .catch((error)=>{
            alert("No se han cargado los registros " + "(" +error.message + ")")
            dispatch({type: ERROR, payload: error.message});
        });
        
    } ;   
}


    // return async function(dispatch){
    //     await axios.get('http://localhost:8080/api/ejes/all/',
    //     {headers:{"Content-Type" : "application/json"}})
    //     .then((response)=>{
    //           console.log("estoy dentro");
    //             // dispatch({type: GET_EJES, payload: response.data})
    //     })
    //     .catch((error)=>{
    //         alert("No se han cargado los registros " + "(" +error.message + ")")
    //         dispatch({type: ERROR, payload: error.message});
    //     });
    // } ;   



// await axios.get('http://localhost:8080/api/ejes/all',
// {headers:{"Content-Type" : "application/json"}})
// .then((response)=>{
//     setEjes(response.data)
// })
// .catch((error)=>{
//     alert("No se han cargado los registros " + "(" +error.message + ")")
//     setErrorEjes(error.message);
// });


// export const errorHandler = () =>{
    
// }