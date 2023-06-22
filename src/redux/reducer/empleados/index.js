import { ERROR, DELETE_ROWS, GET_EMPLEADOS} from "../../actions/empleados";

const initialState ={
    empleados:[],
    error: '',
    rows:[]
};

const empleadosReducer = (state = initialState, action) =>{
    switch(action.type){
        case DELETE_ROWS:
            return({
                ...state,
                rows: action.payload,
            });
        case GET_EMPLEADOS:
            return({
                ...state,
                empleados: action.payload,
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

export default empleadosReducer;