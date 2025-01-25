import * as actions from "../actions/lifeUltimateTeamActions";


/**
 * @description Life Ultimate Team reducer including life ultimate team actions
 * @param {Object} state State of application
 * @param {Object} action Action to be conducted in this reducer
 * @returns {Object}
 */
const lifeUltimateTeamReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_LIFE_ULTIMATE_TEAM: {
            action.type = 'DONE';
            /** Unpack payload arguments */
            const { lifeUltimateTeam } = action.payload;
            state.lifeUltimateTeam = lifeUltimateTeam;
            return {
                ...state
            };
        };
        default: return state;
    };
};

export default lifeUltimateTeamReducer;