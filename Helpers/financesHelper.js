import { LIFE_MANAGEMENT_DB_BASE, STOCK_PRICE_API } from "../Constants/Links";
import * as financeConstants from "../Constants/financeConstants";
import * as AppHelper from "./HelperFunctions";
import { addStockPrice, setFinanceData, setStockPrice } from '../context/functions/financeFunctions';
import * as SecureStore from 'expo-secure-store';
import apiClient from "./securityHelper";
import axios from "axios";
   
/** 
 * @description Look for user-inputted stocks 
 * @async Asynchronous because of stock price api
 * @param {string} stockCode Stock to search price for
 * @param {Function} setPrice Sets stock price
 * @param {Function} setLongName Sets long name of stock
 * @param {Function} setError Sets error
 */
const findStock = async (stockCode, setPrice, setLongName, setError) => {
    /** Make apiClient get request to access stock info for user-inputted stock code */
    await axios.get(`${STOCK_PRICE_API}/${stockCode}`)
        .then(response => {
            try {
                setPrice(response.data.chart.result[0].meta.regularMarketPrice * 1.36)
                setLongName(response.data.chart.result[0].meta.longName);
                setError(false);
            } catch (error) {
                console.error(error);
                setError(true)
                setPrice(0);
                setLongName('');
            };
        }).catch(error => {
            console.error(error);
            setError(true);
        });
};

/**
 * @description Buy shares for given stocks
 * @async Asynchronous because of apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {string} stockCode Stock to search price for
 * @param {number} sharesToBuy Number of shares to buy
 * @param {number} debitCardId Debit card Id to transfer value to
 * @param {string} stockName Long name of stock
 * @param {number} currentPrice Current price of stock
 */
const buyShares = async (dispatch, stockCode, sharesToBuy, debitCardId, stockName, currentPrice) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to buy shares */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/stocks/buy_stock/`, {
        name: stockName,
        code: stockCode.toUpperCase(),
        shares: sharesToBuy,
        current_price: currentPrice,
        debit_card_id: debitCardId
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => {
        console.log('Stock purchased:', response.data);
        await fetchFinances(dispatch);
        await addStockPrice(dispatch, currentPrice);
    })
    .catch(error => console.error('Error purchasing stock:', error.response ? error.response.data : error.message));    
};

/**
 * @description Sell shares for given stocks
 * @async Asynchronous because of apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {string} stockCode Stock to search price for
 * @param {number} stockId Id of stock to sell
 * @param {number} sharesToSell Number of shares to sell
 * @param {number} debitCardId Debit card Id to transfer value to
 * @param {number} stockPrice Price of stock to sell
 */
const sellShares = async (dispatch, stockId, sharesToSell, debitCardId, stockPrice) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to sell shares */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/stocks/${stockId}/sell_shares/`, {
        shares: sharesToSell,
        debit_card_id: debitCardId,
        stock_price: stockPrice
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Shares sold:', response.data);
        await fetchFinances(dispatch);
    }).catch(error => console.error('Error selling shares:', error.response ? error.response.data : error.message));
};

/**
 * @description Obtain current stock price for given stock
 * @async Asynchronous because of stock price api
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {string} stockCode Stock to search price for
 */
const getCurrentStockPrice = async (dispatch, stockCode) => {
    /** Make apiClient get request to obtain prices for given stock */
    axios.get(`${STOCK_PRICE_API}/${stockCode}`)
        .then(async response => {
            await setStockPrice(dispatch, stockCode, response.data.chart.result[0].meta.regularMarketPrice * 1.36);
        }).catch(error => console.error('failed', error))
};

/**
 * @description Add transaction to given expense and also add it as an asset if user flagged this as an asset
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} expenseId Id of expense to add transaction for
 * @param {string} name Name of transaction
 * @param {number} cost Cost of transaction
 * @param {boolean} isAsset Indicator if this transaction is an asset
 * @param {number} cardId Id of card
 * @param {string} cardType Type of card
 */
