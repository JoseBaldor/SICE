import axios from "axios";

export const  getMunicipios = async() =>{
    return await axios.get('http://localhost:8080/api/municipios/all',
        {headers:{"Content-Type" : "application/json"}});
}

