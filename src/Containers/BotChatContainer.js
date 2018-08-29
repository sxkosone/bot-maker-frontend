import React from 'react';
import { connect } from 'react-redux';
import MessageHistory from './MessageHistory';

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
        setTimeout(() => this.makeBotResponse(userMessage), 1000)
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
            <h2>Chat with your bot</h2>
            <MessageHistory history={this.state.messageHistory}/>
            <form onSubmit={this.handleUserSend}>
                <input type="text" value={this.state.userInput} onChange={this.handleUserTyping}/>
                <input type="submit" value="Send" />
            </form>
        </div>

        )
    }
}

//you will have to change this to retrieving from LocalStorage!!
const mapStateToProps = state => {
    return {
        scripts: state.scripts
    }
}

export default connect(mapStateToProps)(BotChatContainer);