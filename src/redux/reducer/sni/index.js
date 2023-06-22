import { ERROR, DELETE_ROWS } from "../../actions/sni";

const initialState ={
    sni:[],
    error: '',
    rows:[]
};

const sniReducer = (state = initialState, action) =>{
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

export default sniReducer;