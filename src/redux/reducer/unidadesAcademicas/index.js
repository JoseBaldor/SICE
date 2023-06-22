import { ERROR, DELETE_ROWS, SELECT_ROWS, GET_UACADEMICAS} from "../../actions/unidadesAcademicas";

const initialState ={
    uacademicas:[],
    error: '',
    rows:[],
    selectRows:[],
};

const unidadesAcademicasReducer = (state = initialState, action) =>{
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
        case GET_UACADEMICAS:
        return({
            ...state,
            uacademicas: action.payload,
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

export default unidadesAcademicasReducer;