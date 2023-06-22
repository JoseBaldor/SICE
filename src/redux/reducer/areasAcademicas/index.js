import { ERROR, DELETE_ROWS, GET_ACADEMICAS } from "../../actions/areasAcademicas";

const initialState ={
    academicas:[],
    error: '',
    rows:[]
};

const areasAcademicasReducer = (state = initialState, action) =>{
    switch(action.type){
        case DELETE_ROWS:
            return({
                ...state,
                rows: action.payload,
            });
        case GET_ACADEMICAS:
            return({
                ...state,
                academicas: action.payload,
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

export default areasAcademicasReducer;