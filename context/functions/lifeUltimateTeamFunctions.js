import { LIFE_ULTIMATE_TEAM_ACTIONS, SET_LIFE_ULTIMATE_TEAM } from "../actions/lifeUltimateTeamActions";

/**
 * @description Set Life Ultimate Team data to loaded data
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {Object} lifeUltimateTeam Loaded data
 */
const setLifeUltimateTeam = (dispatch, lifeUltimateTeam) => dispatch({
    type: SET_LIFE_ULTIMATE_TEAM,
    payload: { lifeUltimateTeam }, 
    class: LIFE_ULTIMATE_TEAM_ACTIONS
});

export {setLifeUltimateTeam};