const addTransaction = async (dispatch, expenseId, name, cost, isAsset, cardId, cardType) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add transactions to given expense */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/expenses/${expenseId}/add_transaction/`, {
        name: name,
        cost: cost,
        date: AppHelper.getCurrentDate(),
        is_asset: isAsset,
        card_type: cardType,
        card_id: cardId
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Transaction added:', response.data);
        // Handle success (e.g., notify the user, update UI)
        await fetchFinances(dispatch);
    }).catch(error => console.error('Error adding transaction:', error.response ? error.response.data : error.message));
};


/**
 * @description Reset expenses by setting amount allocated to 0 and clearing transactions
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 */
const resetExpenses = async (dispatch) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to reset expenses */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/expenses/reset_expenses/`,{},{
       headers: {
            'Authorization': `Bearer ${token}`
        } 
    })
        .then(async response => {
            console.log('Expenses reset:', response.data);
            await fetchFinances(dispatch);
        }).catch(error => console.error('Error resetting expenses:', error.response ? error.response.data : error.message));
};

/**
 * @description Set amount allocated for given expense Id to user-inputted amount
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} expenseId Id of expense to modify amount allocated for
 * @param {number} amountAllocated Amount to be allocated
 */
const setExpenseAmountAllocated = async (dispatch, expenseId, amountAllocated) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to set amount allocated for given expense Id */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/expenses/${expenseId}/set_amount_allocated/`, {
        amount_allocated: amountAllocated
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Amount allocated updated:', response.data);
        // Handle success (e.g., notify the user, update UI)
        await fetchFinances(dispatch);
    }).catch(error => console.error('Error updating amount allocated:', error.response ? error.response.data : error.message));
};

/**
 * @description Transfer user-inputted amount from source card to target card
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} sourceCardId Id of source card
 * @param {number} targetCardId Id of target card
 * @param {number} amount Amount to transfer
 */
const transferCash = async (dispatch, sourceCardId, targetCardId, amount) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/debit-cards/transfer_cash/`, {
        from_card_id: sourceCardId,
        to_card_id: targetCardId,
        amount: amount
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }  
    }).then(async response => {
        console.log('Transfer successful:', response.data);
        // Handle success (e.g., reset the form, notify the user)
        await fetchFinances(dispatch);
    }).catch(error => console.error('Error transferring cash:', error.response ? error.response.data : error.message));
};

/**
 * @description Add paycheque 
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {string} name Name on cheque
 * @param {number} amount Amount of cheque as a float
 * @param {string} date Date of cheque
 * @param {string} amountInText Amount of cheque as text
 * @param {string} memo Memo related to cheque
 * @param {string} signature My signature
 * @param {number} debitCardId Id of debit card to transfer cheque to 
 */
const addPaycheque = async (dispatch, name, amount, date, amountInText, memo, signature, debitCardId) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** apiClient post request to add paycheque */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/paycheques/`, {
        name: name,
        amount: amount,
        date: date,
        amount_in_text: amountInText,
        memo: memo,
        signature: signature,
        debit_card_id: debitCardId
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then( async response => {
        console.log('Paycheque added:', response.data);
        // Handle success (e.g., reset the form, notify the user)
        await fetchFinances(dispatch)
    }).catch(error => console.error('Error adding paycheque:', error.response ? error.response.data : error.message));
};

/**
 * @description Add user-inputted funds to given saving goal
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} savingId Id of saving goal
 * @param {number} debitCardId Id of debit card
 * @param {number} amount Amount to add
 */
const addSavingFunds = async (dispatch, savingId, debitCardId, amount) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add funds to saving goal */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/savings/${savingId}/add_funds/`, {
        debit_card_id: debitCardId,
        amount: amount
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Funds added:', response.data);
        // Handle success (e.g., update the UI or notify the user)
        await fetchFinances(dispatch);
    }).catch(error => console.error('Error adding funds:', error.response ? error.response.data : error.message));
};

/**
 * @description Remove user-inputted funds to given saving goal
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} savingId Id of saving goal
 * @param {number} debitCardId Id of debit card
 * @param {number} amount Amount to remove
 */
