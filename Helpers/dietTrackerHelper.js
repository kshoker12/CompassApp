import { LIFE_MANAGEMENT_DB_BASE } from "../Constants/Links";
import {setDietTracker} from '../context/functions/dietTrackerFunctions';
import * as SecureStore from 'expo-secure-store';
import apiClient from "./securityHelper";


/**
 * @description Load diet tracker data from the database
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 */
const fetchDietTracker = async (dispatch) => {
    const token = await SecureStore.getItemAsync('accessToken');

    await apiClient.get(`${LIFE_MANAGEMENT_DB_BASE}/api/diet-tracker/`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => await setDietTracker(dispatch, response.data))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

/**
 * @description Add meal to daily tracker
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {Object} mealData Data of new meal
 * @example const mealData = {
    name: "Chicken Salad",
    calories: 400,
    protein: 30,
    fat: 15,
    carbs: 20,
    sugar: 5,
    fibre: 8,
    quantity: 2,
};
 * @param {Function} setStatus Function to modify current status
 */
const addMealToDailyTracker = async (dispatch, mealData, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add meal to daily tracker */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/daily-tracker/1/add_meal/`, {
        meal: mealData,
    },{
       headers: {
            'Authorization': `Bearer ${token}`
        } 
    }).then(async response => {
        console.log('Meal added successfully:', response.data);
        await fetchDietTracker(dispatch);
        setStatus({text: 'Meal added successfully', type: 'success'});
    }).catch(error => {
        console.error('Error adding meal:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Add activity to daily tracker
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {Object} activityData Data of new activity
 * @example const activityData = {
    name: "Running",
    calories: 500
};
 * @param {Function} setStatus Function to modify current status
 */
const addActivityToDailyTracker = async (dispatch, activityData, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add activity to daily tracker */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/daily-tracker/1/add_activity/`, {
        activity: activityData,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Activity added successfully:', response.data);
        await fetchDietTracker(dispatch);
        setStatus({text: 'Activity added successfully', type: 'success'});
    }).catch(error => {
        console.error('Error adding Activity:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Update daily tracker stats
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} weight New weight
 * @param {number} caloriesGoal New calories goal
 * @param {Function} setStatus Function to modify current status
 */
const updateDailyTrackerWeightAndGoal = async (dispatch, weight, caloriesGoal, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to update daily tracker stats*/
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/daily-tracker/1/update_weight_and_goal/`, {
        weight: weight,
        calories_goal: caloriesGoal,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('DailyTracker updated successfully:', response.data);
        await fetchDietTracker(dispatch);
        setStatus({text: 'Daily Tracker updated successfully', type: 'success'});
    }).catch(error => {
        console.error('Error updating Daily Tracker:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Reset Daily tracker
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {Function} setStatus Function to modify current status
 */
const resetDailyTracker = async (dispatch, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient post request to reset daily tracker*/
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/daily-tracker/1/reset/`,{},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('DailyTracker reset successfully:', response.data);
            await fetchDietTracker(dispatch);
            setStatus({text: response.data.message, type: 'success'});
        }).catch(error => {
            console.error('Error resetting Daily Tracker:', error.response ? error.response.data : error.message);
            setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
        });
};

/**
 * @description Search for meal in meal history
 * @async Asynchronous due to apiClient request to life management db
 * @param {string} searchString String used for searching meal
 * @param {Function} setSearchResults Function to set search results
 */
const searchMealsInHistory = async (searchString, setSearchResults) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient get request to search for meals */
    await apiClient.get(`${LIFE_MANAGEMENT_DB_BASE}/history/search_meals/?q=${searchString}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('Meals found:', response.data);
            setSearchResults(response.data);
        }).catch(error => {
            console.error('Error searching meals:', error.response ? error.response.data : error.message);
            setSearchResults(error.response.data.error);
        });
};

/**
 * @description Create new recipe
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {Object} recipeData Data for new recipe
 * @example const recipeData = {
    name: "Grilled Chicken Salad",
    meal: {
        name: "Chicken Salad",
        calories: 350,
        protein: 25,
        fat: 15,
        carbs: 20,
        sugar: 5,
        fibre: 7
    },
    ingredients: [
        { name: "Chicken Breast" },
        { name: "Lettuce" },
        { name: "Tomatoes" },
        { name: "Olive Oil" }
    ],
    steps: [
        { name: "Grill the chicken breast." },
        { name: "Chop the vegetables." },
        { name: "Mix all ingredients together." }
    ]
};
 * @param {Function} setStatus Function to modify current status
 */
const createRecipe = async (dispatch, recipeData, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to create a new recipe */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/recipes/add_recipe/`, {
        recipe: recipeData,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Recipe created successfully:', response.data);
        await fetchDietTracker(dispatch);
        setStatus({type: 'success', text: response.data.message});
    }).catch(error => {
        console.error('Error creating recipe:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: 'Error creating recipe'});
    });
};

/**
 * @description Delete an existing recipe
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} recipeId Id of recipe to delete
 * @param {Function} setStatus Function to modify current status
 */
const deleteRecipe = async (dispatch, recipeId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to delete given recipe */
    await apiClient.delete(`${LIFE_MANAGEMENT_DB_BASE}/recipes/${recipeId}/delete_recipe/`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('Recipe deleted successfully:', response.data);
            await fetchDietTracker(dispatch);
            setStatus({type: 'success', text: 'Recipe deleted successfully'});
        }).catch(error => {
            console.error('Error deleting recipe:', error.response ? error.response.data : error.message);
            setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
        });
};

