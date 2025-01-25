import { SET_DIET_TRACKER, DIET_TRACKER_ACTIONS} from '../actions/dietTrackerActions';

/**
 * @description Set dietracker data to loaded data
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {Object} dietTracker Loaded data
 */
const setDietTracker = (dispatch, dietTracker) => dispatch({
    type: SET_DIET_TRACKER,
    payload: { dietTracker }, 
    class: DIET_TRACKER_ACTIONS
});

export {setDietTracker};