import { ERROR, DELETE_ROWS, GET_PLANES } from "../../actions/planesEstudios";

const initialState ={
    planes:[],
    error: '',
    rows:[]
};

const planesEstudiosReducer = (state = initialState, action) =>{
    switch(action.type){
        case DELETE_ROWS:
            return({
                ...state,
                rows: action.payload,
            });
        case GET_PLANES:
            return({
                ...state,
                planes: action.payload,
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

export default planesEstudiosReducer;