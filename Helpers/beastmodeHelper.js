import { LIFE_MANAGEMENT_DB_BASE } from "../Constants/Links";
import { setBeastmode } from '../context/functions/beastmodeFunctions';
import { RESPONSIBILITY_ALERTS, TASK_ALERTS, upcomingRangeModes } from "../Constants/beastmodeConstants";
import { formatMinutes } from "./HelperFunctions";
import * as SecureStore from 'expo-secure-store';
import apiClient from "./securityHelper";

/**
 * @description Load beastmode data from the database
 * @async Asynchronous due to apiClient request to life management db
 * @param {Function} dispatch Dispatch function to modify Context Variables
 */
const fetchBeastmode = async (dispatch) => {
    const token = await SecureStore.getItemAsync('accessToken');

    await apiClient.get(`${LIFE_MANAGEMENT_DB_BASE}/api/beastmode-data/`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => await setBeastmode(dispatch, response.data))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

/**
 * @description Add responsibility with given name 
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {string} name Name of responsibility
 * @param {Function} setStatus Function to set status of request
 */
const addResponsibility = async (dispatch, name, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient post request to create new responsibility */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/responsibilities/`, {
        name,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Responsibility added:', response.data);
        await fetchBeastmode(dispatch);
        setStatus({text: RESPONSIBILITY_ALERTS.successAdd, type: 'success'})
    }).catch(error => {
        console.error('Error adding responsibility:', error.response ? error.response.data.error : error.message);
        setStatus({text: RESPONSIBILITY_ALERTS.dangerAdd, type: 'danger'});
    });
};

/**
 * @description Delete responsibility with given Id 
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} Id Id of responsibility
 * @param {Function} setStatus Function to set status of request
 */
const deleteResponsibility = async (dispatch, id, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient delete request to delete responsibility with given Id*/
    await apiClient.delete(`${LIFE_MANAGEMENT_DB_BASE}/responsibilities/${id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('Responsibility deleted:', response.data);
            await fetchBeastmode(dispatch);
            setStatus({text: RESPONSIBILITY_ALERTS.successDelete, type: 'neutral'})
        }).catch(error => {
            console.error('Error adding responsibility:', error.response ? error.response.data.error : error.message);
            setStatus({text: RESPONSIBILITY_ALERTS.dangerDelete, type: 'danger'});
    });
};

/**
 * @description Add task to given responsibility
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {string} name Name of task
 * @param {boolean} repeat Indicator whether task should be repeated
 * @param {number} responsibilityId Id of responsibility
 * @param {Function} setStatus Function to set status of request
 * @param {string} deadline Deadline for this task
 */
