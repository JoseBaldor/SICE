import { ERROR, DELETE_ROWS, SELECT_ROWS, GET_PLANESMATERIAS} from "../../actions/planesMaterias";

const initialState ={
    planesMaterias:[],
    error: '',
    rows:[],
    selectRows:[],
};

const planesMateriasReducer = (state = initialState, action) =>{
    switch(action.type){
        case DELETE_ROWS:
            return({
                ...state,
                rows: action.payload,
            });
        case SELECT_ROWS:
            return({
                ...state,
                selectRows: action.payload,
            });
        case GET_PLANESMATERIAS:
        return({
            ...state,
            planesMaterias: action.payload,
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

export default planesMateriasReducer;