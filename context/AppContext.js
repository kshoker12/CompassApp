import * as react from "react";
import { FINANCE_ACTIONS } from "./actions/financeActions";
import financesReducer from "./reducers/financeReducer";
import AppReducer from "./reducers/defaultReducer";
import { LIFE_ULTIMATE_TEAM_ACTIONS } from "./actions/lifeUltimateTeamActions";
import { DREAMS_ACTIONS } from './actions/dreamActions';
import lifeUltimateTeamReducer from "./reducers/lifeUltimateTeamReducer";
import dreamReducer from "./reducers/dreamReducer";
import { SOLUTION_ACTIONS } from './actions/solutionActions';
import solutionReducer from './reducers/solutionReducer';
import { BEAST_MODE_ACTIONS } from './actions/beastmodeActions';
import beastmodeReducer from './reducers/beastmodeReducer';
import dietTrackerReducer from './reducers/dietTrackerReducer';
import { DIET_TRACKER_ACTIONS } from "./actions/dietTrackerActions";
import { COMPASS_ACTIONS } from "./actions/compassActions";
import compassReducer from "./reducers/compassReducer";

/**
 * @description Root reducer for the app, linking all reducers together and propagating action
 * to correct reducer based on action class
 * @param {Object} state State of application including all context variables
 * @param {Object} action Action to be carried out
 * @returns {Object}
 */
const RootReducer = (state, action) => {
    switch (action.class) {
        case FINANCE_ACTIONS: return financesReducer(state, action);
        case LIFE_ULTIMATE_TEAM_ACTIONS: return lifeUltimateTeamReducer(state, action);
        case DREAMS_ACTIONS: return dreamReducer(state, action);
        case SOLUTION_ACTIONS: return solutionReducer(state, action);
        case BEAST_MODE_ACTIONS: return beastmodeReducer(state, action);
        case DIET_TRACKER_ACTIONS: return dietTrackerReducer(state, action);
        case COMPASS_ACTIONS: return compassReducer(state, action);
        default: return AppReducer(state, action);
    };
};


