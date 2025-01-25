import { LIFE_MANAGEMENT_DB_BASE } from "../Constants/Links";
import { TRAIT_CATEGORIES } from "../Constants/lifeUltimateTeamConstants";
import { setLifeUltimateTeam } from "../context/functions/lifeUltimateTeamFunctions";
import * as SecureStore from 'expo-secure-store';
import apiClient from "./securityHelper";

/**
 * @description Extract sub traits for specified category
 * @param {Array<Object>} subTraits Array containing all sub traits
 * @param {string} category Trait category to extract sub ratings for
 * @returns {Array<Object>}
 */
const extractTraitGroupings = (subTraits, category) => subTraits.filter(subTrait=> subTrait.category === category);

/**
 * @description Compute total rating for category
 * @param {Array<Object>} subTraits Sub Traits to compute rating for
 * @returns {number}
 */
const computeRatingCategories = subTraits => subTraits.reduce((total, subTrait)=> total + subTrait.days * subTrait.rating, 0) / subTraits.reduce((total, subTrait)=> total + subTrait.days, 0);

/**
 * @description Extract ratings for each category, as well as overall rating
 * @param {Array<Object>} subTraits Array containing all sub traits
 * @returns {Object}
 */
const extractRatings = subTraits => {
    /** For each category, compute total rating */
    const categoryRatings = TRAIT_CATEGORIES.map(category => {
        /** Extract sub traits for category */
        const categorySubTraits = extractTraitGroupings(subTraits, category);
        
        /** Compute the total accumulated ratings and divide by total days to get the final rating */
        const rating = computeRatingCategories(categorySubTraits);

        /** Return rating and category name as objects */
        return {category, rating};
    });

    /** Compute total ratings */
    const totalRating = categoryRatings.reduce((total, category)=> total + category.rating * 1 / categoryRatings.length, 0);

    /** Return total rating and rating for each categories */
    return {totalRating, categoryRatings};
};

/**
 * @description Extract all sub traits from life management db
 * @async Asynchronous due to accessing life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 */
const fetchSubTraits = async (dispatch) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient get request to retrieve all the sub traits */
    await apiClient.get(`${LIFE_MANAGEMENT_DB_BASE}/sub-traits/`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            setLifeUltimateTeam(dispatch, response.data)
        }).catch(error => console.error(error));
};

/**
 * @description Update sub trait ratings by applying weighted sum including new daily rating
 * @async Asynchronous due to accessing life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} subTraitId Sub Trait Id to apply rating to
 * @param {number} rating Daily Rating assigned
 */
const updateSubTraitRating = async (dispatch, subTraitId, rating) => {
    const token = await SecureStore.getItemAsync('accessToken');
     
    /** Make apiClient post request to apply new daily rating to given sub trait */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/sub-traits/${subTraitId}/update_rating/`, {
        rating: rating * 10
    },{
       headers: {
            'Authorization': `Bearer ${token}`
        }  
    }).then(async response => {
        console.log('Rating updated:', response.data);
        await fetchSubTraits(dispatch);
    }).catch(error => console.error('Error updating rating:', error.response ? error.response.data : error.message));
};

export {extractTraitGroupings, extractRatings, updateSubTraitRating, fetchSubTraits};