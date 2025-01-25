/** Alert Messages for responsibilities */
const RESPONSIBILITY_ALERTS = {
    successAdd: 'Successfully added responsibility',
    dangerAdd: 'Failed to add responsibility',
    successDelete: 'Successfully deleted responsibility',
    dangerDelete: 'Failed to delete responsibility'
};

/** Alert Messages for tasks */
const TASK_ALERTS = {
    successAdd: 'Successfully added task',
    dangerAdd: 'Failed to add task',
    successDelete: 'Successfully deleted task',
    dangerDelete: 'Failed to delete task',
};

/** Alert Messages for subtasks */
const SUBTASKS_ALERTS = {
    successAdd: 'Successfully added subtask',
    dangerAdd: 'Failed to add subtask',
    successDelete: 'Successfully deleted subtask',
    dangerDelete: 'Failed to delete subtask',
};

/** 
 * @description Operation modes for responsibility screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation ADD_MODE Mode where dialog for adding task is displayed
 * @variation DELETE_MODE Mode where user deletes task
 */
const responsibilityModes = {
    IDLE_MODE: -1,
    ADD_MODE: 0,
    DELETE_MODE: 1,
};

/** 
 * @description Operation modes for task screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation ADD_MODE Mode where dialog for adding subtask is displayed
 * @variation DELETE_MODE Mode where user deletes subtask
 * @variation EDIT_MODE Mode where user edits task
 */
const taskModes = {
    IDLE_MODE: -1,
    ADD_MODE: 0,
    DELETE_MODE: 1,
    EDIT_MODE: 2,
};

/** 
 * @description Operation modes for todo list screen
 * @variation IDLE_MODE Mode where no operation mode is active
 * @variation ADD_MODE Mode where dialog for adding subtask is displayed
 * @variation DELETE_MODE Mode where user removes subtask
 * @variation START_HOUR Mode where user is working on active hour
 */
const todoModes = {
    IDLE_MODE: -1,
    ADD_MODE: 0,
    DELETE_MODE: 1,
    START_HOUR: 2,
};

/** 
 * @description Range modes for upcoming due tasks
 * @variation TODAY Tasks due today
 * @variation ONE_WEEK Tasks due one week from today
 * @variation ONE_MONTH Tasks due one month from today
 * @variation ALL_TIME All due tasks
 */
const upcomingRangeModes = {
    TODAY: 'Today',
    ONE_WEEK: 'This week',
    ONE_MONTH: 'This month',
    ALL_TIME: 'All Due',
};

export {RESPONSIBILITY_ALERTS, TASK_ALERTS, responsibilityModes, SUBTASKS_ALERTS, taskModes, todoModes, upcomingRangeModes};
