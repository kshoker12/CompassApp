import * as actions from "../actions/compassActions";

/**
 * @description Compass reducer including compass actions
 * @param {Object} state State of application
 * @param {Object} action Action to be conducted in this reducer
 * @returns {Object}
 */
const compassReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_COMPASS: {
            action.type = 'DONE';
            /** Unpack payload arguments */
            const { compass } = action.payload;
            /** Initialize diet tracker */
            state.compass = compass[0];
            return {
                ...state
            };
        };
        default: return state;
    };
};

export default compassReducer;