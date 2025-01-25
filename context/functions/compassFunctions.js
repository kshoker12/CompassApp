import { SET_COMPASS, COMPASS_ACTIONS} from '../actions/compassActions';

/**
 * @description Set compass data to loaded data
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {Object} compass Loaded data
 */
const setCompass = (dispatch, compass) => dispatch({
    type: SET_COMPASS,
    payload: { compass }, 
    class: COMPASS_ACTIONS
});

export {setCompass};