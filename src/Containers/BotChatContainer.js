import React from 'react';
import { connect } from 'react-redux';
import MessageHistory from './MessageHistory';
import { Link } from 'react-router-dom';
import { Form, Button, Icon } from 'semantic-ui-react';


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

    render() {
        return(
        <div className="botChatContainer">
            <h2>{this.props.botName === "" ? "Chat with your bot" : `Chat with ${this.props.botName} the bot`}</h2>
            <p>Send messages to your bot to see how your scripts are working! Please note that this is a developmental chat view - the default scripts are not available until you save the bot.</p>
            <MessageHistory history={this.state.messageHistory}/>
            <Form onSubmit={this.handleUserSend}>
            <Form.Group>
                <Form.Input type="text" value={this.state.userInput} onChange={this.handleUserTyping} action={<Form.Input type="submit" value="Send" />}/>
                
                </Form.Group>
            </Form>
            <Button.Group className="Buttons">
                <Button primary as={ Link } to="/create"><Icon name="arrow left"/>Back to editing</Button>
                <Button color="green" as={ Link } to="/save-bot">My bot is ready<Icon name="arrow right"/></Button>
            </Button.Group>
        </div>

        )
    }
}

//you may have to change this to retrieving from LocalStorage!!
const mapStateToProps = state => {
    return {
        scripts: state.scripts.scripts,
        botName: state.userAndBot.botName
    }
}

export default connect(mapStateToProps)(BotChatContainer);