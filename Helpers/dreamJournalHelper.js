import { LIFE_MANAGEMENT_DB_BASE } from "../Constants/Links";
import { setDreams } from "../context/functions/dreamFunctions";
import * as AppHelper from "./HelperFunctions";
import * as SecureStore from 'expo-secure-store';
import apiClient from "./securityHelper";

/**
 * @description Extract all dreams from life management db
 * @async Asynchronous due to accessing life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 */
const fetchDreams = async (dispatch) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient get request to retrieve all the dreams */
    await apiClient.get(`${LIFE_MANAGEMENT_DB_BASE}/dreams/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }    
    })
        .then(response => {
            setDreams(dispatch, response.data)
        }).catch(error => console.error(error));
};

/**
 * @description Add a new dream to dream journal
 * @async Asynchronous due to accessing life management DB
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {string} title Title of the dream
 * @param {string} story Story describing the dream
 */
const addDream = async (dispatch, title, story) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add a new dream */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/dreams/`, {
        title,
        story,
        date: AppHelper.getCurrentDate()
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Dream added:', response.data);
        await fetchDreams(dispatch);
    }).catch(error => console.error('Error adding dream:', error.response ? error.response.data : error.message))
};

export {addDream, fetchDreams};