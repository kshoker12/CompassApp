import { DREAMS_ACTIONS, SET_DREAMS } from "../actions/dreamActions";

/**
 * @description Set dreams data to loaded data
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {Object} dreams Loaded data
 */
const setDreams = (dispatch, dreams) => dispatch({
    type: SET_DREAMS,
    payload: { dreams }, 
    class: DREAMS_ACTIONS
});

export {setDreams};