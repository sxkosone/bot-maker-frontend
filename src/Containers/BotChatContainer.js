import React from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import MessageHistory from './MessageHistory';
import {Link} from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';


class BotChatContainer extends React.Component {
    state = {
        userInput: "",
        messageHistory: [] //should hold message objects like so: [{sender: "human", text: "blabla"}, {sender: "bot", text:"blah"}]
    }
    handleUserTyping = (e) => {
        this.setState({
            userInput: e.target.value
        })
    }
    handleUserSend = (e) => {
        e.preventDefault()
        const userMessage = this.state.userInput
        this.setState({
            userInput: "",
            messageHistory: this.state.messageHistory.concat({sender: "human", text: this.state.userInput})
        })
        setTimeout(() => this.makeBotResponse(userMessage), 1500)
    }
    makeBotResponse = (userMessage) => {
        const cleanUserMessage = userMessage.replace(/\s/g,'').toLowerCase()
        //if no match, output default message "I don't understand"
        let botResponse = "I don't understand :("
        //check if any trigger words match latest user message
        this.props.scripts.forEach(pair => {
            const cleanTrigger = pair.trigger.replace(/\s/g,'').toLowerCase()
            //if find match, choose one from the array of responses
            if(cleanTrigger === cleanUserMessage) {
                //choose random response
                //response will hold a string at this point, split it into parts
                //let responses = pair.response.split("//")
                let randomI = Math.floor(Math.random()*pair.response.length);
                botResponse = pair.response[randomI]
            }
        })
        //push a new bot message into the state.messageHistory
        this.setState({
            messageHistory: [...this.state.messageHistory, {sender: "bot", text: botResponse}]
        })
    } 

    //testing fetch here
    saveUserAndBot = () => {
        console.log(this.props.scripts)
        const user = {
            username: "test2", 
            bot_name: this.props.botName,
            bot_url_id: cuid()
            //still expecting triggers: [{text:"hi", responses: ["hi!", "hey"]}]
        }
        user.triggers = this.props.scripts.map(pair => {
            //map array of response-strings to array of response-objects with a key of text
            //const newResponses = pair.response.split("//").map(response => ( {text: response} ))
            //new attempt at shape of state
            const newResponses = pair.response.map(response => ( {text: response} ))
            const newTrigger = { text: pair.trigger, responses: newResponses }
            return newTrigger
        })
        console.log("user has this trigger-key", user.triggers)
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({"user": user})})
            .then(r => r.json())
            .then(console.log)
            .catch(error => error.json()).then(console.log)
    }

    render() {
        return(
        <div className="botChatContainer">
            <h2>{this.props.botName === "" ? "Chat with your bot" : `Chat with ${this.props.botName} the bot`}</h2>
            <MessageHistory history={this.state.messageHistory}/>
            <Form onSubmit={this.handleUserSend}>
            <Form.Group>
                <Form.Input type="text" value={this.state.userInput} onChange={this.handleUserTyping}/>
                <Form.Input type="submit" value="Send" />
                </Form.Group>
            </Form>
            <Button as={ Link } to="/create">Back to the drawing board</Button>
            <Button onClick={this.saveUserAndBot}>Awesome, save my bot to the database</Button>
        </div>

        )
    }
}

//you will have to change this to retrieving from LocalStorage!!
const mapStateToProps = state => {
    return {
        scripts: state.scripts,
        botName: state.userAndBot.botName
    }
}

export default connect(mapStateToProps)(BotChatContainer);