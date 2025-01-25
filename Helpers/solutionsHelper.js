import { LIFE_MANAGEMENT_DB_BASE } from "../Constants/Links";
import { setSolutions } from '../context/functions/solutionsFunctions';
import * as SecureStore from 'expo-secure-store';
import apiClient from "./securityHelper";


/**
 * @description Extract all solutions from life management db
 * @async Asynchronous due to accessing life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 */
const fetchSolutions = async (dispatch) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient get request to retrieve all solutions */
    await apiClient.get(`${LIFE_MANAGEMENT_DB_BASE}/solutions/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response =>{
            await setSolutions(dispatch, response.data);
        }).catch(error => console.error('Error fetching solutions:', error.response ? error.response.data : error.message));
};

/**
 * @description Solve solution at given Id
 * @async Asynchronous due to accessing life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} solutionId Id of solution to solve
 */
const solveSolution = async (dispatch, solutionId) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to solve solution at given solution Id */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/solutions/${solutionId}/solve/`,{},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            await fetchSolutions(dispatch);
            console.log('Problem solved:', response.data);
        }).catch(error => console.error('Error solving problem:', error.response ? error.response.data : error.message));
};

/**
 * @description Add solution with given properties
 * @async Asynchronous due to accessing life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} problem Problem to solve
 */
const addSolution = async (dispatch, problemText) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add new solution */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/solutions/`, {
        problem: problemText,
        solutionText: '',
        is_solved: false,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response =>{
        await fetchSolutions(dispatch);
        console.log('Problem added:', response.data);
    }).catch(error => console.error('Error adding problem:', error.response ? error.response.data : error.message));
};

/**
 * @description Edit solution with given solution Id
 * @async Asynchronous due to accessing life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} solutionId Id of solution to edit
 * @param {string} solutionText New solution text to add to solution at given solution Id
 */
const editSolution = async (dispatch, solutionId, solutionText) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient patch request to modify solution text */
    await apiClient.patch(`${LIFE_MANAGEMENT_DB_BASE}/solutions/${solutionId}/`, {
        solutionText
    },{
       headers: {
            'Authorization': `Bearer ${token}`
        } 
    }).then(async response => {
        console.log('Solution text updated:', response.data);    
        await fetchSolutions(dispatch);
    }).catch(error => console.error('Error updating solution text:', error.response ? error.response.data : error.message));
};

export { fetchSolutions, solveSolution, addSolution, editSolution };