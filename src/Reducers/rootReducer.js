//import cuid from 'cuid';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    scripts: manageScript,
    userAndBot: manageUserAndBot
    // triggers: manageTriggers,
    // responses: manageResponses
});

export default rootReducer;

function manageScript(state = [], action) {
    //stores an array of trigger-response objects
    console.log("received in the script reducer:", action)
    switch(action.type) {
        case "ADD_NEW_PAIR":
            const newTrigger = action.trigger
            const newResponses = action.responses
            const newPair = {trigger: newTrigger, response: newResponses}
            return [...state, newPair]
        case "ADD_MANY_NEW_PAIRS":
            //take in an array of trigger-response objects, like this
            //[{trigger:"hi", response: ["hii", "hi to you"]}, {trigger: "bye", responses: ["byebye", "bai"]}]
            let newCleanPairs = action.newPairs.filter(pair => pair.trigger !== "")
            return [...newCleanPairs]
            //return [...action.newPairs]
        default:
            return state
    }
}

function manageUserAndBot(state = {
    botName: ""
}, action) {
    switch(action.type) {
        case "ADD_BOTNAME":
        return {...state, botName: action.botName}
    default:
        return state
    }
}

//these may not be necessary anymore!!
// function manageTriggers(state = []
//     , action) {
//         console.log("received in the manageTriggers reducer:", action)
//         switch(action.type) {
//             case "ADD_TRIGGER":
//                 const newTrigger = { text: action.trigger, id: cuid()}
//                 return [...state, newTrigger]
//             case "DELETE_TRIGGER":
//                 return state.filter(trigger => trigger.id !== action.id)
//             default:
//                 return state
//         }
// }

// function manageResponses(state = []
//     , action) {
//         console.log("received in the manageResponses reducer:", action)
//         switch(action.type) {
//             case "ADD_RESPONSE":
//                 const newResponse = { text: action.response, triggerId: action.triggerId, id: cuid()}
//                 return [...state, newResponse]
//             case "DELETE_TRIGGER":
//                 return state.filter(response => response.id !== action.id)
//             default:
//                 return state
//         }
// }