const removeSavingFunds = async (dispatch, savingId, debitCardId, amount) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to remove funds from saving goal */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/savings/${savingId}/remove_funds/`, {
        debit_card_id: debitCardId,
        amount: amount
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }    
    }).then(async response => {
        console.log('Funds removed:', response.data);
        // Handle success (e.g., update the UI or notify the user)
        await fetchFinances(dispatch);
    }).catch(error => console.error('Error removing funds:', error.response ? error.response.data : error.message));
};

/**
 * @description Edit saving goal
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {string} name Name of savings
 * @param {number} target Target amount
 */
const editSavingGoal = async (dispatch, savingId, name, targetGoal) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient patch request to edit saving goal properties */
    await apiClient.patch(`${LIFE_MANAGEMENT_DB_BASE}/savings/${savingId}/`,{
        name: name,
        target_goal: targetGoal
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then( async response => {
        console.log('Saving updated:', response.data);
        await fetchFinances(dispatch);
    }).catch(error => console.error('Error updating saving:', error.response ? error.response.data : error.message));
};

/**
 * @description Add saving goal
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {string} name Name of savings
 * @param {number} target Target amount
 */
const addSavingGoal = async (dispatch, name, target) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to create saving goal */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/savings/`, {
        name: name, 
        target_goal: target,
        saved_amount: 0
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    }).then(async response => {
        console.log('Saving added', response.data);
        await fetchFinances(dispatch);
    }).catch(error => console.error('Error adding savings:', error.response ? error.response.data : error.message))
};

/**
 * @description Delete Saving goal
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {number} savingId Id of saving goal to delete
 * @param {number} debitCardId Id of debit card to transfer to
 */
const deleteSavingGoal = async (dispatch, savingId, debitCardId) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient delete call to url and delete user-selected saving goal */
    await apiClient.delete(`${LIFE_MANAGEMENT_DB_BASE}/savings/${savingId}/delete_saving/`, {
        data: {debit_card_id: debitCardId},
        headers: {
            'Authorization': `Bearer ${token}`
        }  
    }).then ( async response => {
        console.log('Saving deleted and amount transferred:', response.data);
        await fetchFinances(dispatch);
    }).catch(error => console.error('Error deleting saving:', error.response ? error.response.data : error.message));
};

/**
 * @description Pay credit card with given debit card
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify context variables
 * @param {number} creditCardId Id of credit card
 * @param {number} debitCardId Id of Debit card
 * @param {number} amount Amount to pay
 */
