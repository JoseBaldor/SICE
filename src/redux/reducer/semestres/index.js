import { ERROR, DELETE_ROWS, GET_SEMESTRES} from "../../actions/semestres";

const initialState ={
    semestres:[],
    error: '',
    rows:[]
};

const semestresReducer = (state = initialState, action) =>{
    switch(action.type){
        case DELETE_ROWS:
            return({
                ...state,
                rows: action.payload,
            });
        case GET_SEMESTRES:
            return({
                ...state,
                semestres: action.payload,
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

export default semestresReducer;