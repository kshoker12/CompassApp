import * as action from "../Constants/ActionNames"
import * as AppHelper from "../Helpers/HelperFunctions";

/**
 * @description Sets loaded data as initial values for AppContext
 * @param {Function} dispatch -> Dispatch function to modify AppContext
 * @param {Object} loadedData -> Loaded data from database
 */
const loadData = async (dispatch, loadedData) => {
    await dispatch({
        type: action.READ_DATA,
        payload: loadedData
    })
};

export {loadData}