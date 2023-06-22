import { ERROR, DELETE_ROWS } from "../../actions/plazasCategorias";

const initialState ={
    plazasCategorias:[],
    error: '',
    rows:[]
};

const plazasCategoriasReducer = (state = initialState, action) =>{
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

export default plazasCategoriasReducer;