import * as actions from "../actions/solutionActions";

/**
 * @description Sets solutions to data loaded from DB
 * @param {Function} dispatch Dispatch function to modify AppContext
 * @param {Object} solutions Loaded solutions data from database
 */
const setSolutions = async (dispatch, solutions) => await dispatch({
    type: actions.SET_SOLUTIONS,
    payload: { solutions },
    class: actions.SOLUTION_ACTIONS
});

export { setSolutions };