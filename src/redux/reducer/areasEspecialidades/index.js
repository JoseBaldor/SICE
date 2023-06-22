import { ERROR, DELETE_ROWS, GET_ESPECIALIDADES } from "../../actions/areasEspecialidades";

const initialState ={
    especialidades:[],
    error: '',
    rows:[]
};

const areasEspecialidadesReducer = (state = initialState, action) =>{
    switch(action.type){
        case DELETE_ROWS:
            return({
                ...state,
                rows: action.payload,
            });
        case GET_ESPECIALIDADES:
            return({
                ...state,
                especialidades: action.payload,
            });
        case ERROR:
            return({
                ...state,
                error: action.payload
            }
            );
        default:
            return({
                ...state
            });
    };
}

export default areasEspecialidadesReducer;