/**
 * @description Add ingredient to an existing recipe
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} recipeId Id of recipe to delete
 * @param {string} ingredientName Name of new ingredient
 * @param {Function} setStatus Function to modify current status
 */
const addIngredientToRecipe = async (dispatch, recipeId, ingredientName, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add ingredient to recipe */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/recipes/${recipeId}/add_ingredient/`, {
        name: ingredientName,
    },{
       headers: {
            'Authorization': `Bearer ${token}`
        } 
    }).then(async response => {
        console.log('Ingredient added successfully:', response.data);
        await fetchDietTracker(dispatch);
        setStatus({type: 'success', text: response.data.message});
    }).catch(error => {
        console.error('Error adding ingredient:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Add step to an existing recipe
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} recipeId Id of recipe to delete
 * @param {string} stepName Name of new ingredient
 * @param {Function} setStatus Function to modify current status
 */
const addStepToRecipe = async (dispatch, recipeId, stepName, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add step to recipe */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/recipes/${recipeId}/add_step/`, {
        name: stepName,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Step added successfully:', response.data);
        await fetchDietTracker(dispatch);
        setStatus({type: 'success', text: response.data.message});
    }).catch(error => {
        console.error('Error adding step:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Edit ingredient of an existing recipe
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} recipeId Id of recipe to delete
 * @param {number} ingredientId Id of ingredient
 * @param {string} ingredientName Name of new ingredient
 * @param {Function} setStatus Function to modify current status
 */
const editIngredientInRecipe = async (dispatch, recipeId, ingredientId, ingredientName, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to edit ingredient of a recipe */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/recipes/${recipeId}/edit_ingredient/`, {
        ingredient_id: ingredientId,
        name: ingredientName,
    },{
       headers: {
            'Authorization': `Bearer ${token}`
        } 
    }).then(async response => {
        console.log('Ingredient updated successfully:', response.data);
        await fetchDietTracker(dispatch);
        setStatus({type: 'neutral', text: response.data.message});
    }).catch(error => {
        console.error('Error updating ingredient:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Edit step of an existing recipe
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} recipeId Id of recipe to delete
 * @param {number} stepId Id of ingredient
 * @param {string} stepName Name of new ingredient
 * @param {Function} setStatus Function to modify current status
 */
const editStepInRecipe = async (dispatch, recipeId, stepId, stepName, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to edit step of a recipe */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/recipes/${recipeId}/edit_step/`, {
       step_id: stepId,
       name: stepName,
   },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
   }).then(async response => {
       console.log('Step updated successfully:', response.data);
       await fetchDietTracker(dispatch);
       setStatus({type: 'neutral', text: response.data.message});
   }).catch(error => {
       console.error('Error updating step:', error.response ? error.response.data : error.message);
       setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
   });
};

/**
 * @description Delete ingredient of an existing recipe
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} recipeId Id of recipe to delete
 * @param {number} ingredientId Id of ingredient
 * @param {Function} setStatus Function to modify current status
 */
const deleteIngredientFromRecipe = async (dispatch, recipeId, ingredientId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient delete request to delete ingredient of a recipe */
    await apiClient.delete(`${LIFE_MANAGEMENT_DB_BASE}/recipes/${recipeId}/delete_ingredient/`, {
       data: {ingredient_id: ingredientId},
       headers: {
            'Authorization': `Bearer ${token}`
        }
   }).then(async response => {
       console.log('Ingredient deleted successfully:', response.data);
       await fetchDietTracker(dispatch);
       setStatus({type: 'neutral', text: response.data.message});
   }).catch(error => {
       console.error('Error deleting ingredient:', error.response ? error.response.data : error.message);
       setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
   });
};

/**
 * @description Delete step of an existing recipe
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} recipeId Id of recipe to delete
 * @param {number} stepId Id of step
 * @param {Function} setStatus Function to modify current status
 */
const deleteStepFromRecipe = async (dispatch, recipeId, stepId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient delete request to delete step of a recipe */
    await apiClient.delete(`${LIFE_MANAGEMENT_DB_BASE}/recipes/${recipeId}/delete_step/`, {
       data: {step_id: stepId},
       headers: {
            'Authorization': `Bearer ${token}`
        }
   }).then(async response => {
       console.log('Step deleted successfully:', response.data);
       await fetchDietTracker(dispatch);
       setStatus({type: 'neutral', text: response.data.message});
   }).catch(error => {
       console.error('Error deleting step:', error.response ? error.response.data : error.message);
       setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
   });
};

/** 
 * @description Compute relevant calories stats
 * @param {Object} dailyTracker Daily tracker which will be used for computations
 * @returns {Object}
 */
const computeCaloriesStats = dailyTracker => {
    /** Compute total calories intake */
    const caloriesIntake = dailyTracker.meals.reduce((total, {calories, quantity})=> total + calories * quantity, 0);

    /** Compute total calories burned */
    const caloriesBurned = dailyTracker.activities.reduce((total, {calories})=>total + calories, 0);

    /** Return computed stats */
    return { caloriesIntake, caloriesBurned };
};

export {fetchDietTracker, addMealToDailyTracker, addActivityToDailyTracker, 
    updateDailyTrackerWeightAndGoal, resetDailyTracker, searchMealsInHistory, 
    createRecipe, deleteRecipe, addIngredientToRecipe, addStepToRecipe,
    editIngredientInRecipe, editStepInRecipe, deleteIngredientFromRecipe,
    deleteStepFromRecipe, computeCaloriesStats
};