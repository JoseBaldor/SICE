import { ERROR, DELETE_ROWS } from "../../actions/gruposEtnicos";

const initialState ={
    gruposEtnicos:[],
    error: '',
    rows:[]
};

const gruposReducer = (state = initialState, action) =>{
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

export default gruposReducer;