const payCreditCard = async (dispatch, creditCardId, debitCardId, amount) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request with given amount and debit card Id */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/credit-cards/${creditCardId}/pay_card/`, {
        debit_card_id: debitCardId,
        payment_amount: amount
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async (response)=>{
        console.log('Payment successful:', response.data);
        await fetchFinances(dispatch);
    }).catch(error=> console.error('Error making payment:', error.response ? error.response.data : error.message));
};

/**
 * @description Load finance data from the database
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 */
const fetchFinances = async (dispatch) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    await apiClient.get(`${LIFE_MANAGEMENT_DB_BASE}/api/complete-data/`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => setFinanceData(dispatch, response.data))
        .catch(error => {
        console.error('Error fetching data:', error);
        });
};

/**
 * @description Delete asset
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} assetId Id of asset to delete
 * @param {number} debitCardId Id of debit card
 */
const deleteAsset = async (dispatch, assetId, debitCardId) => {
    const token = await SecureStore.getItemAsync('accessToken');
     
    await apiClient.delete(`${LIFE_MANAGEMENT_DB_BASE}/assets/${assetId}/delete_asset/`, {
        data: {
            debit_card_id: debitCardId
        },
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    }).then(async response => {
        console.log('Asset deleted and value transferred:', response.data);
        // Handle success (e.g., update the UI or notify the user)
        await fetchFinances(dispatch);
    }).catch(error => {
        console.error('Error deleting asset:', error.response ? error.response.data : error.message);
        // Handle error (e.g., show an error message)
    });
};

/**
 * @description Edit the name and value for asset
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch  Dispatch function to modify AppContext
 * @param {number} id Id of asset
 * @param {string} name New name of asset
 * @param {string} newAmount New amount of asset
 */
const editAsset = async (dispatch, id, newName, newAmount) => {
    /** Initialize form data and add new name and amount */
    const formData = new FormData();
    formData.append('name', newName);
    formData.append('value', newAmount);
    const token = await SecureStore.getItemAsync('accessToken');
     
    /** Make apiClient patch request to modify content */
    await apiClient.patch(
        `${LIFE_MANAGEMENT_DB_BASE}/assets/${id}/edit_asset/`,
        formData,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            } 
        }
    ).then(async (response)=>{
        if (response.status === 200) {
            console.log('Success, Content updated successfully', response.data);
            await fetchFinances(dispatch)
        }
    }).catch((error)=>console.error(error));
};

/**
 * @description Compute available cash from available amount in debit card
 * @param {Array<Object>} debitCards Array containing Debit Cards
 * @returns {number}
 */
const computeAvailableCash = (debitCards) => debitCards.reduce((availableCash, card)=> availableCash + card.available, 0);

/**
 * @description Compute total asset value by summing value of each asset
 * @param {Array<Object>} assets Array of assets
 * @returns {number}
 */
const computeAssetsValue = (assets) => assets.reduce((totalValue, asset)=> totalValue + asset.value, 0);

/**
 * @description Compute total amount saved by summing savings amount for each savings goal
 * @param {Array<Object>} savings Array of savings
 * @returns {number}
 */
const computeAmountSaved = (savings) => savings.reduce((totalSavings, savingGoal)=> totalSavings + savingGoal.saved_amount, 0); 

/**
 * @description Compute total portfolio value by summing up value of each owned stock
 * @param {Array<Object>} stocks Array of owned stocks
 * @param {Array<number>} stockPrices Array containing prices for stocks
 * @returns {number}
 */
const computePortfolioValue = (stocks, stockPrices) => stocks.reduce((portfolioValue, stock, index)=> portfolioValue + stockPrices[index] * stock.shares, 0); 

/**
 * @description Functions to compute networth based on category
 */
const NETWORTH_COMPUTING_FUNCTIONS = {
    'Savings': computeAmountSaved,
    'Assets': computeAssetsValue,
    'Stocks': computePortfolioValue,
    'Cash': computeAvailableCash
};

/**
 * @description Compute the total networth by summing up properties contributing to 
 * networth (Available Cash, Stocks, Savings, and Assets) and also the pie chart objects for each category
 * @param {Object} finances Object containing all properties of finances
 * @returns {Object}
 */
const computeNetworthPieData = (finances) => {
    // a) Initialize networth as 0
    let networth = 0;
    
    // b) Sum all categories computed networth to networth value and also create the pie chart
    // objects for each category
    const networthCategories = financeConstants.NETWORTH_PIE_CHART_CATEGORIES.map((category, index)=>{
        // Initialize Pie chart object and set id based on index and label and colour based on category key
        let pieChartObject = {};
        pieChartObject['id'] = index + 1;
        pieChartObject['label'] = category;
        pieChartObject['color'] = financeConstants.NETWORTH_PIE_COLOURS[category];
    
        // Compute networth by extracting corresponding function for this category and add it to total networth and
        // the Y value of this pie chart object
        const networthValue = NETWORTH_COMPUTING_FUNCTIONS[category](finances[category === 'Cash' ? 'debitCards' : category.toLowerCase()], finances.stockPrices);
        pieChartObject['y'] = networthValue;
        networth += networthValue;

        // Return pie chart object
        return pieChartObject;
    });

    // c) Return computed networth and networth categories to display in pie chart
    return {networth: networth, networthCategories};
};

/**
 * @description Compute asset categories to use in the pie chart
 * @param {Array<Object>} assets Assets in budget tracker to compute categories for
 * @returns {Object}
 */
const computeAssetsCategories = assets => {
    // a) Generate colour scale based on number of assets
    const colours = AppHelper.generateColorShades('gold', assets.length);
    
    // b) Initialize new asset value
    let assetValue = 0;

    // c) Transform assets into a new object which will be displayed in pie chart
    const assetCategories = assets.map(({value, name, id}, index)=>{
        // Add asset value to total amount value
        assetValue += value;
        
        // Create and return new object
        return {y: value, label: name, id};
    })

    // d) Return asset categories and computed asset value and generated colours
    return {assetCategories, assetValue, colours};
};

/**
 * @description Compute stocks categories to use in the pie chart
 * @param {Array<Object>} stocks Stocks in budget tracker to compute categories for
 * @param {Array<number>} stockPrices Array containing prices for stocks
 * @returns {Object}
 */
const computeStockCategories = (stocks, stockPrices) => {
    // a) Generate colour scale based on number of assets
    const colours = AppHelper.generateColorShades('green', stocks.length);
    
    // b) Initialize new portfolio value
    let portfolioValue = 0;

    // c) Transform stocks into a new object which will be displayed in pie chart
    const stockCategories = stocks.map(({stock_code, shares, id}, index)=>{
        // Add asset value to total amount value
        const totalPrice = (shares * stockPrices[index])
        portfolioValue += totalPrice;
        
        // Create and return new object
        return {y: totalPrice, label: stock_code, id};
    })

    // d) Return stocks categories and computed portfolio value and generated colours
    return {stockCategories: stockCategories.filter(({y})=>y>=financeConstants.MINIMUM_STOCK_VALUE), portfolioValue, colours};
};

/**
 * @description Split the text based on max width
 * @param {string} text Text to display
 * @param {number} maxCharsPerLine Maximum number of lines
 * @returns {Array<string>}
 */
const splitTextByWidth = (text, maxCharsPerLine) => {
    // a) Split text by words and initialize lines array to hold lines and a current line value
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
  
    // b) For each word add word to line if its below maximum character threshold, otherwise add to a new line
    words.forEach((word) => {
      if ((currentLine + word).length > maxCharsPerLine) {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    });
  
    // c) Add last line to lines array
    lines.push(currentLine.trim());
  
    // d) Return lines array with text broken up into lines
    return lines;
};

/**
 * @description Turn debit card object into dropdown format for React-Native-Dropdown-Picker
 * @param {Array<Object>} debitCards Debit cards to be transformed
 */
const debitCardToDropDown = debitCards => {
    // a) Transform and return each debit card into dropdown object
    return debitCards.map(({name, available, id})=>({label: `${name} (${AppHelper.dollarFormatter.format(available)})`, value: id}));
};

/**
 * @description Convert expenses to categories 
 * @param {Object} expenses Expenses to convert
 * @returns {Object}
 */
const computeExpenseCategories = expenses => {
    // a) Generate colour scale based on number of assets
    const colours = AppHelper.generateColorShades('gray', expenses.length);

    // b) Initialize expenses 
    let totalAllocated = 0;

    // c) Create pie chart object for each expense item while also computing total expenses
    const expenseCategories = expenses.map(({name, amount_allocated, id})=>{
        // Add amount allocated to total amount allocated
        totalAllocated += amount_allocated;

        // Create and add new object
        return {label: name, y: amount_allocated, id};
    });

    // d) Return total allocated amount and expense categories
    return {totalAllocated, expenseCategories, colours};
};

/**
 * @description Compute percentage of amount spent compared to amount allocated for an expense
 * @param {number} amountAllocated Amount allocated for this expense
 * @param {Array<Object>} transactions List of transactions for this expense
 * @returns {number}
 */
const computeSpentPercentage = (amountAllocated, transactions) => transactions.reduce((totalAmount, transaction)=>totalAmount + transaction.cost, 0) / amountAllocated * 100;    

export {computeAssetsCategories, computeAmountSaved, computeAssetsValue, computePortfolioValue, 
    computeAvailableCash, computeNetworthPieData, splitTextByWidth, computeStockCategories,
    debitCardToDropDown, computeExpenseCategories, computeSpentPercentage, fetchFinances,
    deleteAsset, editAsset, payCreditCard, addSavingGoal, deleteSavingGoal, editSavingGoal,
    removeSavingFunds, addSavingFunds, addPaycheque, transferCash, resetExpenses, 
    setExpenseAmountAllocated, addTransaction, getCurrentStockPrice, sellShares, buyShares,
    findStock
};