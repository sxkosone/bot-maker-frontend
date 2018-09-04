//import cuid from 'cuid';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    scripts: manageScript,
    userAndBot: manageUserAndBot,
    messages: manageMessages
});

export default rootReducer;

function manageScript(state = [], action) {
    //stores an array of trigger-response objects
    //console.log("received in the script reducer:", action)
    switch(action.type) {
        case "ADD_MANY_NEW_PAIRS":
            //take in an array of trigger-response objects, like this
            //[{trigger:"hi", response: ["hii", "hi to you"]}, {trigger: "bye", response: ["byebye", "bai"]}]
            let newCleanPairs = action.newPairs.filter(pair => pair.trigger)
            //this operation should be now unnecessary since the pairs are already formatted correctly to hold strings
            // newCleanPairs = newCleanPairs.map(pair => {
            //     if(typeof pair.response === "string") {
            //         debugger
            //         pair.response = pair.response.split("//")
            //     }
            //     return pair
            // })
            return newCleanPairs
        default:
            return state
    }
}

function manageUserAndBot(state = {
    botName: "",
    currentUser: null
}, action) {
    switch(action.type) {
        case "ADD_BOTNAME":
            return {...state, botName: action.botName}
        case "LOG_IN":
            return {...state, currentUser: action.currentUser}
        case "LOG_OUT":
            return {...state, currentUser: null}
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