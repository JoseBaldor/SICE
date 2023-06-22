import { ERROR, DELETE_ROWS } from "../../actions/plazasModelos";

const initialState ={
    plazasModelos:[],
    error: '',
    rows:[]
};

const plazasModelosReducer = (state = initialState, action) =>{
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

export default plazasModelosReducer;