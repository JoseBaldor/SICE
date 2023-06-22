import axios from "axios";
export const ERROR = 'ERROR';
export const DELETE_ROWS = 'DELETE_ROWS';
export const GET_CARRERAS = 'GET_CARRERAS';


export const deleteRows = (rows) =>{
    return function(dispatch){
        dispatch({type: DELETE_ROWS, payload: rows});
    }
}


export const deleteData = (id) =>{
    return async function(dispatch){
        try {
            const response = await axios.delete(`http://localhost:8080/api/carreras/delete/${id}`, 
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

export const getCarreras = () =>{
    return async function(dispatch){
        await axios.get('http://localhost:8080/api/carreras/all',
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                dispatch({type: GET_CARRERAS, payload: response.data})
        })
        .catch((error)=>{
            alert("No se han cargado los registros " + "(" +error.message + ")")
            dispatch({type: ERROR, payload: error.message});
        });
    } ;   
}
