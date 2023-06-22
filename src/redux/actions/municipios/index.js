import axios from "axios";
export const GET_MUNICIPIOS = 'GET_MUNICIPIOS';


export const getMunicipios = () =>{
    return async function(dispatch){
        await axios.get('http://localhost:8080/api/municipios/all',
            {headers:{"Content-Type" : "application/json"}})
            .then((response)=>{
                dispatch({type: GET_MUNICIPIOS, payload: response.data})
        })
    } ;   
}
