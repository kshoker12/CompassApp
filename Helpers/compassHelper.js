import { LIFE_MANAGEMENT_DB_BASE } from "../Constants/Links";
import { setCompass } from "../context/functions/compassFunctions";
import moment from "moment";
import * as SecureStore from 'expo-secure-store';
import apiClient from "./securityHelper";


/**
 * @description Load compass data from the database
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 */
const fetchCompass = async (dispatch) => {
    const token = await SecureStore.getItemAsync('accessToken');

    await apiClient.get(`${LIFE_MANAGEMENT_DB_BASE}/compass/`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => await setCompass(dispatch, response.data))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

/**
 * @description Generate new yearly compass
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {string} year Name of the year
 * @param {Function} setStatus Function to modify status
 */
const generateYearlyCompass = async (dispatch, year, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to generate new yearly compass */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/yearly-compass/generate_yearly_compass/`,{
        name: year,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('YearlyCompass generated successfully:', response.data);
        await fetchCompass(dispatch);
        setStatus({type: 'success', text: 'Yearly Compass generated successfully'});
    }).catch(error => {
        console.error('Error generating YearlyCompass:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: 'Error generating Yearly Compass'})
    });
};

/**
 * @description Delete yearly compass
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {string} yearlyCompassId Id of yearly compass
 * @param {Function} setStatus Function to modify status
 */
const deleteYearlyCompass = async (dispatch, yearlyCompassId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient delete request to delete given yearly compass */
    await apiClient.delete(`${LIFE_MANAGEMENT_DB_BASE}/yearly-compass/${yearlyCompassId}/delete_yearly_compass/`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('YearlyCompass deleted successfully:', response.data);
            await fetchCompass(dispatch);
            setStatus({type: 'neutral', text: 'Yearly Compass deleted successfully'});
        }).catch(error => {
            console.error('Error deleting YearlyCompass:', error.response ? error.response.data : error.message);
            setStatus({type: 'danger', text: 'Error deleting Yearly Compass'});
        });
};

/**
 * @description Edit destination notes
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} destinationId Id of destination
 * @param {string} newNotes New notes for destination
 * @param {Function} setStatus Function to modify status
 */
const editDestinationNotes = async (dispatch, destinationId, newNotes, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient patch request to edit notes for given destination */
    await apiClient.patch(`${LIFE_MANAGEMENT_DB_BASE}/destinations/${destinationId}/edit_notes/`, {
        notes: newNotes,
    },{
       headers: {
            'Authorization': `Bearer ${token}`
        } 
    }).then(async response => {
        console.log('Notes updated:', response.data);
        await fetchCompass(dispatch);
        setStatus({type: 'neutral', text: 'Notes successfully updated'});
    }).catch(error => {
        console.error('Error updating notes:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: 'Error updating notes'});
    });
};

/**
 * @description Mark destination as completed
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} destinationId Id of destination
 * @param {Function} setStatus Function to modify status
 */
const markDestinationAchieved = async (dispatch, destinationId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient patch request to mark destination as achieved */
    await apiClient.patch(`${LIFE_MANAGEMENT_DB_BASE}/destinations/${destinationId}/mark_achieved/`,{},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('Destination marked as achieved:', response.data);
            await fetchCompass(dispatch);
            setStatus({type: 'success', text: 'Destination marked as achieved'});
        }).catch(error => {
            console.error('Error marking destination as achieved:', error.response ? error.response.data : error.message);
            setStatus({type: 'danger', text: 'Error marking destination as achieved'});
        });
};

/**
 * @description Add destination to monthly compass
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} monthlyCompassId Id of monthly compass to add to
 * @param {number} name Name of destination
 * @param {Function} setStatus Function to modify status
 */
const addDestinationToMonthlyCompass = async (dispatch, monthlyCompassId, name, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add destination to monthly compass */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/monthly-compass/${monthlyCompassId}/add_destination/`, {
        name: name,
        notes: '',
        arrived: false,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Destination added:', response.data);
        await fetchCompass(dispatch);
        setStatus({type: 'success', text: 'Successfully added destination'});
    }).catch(error => {
        console.error('Error adding destination:', error.response ? error.response.data : error.message);
        setStatus({type: "danger", text: 'Failed to add destination'});
    });
};

