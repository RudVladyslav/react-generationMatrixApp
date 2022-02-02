import {combineReducers} from "redux";

import matrixReducer from "./matrixReducer";

const rootReducer = combineReducers({
        matrixData: matrixReducer
})

export default rootReducer