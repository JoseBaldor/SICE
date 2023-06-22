import { POST_EJES, ERROR, GET_EJES, DELETE_ROWS } from "../../actions/ejesFormativos";

const initialState ={
    ejesFormativos:[],
    error: '',
    rows:[]
};

const ejesReducer = (state = initialState, action) =>{
    switch(action.type){
        case POST_EJES:
            return({
                ...state,
                ejesFormativos: [...state.ejesFormativos, action.payload]
            });
        case GET_EJES:
            return({
                ...state,
                ejesFormativos: action.payload,
            });
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

export default ejesReducer;