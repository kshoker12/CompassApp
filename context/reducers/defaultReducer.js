import { READ_DATA } from "../../Constants/ActionNames";
import * as HELPER from "../ContextHelper";

const AppReducer = (state, action) => {
    switch (action.type) {
        case READ_DATA: {
            action.type = "DONE";
            HELPER.setInitialData(state, action);
            return {
                ...state
            }
        }
        default:
            return state;
    }
};

export default AppReducer;