/**
 * @description Remove destination from monthly compass
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} monthlyCompassId Id of monthly compass to add to
 * @param {number} destinationId Id of destination
 * @param {Function} setStatus Function to modify status
 */
const removeDestinationFromMonthlyCompass = async (dispatch, monthlyCompassId, destinationId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient delete request to remove destination from monthly compass */
    await apiClient.delete(`${LIFE_MANAGEMENT_DB_BASE}/monthly-compass/${monthlyCompassId}/remove_destination/`, {
        data: {destination_id: destinationId},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Destination removed:', response.data);
        await fetchCompass(dispatch);
        setStatus({type: 'neutral', text: 'Successfully deleted destination'});
    }).catch(error => {
        console.error('Error removing destination:', error.response ? error.response.data : error.message);
        setStatus({type: "danger", text: 'Failed to delete destination'});
    });
};

/**
 * @description Add destination to yearly compass
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} yearlyCompassId Id of yearly compass to add to
 * @param {number} name Name of destination
 * @param {Function} setStatus Function to modify status
 */
const addDestinationToYearlyCompass = async (dispatch, yearlyCompassId, name, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add destination to yearly compass */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/yearly-compass/${yearlyCompassId}/add_destination/`, {
        name: name,
        notes: '',
        arrived: false,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Destination added:', response.data);
        await fetchCompass(dispatch);
        setStatus({type: 'success', text: 'Successfully added destination'});
    }).catch(error => {
        console.error('Error adding destination:', error.response ? error.response.data : error.message);
        setStatus({type: "danger", text: 'Failed to add destination'});
    });
};

/**
 * @description Remove destination from yearly compass
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} yearlyCompassId Id of yearly compass to add to
 * @param {number} destinationId Id of destination
 * @param {Function} setStatus Function to modify status
 */
const removeDestinationFromYearlyCompass = async (dispatch, yearlyCompassId, destinationId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient delete request to remove destination from yearly compass */
    await apiClient.delete(`${LIFE_MANAGEMENT_DB_BASE}/yearly-compass/${yearlyCompassId}/remove_destination/`, {
        data: {destination_id: destinationId},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Destination removed:', response.data);
        await fetchCompass(dispatch);
        setStatus({type: 'neutral', text: 'Successfully deleted destination'});
    }).catch(error => {
        console.error('Error removing destination:', error.response ? error.response.data : error.message);
        setStatus({type: "danger", text: 'Failed to delete destination'});
    });
};

/**
 * @description Edit weekly destination name
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} destinationId Id of destination
 * @param {string} newName New name for destination
 * @param {Function} setStatus Function to modify status
 */
const setWeeklyDestinationName = async (dispatch, weeklyCompassId, destinationId, newName, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient patch request to edit name for given weekly destination */
    await apiClient.patch(`${LIFE_MANAGEMENT_DB_BASE}/weekly-compass/${weeklyCompassId}/set_weekly_destination_name/`, {
        destination_id: destinationId,
        name: newName,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Successfully set destination name:', response.data);
        await fetchCompass(dispatch);
        setStatus({type: 'success', text: 'Successfully set destination name'});
    }).catch(error => {
        console.error('Error setting destination name:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: 'Error setting destination name'});
    });
};

/**
 * @description Edit weekly destination notes
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} weeklyCompassId Id of weekly compass
 * @param {number} destinationId Id of destination
 * @param {string} newNotes New notes for destination
 * @param {Function} setStatus Function to modify status
 */
const setWeeklyDestinationNotes = async (dispatch, weeklyCompassId, destinationId, newNotes, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient patch request to edit notes for given weekly destination */
    await apiClient.patch(`${LIFE_MANAGEMENT_DB_BASE}/weekly-compass/${weeklyCompassId}/set_weekly_destination_notes/`, {
        destination_id: destinationId,
        notes: newNotes,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Successfully set destination notes:', response.data);
        await fetchCompass(dispatch);
        setStatus({type: 'success', text: 'Successfully set destination notes'});
    }).catch(error => {
        console.error('Error setting destination notes:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: 'Error setting destination notes'});
    });
};

/**
 * @description Decrement Mistakes for weekly compass
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} weeklyCompassId Id of weekly compass
 * @param {Function} setStatus Function to modify status
 */
const decrementMistakes = async (dispatch, weeklyCompassId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient patch request to edit mistakes for given weekly compass */
    await apiClient.patch(`${LIFE_MANAGEMENT_DB_BASE}/weekly-compass/${weeklyCompassId}/decrement_mistakes/`,{},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('Successfully decrement mistakes', response.data);
            await fetchCompass(dispatch);
            setStatus({type: 'neutral', text: 'Successfully decremented mistakes'});
        }).catch(error => {
            console.error('Error decrementing mistakes', error.response ? error.response.data : error.message);
            setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
        });
};

/**
 * @description Set earned points for weekly destination
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 * @param {number} weekylCompassId Id of weekly compass
 * @param {number} destinationId Id of destination
 * @param {number} earnedPoints Earned points for destination
 * @param {Function} setStatus Function to modify status
 */
const setEarnedPoints = async (dispatch, weeklyCompassId, destinationId, earnedPoints, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient patch request to set earned points for given weekly destination */
    await apiClient.patch(`${LIFE_MANAGEMENT_DB_BASE}/weekly-compass/${weeklyCompassId}/set_earned_points/`,{
        destination_id: destinationId,
        earned_points: earnedPoints,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Successfully set earned points', response.data);
        await fetchCompass(dispatch);
        setStatus({type: 'success', text: 'Successfully set earned points'});
    }).catch(error => {
        console.error('Error setting earned points', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Compute compass percentage
 * @param {Object} compass Compass object
 * @returns {number} 
 */
const computeCompassPercentage = compass => {
    /** Initialize count of completed weekly compass */
    let completedWeeklyCompass = 0;

    /** Initialize sum of percentages of completed weekly compass */
    let completedPercentageSum = 0;

    /** For each weekly completed weekly compass, increment completed weekly compass and add percentage to sum */
    compass.yearly_compasses.forEach(yearlyCompass => {
        yearlyCompass.monthly_compasses.forEach(monthlyCompass => {
            monthlyCompass.weekly_compasses.forEach(weeklyCompass =>{
                /** Add Accumulated compass percentage to sum if week is complete */
                if (weeklyCompass.completed) {
                    /** Increment completed weekly compass length */
                    completedWeeklyCompass += 1;

                    /** Add percentage of weekly compass to overall percentage sum */
                    completedPercentageSum += weeklyCompass.percentage;    
                };
            });
        });
    });

    /** Compute and return percentage */
    return completedWeeklyCompass === 0 ? 0 : (completedPercentageSum / completedWeeklyCompass);
};

/**
 * @description Compute life time hours and mistakes of compass
 * @param {Object} compass Compass object for computation
 * @returns {Object}
 */
const computeLifeTimeCompassStats = compass => {
    /** Initialize mistakes and hours*/
    let mistakes = 0, hours = 0;

    /** For each weekly compass, acount for mistakes and hours */
    compass.yearly_compasses.forEach(yearlyCompass => {
        yearlyCompass.monthly_compasses.forEach(monthlyCompass => {
            monthlyCompass.weekly_compasses.forEach(weeklyCompass => {
                if (weeklyCompass.completed) {
                    mistakes += (3 - weeklyCompass.mistakes);
                    hours += weeklyCompass.hours;
                };    
            });
        });
    });

    /** Return computed hours and mistakes */
    return {hours, mistakes};
};

/** 
 * @description Compute active compass
 * @param {Object} compass Compass object
 * @returns {Object}
 */
const extractActiveCompass = compass => {
    /** Initialize active compass */
    let activeCompass = null;

    /** For each weekly completed weekly compass, determine if it is the active compass */
    compass.yearly_compasses.forEach(yearlyCompass => {
        yearlyCompass.monthly_compasses.forEach(monthlyCompass => {
            monthlyCompass.weekly_compasses.forEach(weeklyCompass =>{
                if (activeCompass === null) {
                    if (!weeklyCompass.completed) activeCompass = weeklyCompass;
                };
            });
        });
    });

    /** Return computed active compass */
    return activeCompass;
};

/**
 * @description Compute yearly compass percentage
 * @param {Object} yearlyCompass Yearly compass object
 * @returns {number}
 */
const computeYearlyCompassPercentage = yearlyCompass => {
    /** Initialize percentage sum and weekly compass count */
    let percentageSum = 0, count = 0;

    /** For each completed weekly compass in yearly compass, add percentage and count to accumulated percentage and count */
    yearlyCompass.monthly_compasses.forEach(monthlyCompass => {
        monthlyCompass.weekly_compasses.forEach(weeklyCompass =>{
            if (weeklyCompass.completed) {
                percentageSum += weeklyCompass.percentage;
                count += 1;
            };
        });
    });

    /** Return computed percentage */
    return count > 0 ? percentageSum / count : 0;
};

/**
 * @description Compute yearly compass hours
 * @param {Object} yearlyCompass Yearly compass object
 * @returns {number}
 */
const computeYearlyCompassHours = yearlyCompass => {
    /** Initialize hours */
    let hours = 0;

    /** For each completed weekly compass in yearly compass, add percentage and count to accumulated hours */
    yearlyCompass.monthly_compasses.forEach(monthlyCompass => {
        monthlyCompass.weekly_compasses.forEach(weeklyCompass =>{
            if (weeklyCompass.completed) {
                hours += weeklyCompass.hours;
            };
        });
    });

    /** Return computed hours */
    return hours;
};

/**
 * @description Compute yearly compass mistakes
 * @param {Object} yearlyCompass Yearly compass object
 * @returns {number}
 */
const computeYearlyCompassMistakes = yearlyCompass => {
    /** Initialize mistakes */
    let mistakes = 0;

    /** For each completed weekly compass in yearly compass, add percentage and count to accumulated mistakes */
    yearlyCompass.monthly_compasses.forEach(monthlyCompass => {
        monthlyCompass.weekly_compasses.forEach(weeklyCompass =>{
            if (weeklyCompass.completed) {
                mistakes += (3 - weeklyCompass.mistakes);
            };
        });
    });

    /** Return computed hours */
    return mistakes;
};

/** 
 * @description Compute yearly compass status
 * @param {number} yearlyCompassId Id of Yearly compass
 * @param {Object} compass Compass object
 * @returns {string}
 */
const computeYearlyCompassStatus = (yearlyCompassId, compass) => {
    /** Compute active compass year index */
    let activeIndex = null;

    compass.yearly_compasses.forEach((yearlyCompass, index) => {
        if (activeIndex === null && !isYearlyCompassCompleted(yearlyCompass)) {
            activeIndex = index;
        };
    });

    /** Compute index of yearly compass Id */
    const yearlyCompassIndex = compass.yearly_compasses.findIndex(yearlyCompass => yearlyCompass.id === yearlyCompassId);
    
    /** Conditionally return a status */
    return yearlyCompassIndex > activeIndex ? 'Upcoming' : yearlyCompassIndex < activeIndex ? 'Completed' : 'Active';
};

/** 
 * @description Compute monthly compass status
 * @param {number} yearlyCompassId Id of Yearly compass
 * @param {number} monthlyCompassId Id of montly compass
 * @param {Object} compass Compass object
 * @returns {string}
 */
const computeMonthlyCompassStatus = (yearlyCompassId, monthlyCompassId, compass) => {
    /** Determine if monthly compass belongs to active year */
    const yearStatus = computeYearlyCompassStatus(yearlyCompassId, compass);

    /** Conditionally move forward with process of determining status 
     * @variation UpcomingOrCompleted Status of year is upcoming or completed -> Monthly compass inherits status 
     * of yearly compass
     * @variation Active If yearly compass is active, determine if monthly compass is active
     */
    if (['Upcoming', 'Completed'].includes(yearStatus)) return yearStatus; else {
        /** determine index of active monthly compass */
        const yearlyCompass = compass.yearly_compasses.find(yearlyCompass => yearlyCompass.id === yearlyCompassId)
        const activeIndex = yearlyCompass.monthly_compasses.findIndex((monthlyCompass)=> !isMonthlyCompassCompleted(monthlyCompass));

        /** Compute index of monthly compass Id to the active index and determine status */
        const currentIndex = yearlyCompass.monthly_compasses.findIndex(monthlyCompass => monthlyCompass.id === monthlyCompassId);

        /** Return conditional status */
        return currentIndex > activeIndex ? 'Upcoming' : activeIndex > currentIndex ? 'Completed' : 'Active';
    }
};

/**
 * @description Determine if yearly compass is completed
 * @param {Object} yearlyCompass Yearly compass object
 * @returns {number}
 */
const isYearlyCompassCompleted = yearlyCompass => {
    /** Initialize boolean indicating if yearly compass is complete */
    let complete = true;

    /** For each completed weekly compass in yearly compass, determine if it's completed */
    yearlyCompass.monthly_compasses.forEach(monthlyCompass => {
        monthlyCompass.weekly_compasses.forEach(weeklyCompass =>{
            complete = complete && weeklyCompass.completed;
        });
    });

    /** Return computed boolean */
    return complete;
};

/**
 * @description Determine if monthly compass is completed
 * @param {Object} monthlyCompass Monthly compass object
 * @returns {number}
 */
const isMonthlyCompassCompleted = monthlyCompass => {
    /** Initialize boolean indicating if monthly compass is complete */
    let complete = true;

    /** For each completed weekly compass in monthly compass, determine if it's completed */
    monthlyCompass.weekly_compasses.forEach(weeklyCompass =>{
        complete = complete && weeklyCompass.completed;
    });

    /** Return computed boolean */
    return complete;
};

/**
 * @description Compute monthly compass stats
 * @param {Object} monthlyCompass Monthly compass object
 * @returns {number}
 */
const computeMonthlyCompassStats = monthlyCompass => {
    /** Initialize hours, percentage sum, mistakes, and count */
    let hours = 0, percentageSum = 0, mistakes = 0, count = 0;

    /** For each completed weekly compass in monthly compass, compute stats */
    monthlyCompass.weekly_compasses.forEach(weeklyCompass =>{
        if (weeklyCompass.completed) {
            hours += weeklyCompass.hours;
            mistakes += (3 - weeklyCompass.mistakes);
            percentageSum += weeklyCompass.percentage;
            count += 1;
        };
    });

    /** Compute percentage */
    const percentage = percentageSum / count;

    /** Return computed stats */
    return {mistakes, hours, percentage: count === 0 ? 0 : percentage};
};

/**
 * @description Organize compass percentage data into proper form for chart view
 * @param {Object} compass Compass Data
 * @returns {Array<Object>}
 */
const constructCompassChartData = compass => {
    /** Initialize chart data */
    const chartData = [];

    /** Iterate over weekly compasses in compass object */
    compass.yearly_compasses.forEach((yearlyCompass)=>{
        yearlyCompass.monthly_compasses.forEach((monthlyCompass)=>{
            monthlyCompass.weekly_compasses.forEach((weeklyCompass)=>{
                if (weeklyCompass.completed) {
                    /** Extract weekly compass name to the ISO date format needed for chart */
                    const [start] = weeklyCompass.name.split(' - ');
                    const startISO = moment(`${start} ${yearlyCompass.name}`, 'MMMM DD YYYY').toISOString();

                    chartData.push({
                        value: weeklyCompass.percentage,
                        timestamp: startISO
                    });    
                }
            });
        });
    });

    /** Return chart data */
    return chartData;
};

/**
 * @description Organize compass hours data into proper form for chart view
 * @param {Object} compass Compass Data
 * @returns {Array<Object>}
 */
const constructHoursChartData = compass => {
    /** Initialize chart data */
    const chartData = [];

    /** Iterate over weekly compasses in compass object */
    compass.yearly_compasses.forEach((yearlyCompass)=>{
        yearlyCompass.monthly_compasses.forEach((monthlyCompass)=>{
            monthlyCompass.weekly_compasses.forEach((weeklyCompass)=>{
                if (weeklyCompass.completed) {
                    /** Extract weekly compass name to the ISO date format needed for chart */
                    const [start] = weeklyCompass.name.split(' - ');
                    const startISO = moment(`${start} ${yearlyCompass.name}`, 'MMMM DD YYYY').toISOString();

                    chartData.push({
                        value: weeklyCompass.hours,
                        timestamp: startISO
                    });    
                }
            });
        });
    });

    /** Return chart data */
    return chartData;
};

/**
 * @description Organize compass networth data into proper form for chart view
 * @param {Object} compass Compass Data
 * @returns {Array<Object>}
 */
const constructNetworthChartData = compass => {
    /** Initialize chart data */
    const chartData = [];

    /** Iterate over weekly compasses in compass object */
    compass.yearly_compasses.forEach((yearlyCompass)=>{
        yearlyCompass.monthly_compasses.forEach((monthlyCompass)=>{
            monthlyCompass.weekly_compasses.forEach((weeklyCompass)=>{
                if (weeklyCompass.completed && weeklyCompass.networth) {
                    /** Extract weekly compass name to the ISO date format needed for chart */
                    const [start] = weeklyCompass.name.split(' - ');
                    const startISO = moment(`${start} ${yearlyCompass.name}`, 'MMMM DD YYYY').toISOString();

                    chartData.push({
                        value: weeklyCompass.networth,
                        timestamp: startISO
                    });    
                }
            });
        });
    });

    /** Return chart data */
    return chartData;
};

/** 
 * @description Compute weekly compass status
 * @param {number} yearlyCompassId Id of yearly compass
 * @param {number} monthlyCompassId Id of montly compass
 * @param {number} weeklyCompassId Id of weekly compass
 * @param {Object} compass Compass object
 * @returns {string}
 */
const computeWeeklyCompassStatus = (yearlyCompassId, monthlyCompassId, weeklyCompassId, compass) => {
    /** Determine if weekly compass belongs to active month */
    const monthStatus = computeMonthlyCompassStatus(yearlyCompassId, monthlyCompassId, compass);

    /** Conditionally move forward with process of determining status 
     * @variation UpcomingOrCompleted Status of month is upcoming or completed -> Weekly compass inherits status 
     * of monthly compass
     * @variation Active If monthly compass is active, determine if weekly compass is active
     */
    if (['Upcoming', 'Completed'].includes(monthStatus)) return monthStatus; else {
        /** determine index of active weekly compass */
        const monthlyCompass = compass.yearly_compasses.find(yearlyCompass => yearlyCompass.id === yearlyCompassId).monthly_compasses.find(monthlyCompass => monthlyCompass.id === monthlyCompassId);
        const activeIndex = monthlyCompass.weekly_compasses.findIndex(weeklyCompass=> !weeklyCompass.completed);

        /** Compute index of weekly compass Id to the active index and determine status */
        const currentIndex = monthlyCompass.weekly_compasses.findIndex(weeklyCompass => weeklyCompass.id === weeklyCompassId);

        /** Return conditional status */
        return currentIndex > activeIndex ? 'Upcoming' : activeIndex > currentIndex ? 'Completed' : 'Active';
    };
};

export {fetchCompass, deleteYearlyCompass, generateYearlyCompass, 
    editDestinationNotes, markDestinationAchieved, addDestinationToMonthlyCompass,
    removeDestinationFromMonthlyCompass, addDestinationToYearlyCompass,
    removeDestinationFromYearlyCompass, setWeeklyDestinationName,
    setWeeklyDestinationNotes, decrementMistakes, setEarnedPoints,
    computeCompassPercentage, extractActiveCompass, computeLifeTimeCompassStats,
    isYearlyCompassCompleted, computeYearlyCompassPercentage, computeYearlyCompassHours,
    computeYearlyCompassMistakes, computeYearlyCompassStatus, isMonthlyCompassCompleted, 
    computeMonthlyCompassStats, computeMonthlyCompassStatus, computeWeeklyCompassStatus,
    constructCompassChartData, constructHoursChartData
};