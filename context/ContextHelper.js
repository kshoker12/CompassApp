/**
 * @description Set the initial values of context variables to the loaded data from database
 * @param {Object} state -> Object containing all context variables for the app 
 * @param {Object} action -> Action including loaded data
 */
const setInitialData = (state, action) => {
    // a) Extract loaded data from payload arguments
    const { compass} = action.payload;

    // b) Set state variables to corresponding loaded data
    state.compass = compass;
};

export {setInitialData};