/** 
 * @description Operation modes for home screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation ADD_MODE Mode where dropdown for adding responsibility is displayed
 * @variation DELETE_MODE Mode where user deletes responsibility
 */
const homeModes = {
    IDLE_MODE: -1,
    ADD_MODE: 0,
    DELETE_MODE: 1,
};

/**
 * @description Home charts in home screen
 * @variation IDLE_MODE Mode where no chart is being displayed
 * @variation PERCENTAGE_MODE Mode where percentage chart is displayed
 * @variation HOURS_MODE Mode where hours chart is displayed
 */
const chartModes = {
    IDLE_MODE: -1,
    PERCENTAGE_MODE: 0,
    HOURS_MODE: 1,
};

export { homeModes, chartModes };
