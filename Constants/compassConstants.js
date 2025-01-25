/**
 * @description Operation modes for compass screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation EDIT_MODE Edit active destination
 * @variation FINISH_MODE Mode to finish weekly compass
 */
const compassModes = {
    IDLE_MODE: -1,
    EDIT_MODE: 0,
    FINISH_MODE: 1,
};

/**
 * @description Operation modes for compass view screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation ADD_MODE Mode where user adds a yearly compass
 * @variation REMOVE_MODE Mode where user removes a yearly compass
 */
const viewCompassModes = {
    IDLE_MODE: -1,
    ADD_MODE: 0,
};

/**
 * @description Operation modes for destination screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation EDIT_MODE Edit active destination
 * @variation ADD_MODE Add new destination
 * @variation REMOVE_MODE Remove destination
 */
const destinationModes = {
    IDLE_MODE: -1,
    EDIT_MODE: 0,
    ADD_MODE: 1,
    REMOVE_MODE: 2,
};

export {compassModes, viewCompassModes, destinationModes};