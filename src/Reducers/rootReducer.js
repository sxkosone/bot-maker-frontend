//import cuid from 'cuid';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    scripts: manageScript,
    userAndBot: manageUserAndBot
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
            newCleanPairs = newCleanPairs.map(pair => {
                if(typeof pair.response === "string") {
                    debugger
                    pair.response = pair.response.split("//")
                }
                return pair
            })
            return newCleanPairs
        default:
            return state
    }
}

function manageUserAndBot(state = {
    botName: ""
}, action) {
    //console.log("received in the username and botname reducer:", action)

    switch(action.type) {
        case "ADD_BOTNAME":
        return {...state, botName: action.botName}
    default:
        return state
    }
}