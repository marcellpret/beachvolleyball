import { combineReducers } from "redux";
import newCourtReducer from "./new_court/slice";
import markersReducer from "./markers/slice";
import pinReducer from "./pin/slice";
import infoReducer from "./info/slice";

const rootReducer = combineReducers({
    togglePopup: newCourtReducer,
    markers: markersReducer,
    pin: pinReducer,
    toggleInfo: infoReducer,
});

export default rootReducer;
