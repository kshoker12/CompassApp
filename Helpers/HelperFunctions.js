import axios from 'axios';
import * as links from '../Constants/Links';
import {loadData} from '../context/ContextFunctions';
import * as SecureStore from 'expo-secure-store';
import apiClient from './securityHelper';

/**
 * @description Read data from database
 * @param {Function} dispatch Dispatch function to modify context variables in AppContext
 * @param {string} password Password inputted by user
 */
const readData = async (dispatch, password) => {
    const token = await SecureStore.getItemAsync('accessToken');
    console.log(token);
    /** Make an axios call to database with inputted password and make dispatch call upon success */
    await apiClient.get(`${links.LIFE_MANAGEMENT_DB_BASE}/read/`,{
        headers: { 
            'Authorization': `Bearer ${token}`,
        },
        params: {
            password
        }
    })
        .then((response)=>loadData(dispatch, response.data))
        .catch((error)=> console.error("FAILED"));
};
 
/**
 * @description Save data to database
 * @param {Object} contextData Context Variables to be saved 
 * @param {string} password Password of user
 */
const writeData = async (contextData, password) => {
    /** Initialize formatted data to be sent in post request and append context data */
    let formattedData = new FormData();
    formattedData.append('data', JSON.stringify(contextData));

    /** Make axios post request to database to save data */
    await axios.post(`${links.LIFE_MANAGEMENT_DB_BASE}/write/${password}`, formattedData)
        .then((response)=>console.log('success'))
        .catch((error)=>console.error(error));
};

/**
 * @description Obtain quote from API to display in home screen
 * @param {Function} setQuote Set quote to the quote obtained from API 
 */
const obtainQuote = async (setQuote) => {
    /** Make axios call to zen quotes to obtain quote */
    await axios.get(links.ZEN_QUOTES_API)
        .then((response)=>setQuote({quote: response.data[0]["q"], author: response.data[0]["a"]}))// Successful load of quote)
        .catch((error)=>{
            // Quote Loading Failed
            console.error(error);
            setQuote('Failed');
        })
};

/** Dollar formatter to turn a number into format '$x,xxx,xxx.xx' */
const dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

/** Dollar Formatter with no decimal places, formatting number to '$x,xxx,xxx */
const dollarFormatterNoCents = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

/** Regular Expression to only allow dollar amounts */
const dollarRegex = /(\.\d{2})\d*/;

/**
 * @description Generate given number of shades based on the base colour
 * @param {string} baseColor Base colour
 * @param {number} numberOfShadesNumber of shades to generate
 * @returns {Array<string>}
 */
const generateColorShades = (baseColor, numberOfShades) => {
    const chroma = require('chroma-js');
    return chroma.default.scale([baseColor, 'white']).mode('lab').colors(numberOfShades);
};

/** Format String date in format xxxx-xx-xx to Month, day, Year */
const dateFormatter =  new Intl.DateTimeFormat('en-US', {timeZone: "UTC", year: 'numeric', month: 'long', day: 'numeric'});

/** Current date to pass as DateField in python */
const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/** Current date to pass as DateField in python */
const getDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * @description Format minutes x into y hours z mins 
 * @example 400 -> 6 hours 40 mins
 * @example 30 -> 30 mins
 * @param {number} minutes Minutes to convert
 * @returns {number}
 */
function formatMinutes(minutes) {
    /** Calculate the number of hours */
    const hours = Math.floor(minutes / 60);

    /** Calculate the remaining minutes */
    const mins = minutes % 60;

    /** Return hours and minutes in propert format */
    return hours > 0 ? `${hours} hours ${mins} mins` : `${mins} mins`;
  }

export { getCurrentDate, generateColorShades, readData, writeData, obtainQuote, 
    dollarFormatter, dollarFormatterNoCents, dollarRegex, dateFormatter,
    formatMinutes, getDate
};