// Sets the initial state when the app loads
const initialState = {
    password: "Hidden",
    appPassword: "Hidden",
    solutions: [],
    dreams: [],
    dietTracker:{},
    resp: {
        hours: 14, 
        completedTasks: 0,
        totalTasks: 14,
        responsibilities:  [
            {
                id: 0,
                name: "Training",
                hours: 4, 
                completedTasks: 0,
                totalTasks: 7,
                tasks: [
                    {
                        id: 0, 
                        self_id: 0,
                        name: "Monday Training", 
                        completed: false, 
                        completedTasks: 0,
                        totalTasks: 3,
                        repeat: true,
                        subTasks: [
                            {
                                id: 0,
                                self_id: 0,
                                name: "Boxing",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 0,
                                self_id: 1,
                                name: "Cardio",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 0,
                                self_id: 2,
                                name: "Boxing Film Study",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 0, 
                        self_id: 1,
                        name: "Tuesday Training", 
                        completedTasks: 0,
                        totalTasks: 3,
                        completed: false, 
                        repeat: true,
                        subTasks: [
                            {
                                id: 1,
                                self_id: 0,
                                name: "Boxing",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 1,
                                self_id: 1,
                                name: "Cardio",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 1,
                                self_id: 2,
                                name: "Boxing Film Study",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 0, 
                        self_id: 2,
                        name: "Wednesday Training", 
                        completedTasks: 0,
                        totalTasks: 3,
                        completed: false,
                        repeat: true,
                        subTasks: [
                            {
                                id: 2,
                                self_id: 0,
                                name: "Boxing",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 2,
                                self_id: 1,
                                name: "Cardio",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 2,
                                self_id: 2,
                                name: "Boxing Film Study",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 0, 
                        self_id: 3,
                        name: "Thursday Training", 
                        completedTasks: 0,
                        totalTasks: 3,
                        completed: false, 
                        repeat: true,
                        subTasks: [
                            {
                                id: 3,
                                self_id: 0,
                                name: "Boxing",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 3,
                                self_id: 1,
                                name: "Cardio",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 3,
                                self_id: 2,
                                name: "Boxing Film Study",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 0, 
                        self_id: 4,
                        name: "Friday Training", 
                        completedTasks: 0,
                        totalTasks: 3,
                        completed: false, 
                        repeat: true,
                        subTasks: [
                            {
                                id: 4,
                                self_id: 0,
                                name: "Boxing",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 4,
                                self_id: 1,
                                name: "Cardio",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 4,
                                self_id: 2,
                                name: "Boxing Film Study",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 0, 
                        self_id: 5,
                        name: "Saturday Training", 
                        completedTasks: 0,
                        totalTasks: 3,
                        completed: false, 
                        repeat: true,
                        subTasks: [
                            {
                                id: 5,
                                self_id: 0,
                                name: "Boxing",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 5,
                                self_id: 1,
                                name: "Cardio",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 5,
                                self_id: 2,
                                name: "Boxing Film Study",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 0, 
                        self_id: 6,
                        name: "Sunday Training", 
                        completedTasks: 0,
                        totalTasks: 3,
                        completed: false, 
                        repeat: true,
                        subTasks: [
                            {
                                id: 6,
                                self_id: 0,
                                name: "Boxing",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 6,
                                self_id: 1,
                                name: "Cardio",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 6,
                                self_id: 2,
                                name: "Boxing Film Study",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                ]
            },
            {
                id: 1,
                name: "Career", 
                hours: 6,
                completedTasks: 0,
                totalTasks: 2,
                tasks: [
                    {
                        id: 1, 
                        self_id: 0,
                        name: "Signify", 
                        completedTasks: 0,
                        totalTasks: 1,
                        completed: false, 
                        repeat: false,
                        subTasks: [
                            {
                                id: 0,
                                self_id: 0,
                                name: "3D Visualizer",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 1, 
                        self_id: 1,
                        name: "Compass App", 
                        completedTasks: 0,
                        totalTasks: 3,
                        completed: false, 
                        repeat: false,
                        subTasks: [
                            {
                                id: 1,
                                self_id: 0,
                                name: "Budget",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 1,
                                self_id: 1,
                                name: "Todo List",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 1,
                                self_id: 2, 
                                name: "Compass",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                ]
            },
            {
                id: 2, 
                name: "Lifestyle", 
                hours: 3,
                completedTasks: 0,
                totalTasks: 4,
                tasks: [
                    {
                        id: 2, 
                        self_id: 0,
                        name: "Chess Session", 
                        completedTasks: 0,
                        totalTasks: 7,
                        completed: false, 
                        repeat: true,
                        subTasks: [
                            {
                                id: 0,
                                self_id: 0, 
                                name: "Monday Chess",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 0,
                                self_id: 1,
                                name: "Tuesday Chess",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 0,
                                self_id: 2,
                                name: "Wednesday Chess",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 0,
                                self_id: 3,
                                name: "Thursday Chess",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 0,
                                self_id: 4,
                                name: "Friday Chess",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 0,
                                self_id: 5,
                                name: "Saturday Chess",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 0,
                                self_id: 6,
                                name: "Sunday Chess",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 2, 
                        self_id: 1,
                        name: "Solutions", 
                        completedTasks: 0,
                        totalTasks: 7,
                        completed: false, 
                        repeat: true,
                        subTasks: [
                            {
                                id: 1,
                                self_id: 0,
                                name: "Monday Solutions",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 1,
                                self_id: 1,
                                name: "Tuesday Solutions",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 1,
                                self_id: 2,
                                name: "Wednesday Solutions",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 1,
                                self_id: 3,
                                name: "Thursday Solutions",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 1,
                                self_id: 4,
                                name: "Friday Solutions",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 1,
                                self_id: 5,
                                name: "Saturday Solutions",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 1,
                                self_id: 6,
                                name: "Sunday Solutions",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 2, 
                        self_id: 2,
                        name: "Meditation", 
                        completedTasks: 0, 
                        totalTasks: 7,
                        completed: false, 
                        repeat: true,
                        subTasks: [
                            {
                                id: 2,
                                self_id: 0,
                                name: "Monday Meditation",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 2,
                                self_id: 1,
                                name: "Tuesday Meditation",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 2,
                                self_id: 2,
                                name: "Wednesday Meditation",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 2,
                                self_id: 3,
                                name: "Thursday Meditation",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 2,
                                self_id: 4,
                                name: "Friday Meditation",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 2,
                                self_id: 5,
                                name: "Saturday Meditation",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 2,
                                self_id: 6,
                                name: "Sunday Meditation",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                    {
                        id: 2, 
                        self_id: 3,
                        name: "Values4Success", 
                        completed: false,
                        repeat: true,
                        completedTasks: 0, 
                        totalTasks: 3,
                        subTasks: [
                            {
                                id: 3,
                                self_id: 0,
                                name: "Monday Post",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 3,
                                self_id: 1,
                                name: "Wednesday Post",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 3,
                                self_id: 2,
                                name: "Friday Post",
                                completed: false,
                                duration: 60
                            },
                        ]
                    },
                ]
            },
            {
                id: 3,
                name: "Money-Making", 
                hours: 1,
                completedTasks: 0,
                totalTasks: 1,
                tasks: [
                    {
                        id: 3, 
                        self_id: 0,
                        name: "Stock Research", 
                        completed: false, 
                        repeat: true,
                        completedTasks: 0, 
                        totalTasks: 7,
                        subTasks: [
                            {
                                id: 0,
                                self_id: 0,
                                name: "Monday Stocks",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 0,
                                self_id: 1,
                                name: "Tuesday Stocks",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 0,
                                self_id: 2,
                                name: "Wednesday Stocks",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 0,
                                self_id: 3,
                                name: "Thursday Stocks",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 0,
                                self_id: 4,
                                name: "Friday Stocks",
                                completed: false,
                                duration: 60
                            }, 
                            {
                                id: 0,
                                self_id: 5,
                                name: "Saturday Stocks",
                                completed: false,
                                duration: 60
                            },
                            {
                                id: 0,
                                self_id: 6,
                                name: "Sunday Stocks",
                                completed: false,
                                duration: 60
                            }
                        ]
                    },
                ]
            }
        ]
    },
    todo: {
        completedTasks: 0,
        totalTasks: 0,
        hoursCompleted: 0, 
        todoList: [

        ]
    },
    compass: {
        percentage: -1, 
        titleDefences: 0, 
        champion: true,
        mistakes: 3,
        count: 0,
        active: false,
        earned: 0,
        total: 55,
        weeksCompleted: 0, 
        index: {year_id: 0, month_id: 0, week_id: 0},
        yearlyCompass: [
            {
                id: 0, 
                year: 2023,
                percentage: -1,
                completed: false,
                yearlyDestinations: [
                    {id: 0, year_id: 0, name: "3-0 Boxing", text: "", completed: false},
                    {id: 1, year_id: 0, name: "3D-Visualizer", text: "", completed: false},
                    {id: 2, year_id: 0, name: "$10k", text: "", completed: false},
                ],
                monthlyCompass: [
                    {
                        id: 0,
                        year_id: 0,
                        name: "December",
                        completed: false,
                        percentage: -1,
                        monthlyDestinations: [
                            {id: 0, month_id: 0, name: "3-0 Boxing", text: "", completed: false},
                            {id: 1, month_id: 0, name: "3D-Visualizer", text: "", completed: false},
                            {id: 2, month_id: 0, name: "$10k", text: "", completed: false},
                        ],
                        weeklyCompass: [
                            {
                                id: 0,
                                month_id: 0, 
                                completed: false,
                                percentage: -1,
                                hours: -1,
                                destinations: [
                                    {id: 0, week_id: 0, name: "", earned: -1, points: 10, completed: false, text: ""},
                                    {id: 1, week_id: 0, name: "", earned: -1, points: 9, completed: false, text: ""},
                                    {id: 2, week_id: 0, name: "", earned: -1, points: 8, completed: false, text: ""},
                                    {id: 3, week_id: 0, name: "", earned: -1, points: 7, completed: false, text: ""},
                                    {id: 4, week_id: 0, name: "", earned: -1, points: 6, completed: false, text: ""},
                                    {id: 5, week_id: 0, name: "", earned: -1, points: 5, completed: false, text: ""},
                                    {id: 6, week_id: 0, name: "", earned: -1, points: 4, completed: false, text: ""},
                                    {id: 7, week_id: 0, name: "", earned: -1, points: 3, completed: false, text: ""},
                                    {id: 8, week_id: 0, name: "", earned: -1, points: 2, completed: false, text: ""},
                                    {id: 9, week_id: 0, name: "", earned: -1, points: 1, completed: false, text: ""},
                                ]
                            },
                            {
                                id: 1,
                                month_id: 0, 
                                completed: false,
                                percentage: -1,
                                hours: -1,
                                destinations: [
                                    {id: 0, week_id: 1, name: "", earned: -1, points: 10, completed: false, text: ""},
                                    {id: 1, week_id: 1, name: "", earned: -1, points: 9, completed: false, text: ""},
                                    {id: 2, week_id: 1, name: "", earned: -1, points: 8, completed: false, text: ""},
                                    {id: 3, week_id: 1, name: "", earned: -1, points: 7, completed: false, text: ""},
                                    {id: 4, week_id: 1, name: "", earned: -1, points: 6, completed: false, text: ""},
                                    {id: 5, week_id: 1, name: "", earned: -1, points: 5, completed: false, text: ""},
                                    {id: 6, week_id: 1, name: "", earned: -1, points: 4, completed: false, text: ""},
                                    {id: 7, week_id: 1, name: "", earned: -1, points: 3, completed: false, text: ""},
                                    {id: 8, week_id: 1, name: "", earned: -1, points: 2, completed: false, text: ""},
                                    {id: 9, week_id: 1, name: "", earned: -1, points: 1, completed: false, text: ""},
                                ]
                            },
                            {
                                id: 2,
                                month_id: 0, 
                                completed: false,
                                percentage: -1,
                                hours: -1,
                                destinations: [
                                    {id: 0, week_id: 2, name: "", earned: -1, points: 10, completed: false, text: ""},
                                    {id: 1, week_id: 2, name: "", earned: -1, points: 9, completed: false, text: ""},
                                    {id: 2, week_id: 2, name: "", earned: -1, points: 8, completed: false, text: ""},
                                    {id: 3, week_id: 2, name: "", earned: -1, points: 7, completed: false, text: ""},
                                    {id: 4, week_id: 2, name: "", earned: -1, points: 6, completed: false, text: ""},
                                    {id: 5, week_id: 2, name: "", earned: -1, points: 5, completed: false, text: ""},
                                    {id: 6, week_id: 2, name: "", earned: -1, points: 4, completed: false, text: ""},
                                    {id: 7, week_id: 2, name: "", earned: -1, points: 3, completed: false, text: ""},
                                    {id: 8, week_id: 2, name: "", earned: -1, points: 2, completed: false, text: ""},
                                    {id: 9, week_id: 2, name: "", earned: -1, points: 1, completed: false, text: ""},
                                ]
                            },
                            {
                                id: 3,
                                month_id: 0, 
                                completed: false,
                                percentage: -1,
                                hours: -1,
                                destinations: [
                                    {id: 0, week_id: 3, name: "", earned: -1, points: 10, completed: false, text: ""},
                                    {id: 1, week_id: 3, name: "", earned: -1, points: 9, completed: false, text: ""},
                                    {id: 2, week_id: 3, name: "", earned: -1, points: 8, completed: false, text: ""},
                                    {id: 3, week_id: 3, name: "", earned: -1, points: 7, completed: false, text: ""},
                                    {id: 4, week_id: 3, name: "", earned: -1, points: 6, completed: false, text: ""},
                                    {id: 5, week_id: 3, name: "", earned: -1, points: 5, completed: false, text: ""},
                                    {id: 6, week_id: 3, name: "", earned: -1, points: 4, completed: false, text: ""},
                                    {id: 7, week_id: 3, name: "", earned: -1, points: 3, completed: false, text: ""},
                                    {id: 8, week_id: 3, name: "", earned: -1, points: 2, completed: false, text: ""},
                                    {id: 9, week_id: 3, name: "", earned: -1, points: 1, completed: false, text: ""},
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    lifeUltimateTeam: {},
    finances: {
        assets: [
            {
                id: 1, 
                name: "MacBook Pro M3 chip 14'",
                value: 2600,
            },
            {
                id: 2,
                name: 'Lego Ferrari Daytona SP3',
                value: 550
            }
        ],
        stockPrices: [],
        savings: [
            {
                id: 1, 
                name: 'Hemkund Sahib Trip',
                savedAmount: 300,
                goal: 3000
            },
            {
                id: 2,
                name: 'Treadmill',
                savedAmount: 400,
                goal: 1500
            },
            {
                id: 3,
                name: 'College Fees',
                savedAmount: 500,
                goal: 4500
            }
        ],
        stocks: [
            {
                id: 1,
                name: 'Tesla Inc',
                code: 'TSLA',
                icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThuS3-d1gH9cDSi072QcNFICjLdH60esKagA&s',
                quantity: 8,
                price: 207.67
            },
            {
                id: 2,
                name: 'Vanguard S&P 500 ETF',
                code: 'VOO',
                icon:  null,
                quantity: 11,
                price: 489.76
            },
            {
                id: 3,
                name: 'GraniteShares 1.25x Long Tesla Daily ETF',
                code: 'TSL',
                icon: null,
                quantity: 13,
                price: 8.21
            },
            {
                id: 4,
                name: 'NVIDIA Corp',
                code: 'NVDA',
                icon: 'https://cdn.prod.website-files.com/63f6e52346a353ca1752970e/644fb7a52156f63ce1fc3254_20230501T1259-761207c6-5c2d-4489-b10a-5af0d73cb454.jpeg',
                quantity: 4,
                price: 102.27
            },
            {
                id: 5,
                name: 'NIO Inc',
                code: 'NIO',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/3/30/NIO_logo_emblem.svg',
                quantity: 2,
                price: 4.06
            },
            {
                id: 6,
                name: 'Amazon.com Inc.',
                code: 'AMZN',
                icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8WU0Emt19dyXiCPIuhVtxIFbqx13mkj54hA&s',
                quantity: 3,
                price: 167.90
            },
        ],
        expenses: [
            {
                id: 1,
                name: 'Boxing',
                amountAllocated: 400,
                icon: 'https://icons.iconarchive.com/icons/icons-land/sport/256/Boxing-Gloves-icon.png',
                transactions: [1, 2]
            },
            {
                id: 2,
                name: 'Food',
                amountAllocated: 200,
                icon: 'https://icons.veryicon.com/png/o/food--drinks/yoga-flat-icon/healthy-food.png',
                transactions: [3, 4]
            },
            {
                id: 3,
                name: 'Gas',
                amountAllocated: 200,
                icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933873.png',
                transactions: [5, 6]
            },
            {
                id: 4, 
                name: 'Subscriptions',
                amountAllocated: 100,
                icon: 'https://cdn-icons-png.flaticon.com/512/6662/6662872.png',
                transactions: [7, 8]
            },
            {
                id: 5,
                name: 'Extra',
                amountAllocated: 300,
                icon: 'https://cdn-icons-png.flaticon.com/512/10438/10438417.png',
                transactions: [9, 10]
            },
        ],
        transactions: [
            {
                id: 1,
                name: 'Gym Fees',
                cost: 150.00,
                date: 'September, 8, 2024'
            },
            {
                id: 2,
                name: 'New Headgear',
                cost: 100.00,
                date: 'September, 10, 2024',
            },
            {
                id: 3,
                name: 'Chopped Leaf',
                cost: 14.30,
                date: 'September, 13, 2024'
            },
            {
                id: 4,
                name: 'Chopped Leaf',
                cost: 18.00,
                date: 'September, 18, 2024'
            },
            {
                id: 5,
                name: 'Gas Refill',
                cost: 20.00,
                date: 'September, 18, 2024'
            },
            {
                id: 6,
                name: 'Gas Refill',
                cost: 40.00,
                date: 'September, 20, 2024'
            },
            {
                id: 7,
                name: 'Coursera',
                cost: 60.00,
                date: 'September, 22, 2024'
            },
            {
                id: 8,
                name: 'ChatGpt Premium',
                cost: 30.00,
                date: 'September, 24, 2024'
            },
            {
                id: 9, 
                name: 'Table Amazon',
                cost: 44,
                date: 'September, 25, 2024',
            },
            {
                id: 10,
                name: 'Car Detail',
                cost: 100,
                date: 'September, 26, 2024'
            }
        ],
        creditCards: [
            {
                id: 1, 
                name: 'BMO Credit Card',
                limit: 1500,
                availableCredits: 1300,
                amountOwed: 200,
                transactions: [1, 2, 4]
            }
        ],
        debitCards: [
            {
                id: 1,
                name: 'Wealth Simple Cash',
                available: 1300,
                transactions: [3, 5, 6, 7],
                savings: 0
            },
            {
                id: 2, 
                name: 'BMO Debit Card',
                available: 300,
                transactions: [8, 9, 10],
                savings: 0
            }
        ],
        paycheques: [
            {
                id: 1,
                amount: 1000,
                date: 'September, 14, 2023',
                name: 'Karandeep Shoker',
                text: 'One Thousand',
                memo: 'Bi-weekly paycheque',
                signature: 'KS'
            },
            {
                id: 2,
                amount: 2000,
                date: 'September, 28, 2023',
                name: 'Karandeep Shoker',
                text: 'Two Thousand',
                memo: 'Bi-weekly paycheque',
                signature: 'KS'
            },
            {
                id: 3,
                amount: 1400,
                date: 'October, 14, 2023',
                name: 'Karandeep Shoker',
                text: 'One Thousand Four Hundred',
                memo: 'Bi-weekly paycheque',
                signature: 'KS'
            },
            {
                id: 4,
                amount: 1300,
                date: 'October, 28, 2023',
                name: 'Karandeep Shoker',
                text: 'One Thousand Three Hundred',
                memo: 'Bi-weekly paycheque',
                signature: 'KS'
            },
            {
                id: 5,
                amount: 1500,
                date: 'November, 15, 2023',
                name: 'Karandeep Shoker',
                text: 'One Thousand Five Hundred',
                memo: 'Bi-weekly paycheque',
                signature: 'KS'
            },
            {
                id: 6,
                amount: 1700,
                date: 'November, 28, 2023',
                name: 'Karandeep Shoker',
                text: 'One Thousand Seven Hundred',
                memo: 'Bi-weekly paycheque',
                signature: 'KS'
            }
        ]
    }
};

/** Creates the context this is the thing our components import and use to get the state */
 const AppContext = react.createContext();

/** Provider component - wraps the components we want to give access to the state 
Accepts the children, which are the nested(wrapped) components */
 const AppProvider = (props) => {
    /** Sets up the app state. takes a reducer, and an initial state */
    const [state, dispatch] = react.useReducer(RootReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                password: state.password,
                appPassword: state.appPassword,
                resp: state.resp,
                todo: state.todo,
                compass: state.compass,
                dietTracker: state.dietTracker,
                solutions: state.solutions,
                dreams: state.dreams,
                finances: state.finances,
                lifeUltimateTeam: state.lifeUltimateTeam,
                beastmode: state.beastmode,
                dispatch
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider};

