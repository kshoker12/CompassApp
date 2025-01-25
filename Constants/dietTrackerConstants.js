/** 
 * @description Operation modes for diet tracker screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation ADD_MODE Mode where dialog for adding meal/activity is displayed
 * @variation EDIT_MODE Mode where user edits user stats
 */
const dietTrackerModes = {
    IDLE_MODE: -1,
    ADD_MODE: 0,
    EDIT_MODE: 1,
};

/** 
 * @description Operation modes for recipes screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation DELETE_MODE Mode where user is deleting recipe
 * @variation ADD_MODE Mode where user adds recipe
 */
const recipeModes = {
    IDLE_MODE: -1,
    DELETE_MODE: 0,
};

/**
 * @description Operation modes for recipes edit screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation ADD_INGREDIENT Mode where user adds ingredient
 * @variation ADD_STEP Mode where user adds step
 * @variation REMOVE_INGREDIENT Mode where user removes ingredient
 * @variation REMOVE_STEP Mode where user removes step
 */
const recipeAddModes = {
    IDLE_MODE: -1,
    ADD_INGREDIENT: 0,
    ADD_STEP: 1,
    REMOVE_INGREDIENT: 2,
    REMOVE_STEP: 3,
};

/**
 * @description Operation modes for recipes edit screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation ADD_INGREDIENT Mode where user adds ingredient
 * @variation ADD_STEP Mode where user adds step
 * @variation REMOVE_INGREDIENT Mode where user removes ingredient
 * @variation REMOVE_STEP Mode where user removes step
 */
const recipeEditModes = {
    IDLE_MODE: -1,
    ADD_INGREDIENT: 0,
    ADD_STEP: 1,
    REMOVE_INGREDIENT: 2,
    REMOVE_STEP: 3,
};

export {dietTrackerModes, recipeEditModes, recipeModes, recipeAddModes};


