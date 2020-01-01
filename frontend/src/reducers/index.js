import {combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import eduReducer from "./eduReducer";


const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    edu: eduReducer
});

export default rootReducer;
