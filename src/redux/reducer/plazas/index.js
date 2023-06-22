import { ERROR, DELETE_ROWS } from "../../actions/plazas";

const initialState ={
    plazas:[],
    error: '',
    rows:[]
};

const plazasReducer = (state = initialState, action) =>{
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

export default plazasReducer;