/**
 * @description Object of colours for networth pie chart
 */
const NETWORTH_PIE_COLOURS = {
    'Savings': '#A52A2A',
    'Assets': '#E97451',
    'Stocks': '#4A0404',
    'Cash': '#E5AA70'
};

/**
 * @description Categories for networth pie chart
 */
const NETWORTH_PIE_CHART_CATEGORIES = ['Savings', 'Assets', 'Stocks', 'Cash'];

/**
 * @description Dimensions for networth pie chart (width x length)
 */
const NETWORTH_PIE_DIMENSIONS = {width: 440, length: 440}

/**
 * @description Card Objects for each card
 * TODO: Optimize this process and be able to add and remove cards using app
 */
const BANKING_CARDS = [
    {
        cardImage: require('../images/wealthsimple.jpg'),
        screen: 'Cards',
        type: 'debitCards',
        id: 1
    },
    {
        cardImage: require('../images/debitcard.jpg'),
        screen: 'Cards',
        type: 'debitCards',
        id: 2
    },
    {
        cardImage: require('../images/creditcard.jpg'),
        screen: 'Cards',
        type: 'creditCards',
        id: 1
    }
];

/**
 * @description Features for finances section
 */
const FINANCE_FEATURES = [
    {
        iconPath: require('../images/finances/stocks.jpg'),
        screen: 'Stocks'
    },
    {
        iconPath: require('../images/finances/assets.jpg'),
        screen: 'Assets'
    },
    {
        iconPath: require('../images/finances/paycheque.jpg'),
        screen: 'Paycheque'
    },
    {
        iconPath: require('../images/finances/savings.jpg'), 
        screen: 'Savings'
    },
    {
        iconPath: require('../images/finances/expenses.jpg'),
        screen: 'Expenses'
    },
    {
        iconPath: require('../images/finances/transfer.jpg'),
        screen: 'Transfer'
    }
];

/**
 * @description Saving modes for savings screen
 * @property IDLE_MODE: User isn't conducting any operation
 * @property ADD_MODE: User is adding a savings goal
 * @property REMOVE_MODE: User is removing a savings goal
 * @property EDIT_MODE: User is editing a savings goal
 */
const savingsModes = {
    IDLE_MODE: -1,
    ADD_MODE: 0,
    REMOVE_MODE: 1,
    EDIT_MODE: 2
};

/**
 * @description Stock modes for stocks screen
 * @property IDLE_MODE: User isn't conducting any operation
 * @property BUY_STOCK: Buy stock mode
 * @property SELL_STOCK: Sell stock mode
 */
const stockModes = {
    IDLE_MODE: -1,
    BUY_STOCK: 0,
    SELL_STOCK: 1
};

/**
 * @description Transaction modes for transactions screen
 * @property IDLE_MODE: User isn't conducting any operation
 * @property EDIT_AMOUNT_ALLOCATED: Edit allocated amount for expense
 * @property ADD_TRANSACTION: Add transaction mode
 */
const transactionModes = {
    IDLE_MODE: -1,
    EDIT_AMOUNT_ALLOCATED: 0,
    ADD_TRANSACTION: 1
};

const ASSETS_PIE_DIMENSIONS = {width: 380, length: 380};

const STOCKS_PIE_DIMENSIONS = {width: 400, length: 400};

const EXPENSE_PIE_DIMENSIONS = {width: 380, length: 380};

const MINIMUM_STOCK_VALUE = 100;

export {NETWORTH_PIE_COLOURS, NETWORTH_PIE_CHART_CATEGORIES, 
    NETWORTH_PIE_DIMENSIONS, BANKING_CARDS, FINANCE_FEATURES,
    savingsModes, ASSETS_PIE_DIMENSIONS, STOCKS_PIE_DIMENSIONS,
    MINIMUM_STOCK_VALUE, stockModes, EXPENSE_PIE_DIMENSIONS, transactionModes
};