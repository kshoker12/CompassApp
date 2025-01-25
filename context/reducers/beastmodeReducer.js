import * as actions from "../actions/beastmodeActions";

/**
 * @description Beastmode reducer including beastmode actions
 * @param {Object} state State of application
 * @param {Object} action Action to be conducted in this reducer
 * @returns {Object}
 */
const beastmodeReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_BEAST_MODE: {
            action.type = 'DONE';
            /** Unpack payload arguments */
            const { beastmode } = action.payload;
            state.beastmode = {};
            state.beastmode['responsibilities'] = beastmode.responsibilities;
            state.beastmode['todoList'] = beastmode.todo_list;
            return {
                ...state
            };
        };
        default: return state;
    };
};

export default beastmodeReducer;