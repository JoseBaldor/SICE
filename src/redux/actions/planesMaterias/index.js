import axios from "axios";
export const ERROR = 'ERROR';
export const DELETE_ROWS = 'DELETE_ROWS';
export const SELECT_ROWS = 'SELECT_ROWS';
export const GET_PLANESMATERIAS = 'GET_PLANESMATERIAS';


export const deleteRows = (rows) =>{
    return function(dispatch){
        dispatch({type: DELETE_ROWS, payload: rows});
    }
}
 
export const selectedRows = (rows) =>{
    return function(dispatch){
        dispatch({type: SELECT_ROWS, payload: rows});
    }
}

export const deleteData = (id) =>{
    return async function(dispatch){
        try {
            const response = await axios.delete(`http://localhost:8080/api/planesmat/delete/${id}`, 
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

export const getPlanesMaterias = () =>{
    return async function(dispatch){
        await axios.get('http://localhost:8080/api/planesmat/all',
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                dispatch({type: GET_PLANESMATERIAS, payload: response.data})
        })
        .catch((error)=>{
            alert("No se han cargado los registros " + "(" +error.message + ")")
            dispatch({type: ERROR, payload: error.message});
        });
    } ;   
}
