//import cuid from 'cuid';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    scripts: manageScript,
    userAndBot: manageUserAndBot,
    messages: manageMessages
});

export default rootReducer;

function manageScript(state = {
    includeDefaultScripts: true,
    scripts: []
}, action) {
    //stores an array of trigger-response objects
    //console.log("received in the script reducer:", action)
    switch(action.type) {
        case "ADD_MANY_NEW_PAIRS":
            //take in an array of trigger-response objects, like this
            //[{trigger:"hi", response: ["hii", "hi to you"]}, {trigger: "bye", response: ["byebye", "bai"]}]
            let newCleanPairs = action.newPairs.filter(pair => pair.trigger)
            return {...state, scripts: newCleanPairs}
        case "ADD_INCLUDE_DEFAULT_SCRIPTS":
            return {...state, includeDefaultScripts: action.selection}
        case "CLEAR_SCRIPTS":
            return {includeDefaultScripts: true, scripts: []}
        default:
            return state
    }
}

function manageUserAndBot(state = {
    botName: "",
    botUrl: "",
    currentUser: null
}, action) {
    switch(action.type) {
        case "ADD_BOTNAME":
            return {...state, botName: action.botName}
        case "ADD_BOT_URL":
            return {...state, botUrl: action.url}
        case "LOG_IN":
            return {...state, currentUser: action.currentUser}
        case "LOG_OUT":
            return {...state, currentUser: null}
        case "CLEAR_SCRIPTS":
            return { ...state, botName: ""}
        default:
            return state
    }
}

function manageMessages(state= {
    error: "",
    info: ""
}, action) {
    switch(action.type) {
        case "ADD_ERROR_MESSAGE":
            return {...state, error: action.error}
        case "ERASE_ERROR_MESSAGE":
            return {...state, error: ""}
        case "ADD_INFO_MESSAGE":
            return {...state, info: action.info}
        case "ERASE_INFO_MESSAGE":
            return {...state, info: ""}
        default:
            return state
    }
}