import * as actions from "../actions/financeActions";
import * as Helper from '../helpers/financeHelper';

/**
 * @description Finances reducer including finance actions
 * @param {Object} state -> State of application
 * @param {Object} action -> Action to be conducted in this reducer
 * @returns {Object}
 */
const financesReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_FINANCE_DATA: {
            action.type = 'DONE';
            Helper.setFinanceData(state, action);
            return {
                ...state
            };
        };
        case actions.SET_STOCK_PRICE: {
            action.type = 'DONE';
            /** Unpack payload arguments */
            const { code, value } = action.payload;

            /** Find stock and set price to value */
            state.finances.stockPrices[state.finances.stocks.findIndex(stock => stock.stock_code === code)] = value;
            return {
                ...state
            };
        };
        case actions.ADD_STOCK_PRICE: {
            action.type = 'DONE';
            /** Unpack payload arguments */
            const { value } = action.payload;

            /** Add value to stockPrices */
            state.finances.stockPrices.push(value);
        };
        default: return state;
    };
};

export default financesReducer;