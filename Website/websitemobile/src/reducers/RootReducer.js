import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

const MainUserReducer = combineReducers({
    'user': UserReducer,
})

export default MainUserReducer