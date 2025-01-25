import * as actions from "../actions/dietTrackerActions";

/**
 * @description Diet tracker reducer including diet tracker actions
 * @param {Object} state State of application
 * @param {Object} action Action to be conducted in this reducer
 * @returns {Object}
 */
const dietTrackerReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_DIET_TRACKER: {
            action.type = 'DONE';
            /** Unpack payload arguments */
            const { dietTracker } = action.payload;
            /** Initialize diet tracker */
            state.dietTracker = {};
            state.dietTracker['dailyTracker'] = dietTracker.dailyTracker[0];
            state.dietTracker['recipes'] = dietTracker.recipes;
            state.dietTracker['nutrients'] = dietTracker.nutrients;
            return {
                ...state
            };
        };
        default: return state;
    };
};

export default dietTrackerReducer;