const createTask = async (dispatch, name, repeat, responsibilityId, setStatus, deadline) => {
    /** Create task data to be passed for creation according to whether their is a deadline */
    const taskData = {};
    taskData['name'] = name;
    taskData['repeat'] = repeat;
    if (deadline) taskData['deadline'] = deadline;

    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to create new task for given responsibility */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/responsibilities/${responsibilityId}/create_task/`, taskData,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('Task created and added to responsibility:', response.data);
            await fetchBeastmode(dispatch);
            setStatus({type: 'success', text: TASK_ALERTS.successAdd});
        }).catch(error => {
            console.error('Error creating task and adding to responsibility:', error.response ? error.response.data.error : error.message);
            setStatus({type: 'danger', text: TASK_ALERTS.dangerAdd});
        });
};

/**
 * @description Edit task properties
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} taskId Id of task
 * @param {Object} taskData Data for this task
 * @param {Function} setStatus Function to set status of request
 */
const updateTask = async (dispatch, taskId, taskData, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient patch request to modify properties of given task */
    await apiClient.patch(`${LIFE_MANAGEMENT_DB_BASE}/tasks/${taskId}/`, taskData,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('Task updated:', response.data);
            await fetchBeastmode(dispatch);
            setStatus({type: 'neutral', text: 'Successfully updated task'})
        }).catch(error => {
            console.error('Error updating task:', error.response ? error.response.data : error.message);
            setStatus({type: 'danger', text: error.response.data.error});
        });
};

/** 
 * @description Compute completed tasks for given responsibilities
 * @param {Array<Object>} tasks Tasks for responsibility
 * @returns {number}
 */
const computeCompletedTasks = (tasks) => tasks.reduce((total, current)=>total + (current.subtasks.length ? computeCompletedSubTasks(current.subtasks) === current.subtasks.length ? 1 : 0 : 0), 0);

/** 
 * @description Compute completed subtasks
 * @param {Array<Object} subtasks Subtasks to check
 * @returns {number}
 */
const computeCompletedSubTasks = (subtasks) => subtasks.reduce((total, {completed})=> total + (completed ? 1 : 0), 0);

/**
 * @description Unpack and extract responsibility and task from route parameters
 * @param {Object} route Route Object
 * @param {Object} beastmode Beastmode object
 * @returns {Object}
 */
const extractResponsibilityAndTask = (route, beastmode) => {
    /** Unpack route params */
    const { responsibilityId, taskId } = route.params;

    /** Extract responsibility */
    const responsibility = beastmode.responsibilities.find(({id})=>id === responsibilityId);

    /** Extract task */
    const task = responsibility.tasks.find(({id})=>taskId === id);

    /** Return extracted task and responsibility */
    return { responsibility, task };
};

/**
 * @description Remove task from given responsibility
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} responsibilityId Id of responsibility
 * @param {number} taskId Id of task to delete
 * @param {Function} setStatus Function to set status of request
 */
const removeTask = async (dispatch, responsibilityId, taskId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to delete given task */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/responsibilities/${responsibilityId}/remove_task/`,{
        task_id: taskId,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('Task and its subtasks removed and deleted successfully:', response.data);
        await fetchBeastmode(dispatch);
        setStatus({type: 'neutral', text: TASK_ALERTS.successDelete});
    }).catch(error => {
        console.error('Error removing task from responsibility:', error.response ? error.response.data.error : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Add subtask to given task
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {string} name Name of subtask
 * @param {boolean} duration duration of subtask
 * @param {number} taskId Id of task
 * @param {Function} setStatus Function to set status of request
 */
const addSubTask = async (dispatch, name, duration, taskId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add subtask to task */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/tasks/${taskId}/add_subtask/`,{
        name: name,
        duration: duration,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response =>{
        console.log('SubTask created and added to task successfully:', response.data);
        await fetchBeastmode(dispatch);
        setStatus({type: 'success', text: response.data.message});
    }).catch(error => {
        console.error('Error adding subtask to task:', error.response ? error.response.data.error : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Remove subtask from given task
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} taskId Id of task to delete
 * @param {number} subTaskId Id of subtask to delete
 * @param {Function} setStatus Function to set status of request
 */
const removeSubTask = async (dispatch, taskId, subTaskId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
     /** Make apiClient post request to delete given subtask */
     await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/tasks/${taskId}/remove_subtask/`,{
        subtask_id: subTaskId,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('SubTask removed and deleted successfully:', response.data);
        await fetchBeastmode(dispatch);
        setStatus({type: 'neutral', text: response.data.message});
    }).catch(error => {
        console.error('Error removing subtask from task:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/**
 * @description Mark provided subtask as completed
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} subTaskId Id of subtask to delete
 * @param {Function} setStatus Function to set status of request
 */
const completeSubTask = async (dispatch, subTaskId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient post request to mark subtask as completed */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/subtasks/${subTaskId}/complete/`,{},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('SubTask completed successfully:', response.data);
            await fetchBeastmode(dispatch);
            setStatus({text: response.data.message, type: 'success'});
        }).catch(error => {
            console.error('Error completing subtask:', error.response ? error.response.data : error.message);
            setStatus(error.response ? error.response.data.error : error.message)
        });
};

/**
 * @description Reset responsibilities at the end of the week
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {Function} setStatus Function to set status of request
 */
const resetResponsibilities = async (dispatch, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient post request to reset responsibilities */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/responsibilities/reset/`,{},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('Responsibilities reset successfully:', response.data);
            await fetchBeastmode(dispatch);
            setStatus({type: 'success', text: response.data.message})
        }).catch(error => {
            console.error('Error resetting responsibilities:', error.response ? error.response.data : error.message);
            setStatus(error.response ? error.response.data.error : error.message);
        });
};

/**
 * @description Add subtask to todo list
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} subTaskId Id of subtask to add
 * @param {Function} setStatus Function to set status of request
 */
const addSubTaskToTodoList = async (dispatch, subTaskId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to add subtask to todolist */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/todolists/1/add_subtask/`, {
        subtask_id: subTaskId,
    },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async response => {
        console.log('SubTask added to TodoList successfully:', response.data);
    }).catch(error => {
        console.error('Error adding subtask to TodoList:', error.response ? error.response.data : error.message);
        setStatus(error.response ? error.response.data.error : error.message)
    });
};

/**
 * @description Remove subtask from todo list
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} subTaskId Id of subtask to remove
 * @param {Function} setStatus Function to set status of request
 */
const removeSubTaskFromTodoList = async (dispatch, subTaskId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');

    /** Make apiClient post request to remove given subtask from todo list*/
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/todolists/1/remove_subtask/`,{
       subtask_id: subTaskId,
    },{
        headers: {
           'Authorization': `Bearer ${token}`
       }
    }).then(async response => {
        console.log('SubTask removed from TodoList successfully:', response.data);
        await fetchBeastmode(dispatch);
        setStatus({type: 'neutral', text: response.data.message});
    }).catch(error => {
        console.error('Error removing subtask from TodoList:', error.response ? error.response.data : error.message);
        setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
    });
};

/** 
 * @description Finish hour in todo list
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {number} subTaskId Id of subtask to increment responsibility hours for
 * @param {Function} setStatus Function to set status of request
 */
const finishHourInTodoList = async (dispatch, subTaskId, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
     /** Make apiClient post request to finish hour in todo list */
     await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/todolists/1/finish_hour/`,{
        subtask_id: subTaskId,
     },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })
        .then(async response => {
            console.log('Hour finished successfully:', response.data);
            await fetchBeastmode(dispatch);
            setStatus({type: 'success', text: response.data.message});
        }).catch(error => {
            console.error('Error finishing hour in TodoList:', error.response ? error.response.data : error.message);
            setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
        });
};

/** 
 * @description Reset todo list
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {Function} setStatus Function to set status of request
 */
const resetTodoList = async (dispatch, setStatus) => {
    const token = await SecureStore.getItemAsync('accessToken');
    
    /** Make apiClient post request to reset todo list */
    await apiClient.post(`${LIFE_MANAGEMENT_DB_BASE}/todolists/1/reset/`,{},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            console.log('TodoList reset successfully:', response.data);
            await fetchBeastmode(dispatch);
            setStatus({type: 'success', text: response.data.message});
        }).catch(error => {
            console.error('Error resetting TodoList:', error.response ? error.response.data : error.message);
            setStatus({type: 'danger', text: error.response ? error.response.data.error : error.message});
        });
};

/** 
 * @description Compute duration of task based on subtasks
 * @param {Array<Object>} subtasks Subtasks to compute duration for
 * @returns {string}
 */
const computeTaskDuration = (subtasks) => formatMinutes(subtasks.reduce((total, {duration, completed})=>total + (completed ? 0 : duration), 0));

/**
 * @description Check if subtask belongs in todo list already
 * @param {number} subtaskId Id of subtask to check
 * @param {Array<Object>} todoList Todo list to use for checking
 * @returns {boolean}
 */
const todoListIncludesSubtask = (subtaskId, todoList) => todoList.find(subtask => subtask.id === subtaskId);

/**
 * @description Determine the next subtasks to do based off duration of 60 minutes
 * @param {Array<Object>} todolist Active todo list
 * @returns {Array<Object>}
 */
const computeActiveSubtasks = (todolist) => {
    /** Initialize duration */
    let duration = 0;

    /** Return filtered todo list */
    return todolist.filter((todo)=>!todo.completed).filter(todo=>{
        if (duration < 60) {
            duration += todo.duration;
            return true;
        } else return false;
    });
};

/** 
 * @description Find the responsibility and task associated with given subtask
 * @param {Array<Object>} responsibilities Responsibilities list
 * @param {number} subTaskId Id of sub task
 */
const findSubTaskDetails = (responsibilities, subTaskId) => {
    /** Initialize task and responsibiliity */
    let taskName = null, responsibilityName = null;

    /** Iterate over responsibilities to find task of the given subtask */
    responsibilities.forEach(responsibility => {
        responsibility.tasks.forEach(task => {
            task.subtasks.forEach(subtask => {
                if (subtask.id === subTaskId) {
                    taskName = task.name;
                    responsibilityName = responsibility.name;
                };
            });
        });
    });

    /** Return computed task name and responsibity name */
    return { taskName, responsibilityName };
};

/** 
 * @description Determine total hours by summing all responsibilities
 * @param {Array<Object>} responsibilities Responsibilities to compute total hours from
 * @returns {number}
 */
const computeTotalHours = responsibilities => responsibilities.reduce((total, {hours})=> total + hours, 0);

/** 
 * @description Add all selected subtasks to todo list
 * @async Life management DB is asynchronous
 * @param {Function} dispatch Dispatch function to modify context variables, acting as a mutex
 * @param {Array<Object>} subtasks Subtask to look from
 * @param {Array<number>} selectedSubtasks Index of selected subtasks
 * @param {Function} setStatus Function to set status of request
 */
const addSubtasksToTodoList = async (dispatch, subtasks, selectedSubtasks, setStatus) => {
    /** Add each selected subtask to todo list */
    for (let i = 0; i < subtasks.length; i++) {
        /** Extract subtask */
        const subtask = subtasks[i];
        
        /** Add subtask to todo list if it's a selected subtask */
        if (selectedSubtasks.includes(i)) {
            await addSubTaskToTodoList(dispatch, subtask.id, setStatus);
        };
    };
    await fetchBeastmode(dispatch);
    setStatus({text: 'Successfully added subtasks to Todo List', type: 'success'});
};

/**
 * @description Get responsibility Id for given task
 * @param {Array<Object>} responsibilities All Responsibilities
 * @param {Object} taskId Id of task to find responsibilities Id
 * @returns {number} 
 */
const getResponsibilityId = (responsibilities, taskId) => {
    /** Initialize responsibility Id */
    let responsibilityId = -1;

    /** For each responsibility, check if task belongs */
    responsibilities.forEach(responsibility => {
        if (responsibility.tasks.find(task => task.id === taskId)) responsibilityId = responsibility.id;
    })

    /** Return responsibility Id */
    return responsibilityId;
};

/**
 * @description Get responsibility name for given task
 * @param {Array<Object>} responsibilities All Responsibilities
 * @param {Object} taskId Id of task to find responsibilities Id
 * @returns {string} 
 */
const getResponsibilityName = (responsibilities, taskId) => {
    /** Initialize responsibility Name */
    let responsibilityName;

    /** For each responsibility, check if task belongs */
    responsibilities.forEach(responsibility => {
        if (responsibility.tasks.find(task => task.id === taskId)) responsibilityName = responsibility.name;
    })

    /** Return responsibility Id */
    return responsibilityName;
};

/**
 * @description Utility function to check if two dates are on the same day (ignoring time)
 * @param {Date} date1 First date
 * @param {Date} date2 Second Date
 * @returns {boolean}
 */
const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };
  
/**
 * @description Filter due tasks according to filter type
 * @param {Array<Object>} responsibilities All responsibilities 
 * @param {string} filterType Filter type
 * @returns {Array<Object>}
 */
const filterDates = (responsibilities, filterType) => {
    /** Obtain today's date */
    const today = new Date();
    
    /** Filter out tasks that include a deadline */
    const tasksWithDeadline = [];
    responsibilities.forEach(responsibility => {
        responsibility.tasks.forEach(task => {
            if (task.deadline) tasksWithDeadline.push(task);
        });
    });

    switch (filterType) {
      case upcomingRangeModes.TODAY:
        return tasksWithDeadline.filter(({deadline}) => isSameDay(new Date(deadline), today));
        
      case upcomingRangeModes.ONE_WEEK:
        const oneWeekFromNow = new Date(today);
        oneWeekFromNow.setDate(today.getDate() + 7);
        
        return tasksWithDeadline.filter(({deadline}) => new Date(deadline) >= today && new Date(deadline) <= oneWeekFromNow);
        
      case upcomingRangeModes.ONE_MONTH:
        const oneMonthFromNow = new Date(today);
        oneMonthFromNow.setMonth(today.getMonth() + 1);
        
        return tasksWithDeadline.filter(({deadline}) => new Date(deadline) >= today && new Date(deadline) <= oneMonthFromNow);
        
      case upcomingRangeModes.ALL_TIME:
        return tasksWithDeadline; // No filter applied, return all dates
        
      default:
        return tasksWithDeadline;
    };
};

export {addResponsibility, fetchBeastmode, computeCompletedSubTasks,
    deleteResponsibility, createTask, computeCompletedTasks, removeTask,
    addSubTask, removeSubTask, computeTaskDuration, extractResponsibilityAndTask,
    completeSubTask, resetResponsibilities, addSubTaskToTodoList, removeSubTaskFromTodoList,
    finishHourInTodoList, resetTodoList, todoListIncludesSubtask, computeActiveSubtasks,
    computeTotalHours, findSubTaskDetails, addSubtasksToTodoList, updateTask,
    filterDates, getResponsibilityId, getResponsibilityName,
};