import { ERROR, DELETE_ROWS } from "../../actions/lenguasIndigenas";

const initialState ={
    LenguasIndigenas:[],
    error: '',
    rows:[]
};

const lenguasReducer = (state = initialState, action) =>{
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

export default lenguasReducer;