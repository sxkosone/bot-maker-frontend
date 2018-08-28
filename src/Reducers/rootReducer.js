import cuid from 'cuid';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    triggers: manageTriggers,
    responses: manageResponses
});

export default rootReducer;

function manageTriggers(state = []
    , action) {
        console.log("received in the manageTriggers reducer:", action)
        switch(action.type) {
            case "ADD_TRIGGER":
                const newTrigger = { text: action.trigger, id: cuid()}
                return [...state, newTrigger]
            case "DELETE_TRIGGER":
                return state.filter(trigger => trigger.id !== action.id)
            default:
                return state
        }
}

function manageResponses(state = []
    , action) {
        console.log("received in the manageResponses reducer:", action)
        switch(action.type) {
            case "ADD_RESPONSE":
                const newResponse = { text: action.response, triggerId: action.triggerId, id: cuid()}
                return [...state, newResponse]
            case "DELETE_TRIGGER":
                return state.filter(response => response.id !== action.id)
            default:
                return state
        }
}