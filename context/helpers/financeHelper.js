/**
 * @description Set finances to finance data retrieved from DB
 * @param {Object} state Object containing all context variables for app
 * @param {Object} action Action containing all necessary details to conduct action
 */
const setFinanceData = (state, action) => {
    /** Unpack payload arguments */
    const { finances } = action.payload;

    /** Set all properties to corresponding properties in loaded data */
    state.finances.assets = finances.assets;
    state.finances.creditCards = finances.credit_cards;
    state.finances.debitCards = finances.debit_cards;
    state.finances.savings = finances.savings;
    state.finances.paycheques = finances.paycheques;
    state.finances.expenses = finances.expenses
    state.finances.stocks = finances.stocks;

    /** Initialize stock prices if this is the first load in session */
    if (state.finances.stockPrices.length === 0) state.finances.stockPrices = Array(state.finances.stocks.length).fill(0);
};

export {setFinanceData};