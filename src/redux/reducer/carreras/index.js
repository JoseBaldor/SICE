import { ERROR, DELETE_ROWS, GET_CARRERAS } from "../../actions/carreras";

const initialState ={
    carreras:[],
    error: '',
    rows:[]
};
 
const carrerasReducer = (state = initialState, action) =>{
    switch(action.type){
        case DELETE_ROWS:
            return({
                ...state,
                rows: action.payload,
            });
        case GET_CARRERAS:
            return({
                ...state,
                carreras: action.payload,
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

export default carrerasReducer;