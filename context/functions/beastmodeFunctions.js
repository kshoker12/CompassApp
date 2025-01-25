import { SET_BEAST_MODE, BEAST_MODE_ACTIONS} from '../actions/beastmodeActions';

/**
 * @description Set beastmode data to loaded data
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {Object} beastmode Loaded data
 */
const setBeastmode = (dispatch, beastmode) => dispatch({
    type: SET_BEAST_MODE,
    payload: { beastmode }, 
    class: BEAST_MODE_ACTIONS
});

export {setBeastmode};