import { ADD_STOCK_PRICE, FINANCE_ACTIONS, SET_FINANCE_DATA, SET_STOCK_PRICE } from "../actions/financeActions";

/**
 * @description Set finance data to loaded data
 * @param {Function} dispatch -> Dispatch function to modify context variables
 * @param {Object} finances -> Loaded data
 */
const setFinanceData = (dispatch, finances) => dispatch({
    type: SET_FINANCE_DATA,
    payload: { finances }, 
    class: FINANCE_ACTIONS
});

/**
 * @description Set stock price for given stock
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {number} code Stock code of stock to change price for
 * @param {number} value Value of this stock
 */
const setStockPrice = (dispatch, code, value) => dispatch({
    type: SET_STOCK_PRICE,
    payload: { code, value },
    class: FINANCE_ACTIONS
});

/**
 * @description Add new stock price for new stock
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {number} value Value of this stock
 */
const addStockPrice = (dispatch, value) => dispatch({
    type: ADD_STOCK_PRICE,
    payload: { value },
    class: FINANCE_ACTIONS
});

export {setFinanceData, setStockPrice, addStockPrice};