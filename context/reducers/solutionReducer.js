import * as actions from "../actions/solutionActions";

/**
 * @description Solution reducer including solution actions
 * @param {Object} state State of application
 * @param {Object} action Action to be conducted in this reducer
 * @returns {Object}
 */
const solutionReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_SOLUTIONS: {
            action.type = 'DONE';
            /** Unpack payload arguments */
            const { solutions } = action.payload;
            state.solutions = solutions;
            return {
                ...state
            };
        }
        default: return state;
    };
};

export default solutionReducer;