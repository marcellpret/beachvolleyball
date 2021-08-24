import { combineReducers } from "redux";
import newCourtReducer from "./new_court/slice";
import markersReducer from "./markers/slice";

const rootReducer = combineReducers({
    togglePopup: newCourtReducer,
    markers: markersReducer,
});

export default rootReducer;
