import { ERROR, DELETE_ROWS, GET_MATERIAS} from "../../actions/materias";

const initialState ={
    materias:[],
    error: '',
    rows:[]
};

const materiasReducer = (state = initialState, action) =>{
    switch(action.type){
        case DELETE_ROWS:
            return({
                ...state,
                rows: action.payload,
            });
        case GET_MATERIAS:
            return({
                ...state,
                materias: action.payload,
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

export default materiasReducer;