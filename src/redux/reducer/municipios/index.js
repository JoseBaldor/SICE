import { GET_MUNICIPIOS} from "../../actions/municipios";

const initialState ={
    municipios:[],
};

const municipiosReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_MUNICIPIOS:
            return({
                ...state,
                municipios: action.payload,
            });
        default:
            return({
                ...state
            });
    };
}

export default municipiosReducer;