import * as actions from "../actions/dreamActions";

/**
 * @description Dream reducer including dream actions
 * @param {Object} state State of application
 * @param {Object} action Action to be conducted in this reducer
 * @returns {Object}
 */
const dreamReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_DREAMS: {
            action.type = 'DONE';
            /** Unpack payload arguments */
            const { dreams } = action.payload;
            state.dreams = dreams;
            return {
                ...state
            };
        };
        default: return state;
    };
};

export default dreamReducer;