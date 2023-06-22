import { ERROR, DELETE_ROWS } from "../../actions/plazasFunciones";

const initialState ={
    plazasFunciones:[],
    error: '',
    rows:[]
};

const plazasFuncionesReducer = (state = initialState, action) =>{
    switch(action.type){
        case DELETE_ROWS:
            return({
                ...state,
                rows: action.payload,
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

export default plazasFuncionesReducer;