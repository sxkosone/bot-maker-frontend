import React from 'react';
import { connect } from 'react-redux';
import MessageHistory from './MessageHistory';
import { Link } from 'react-router-dom';
import { Form, Button, Icon, Divider } from 'semantic-ui-react';


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
        let botResponse = ""
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
        if (botResponse === "" && this.props.fallback.length > 0) {
            let randomI = Math.floor(Math.random()*this.props.fallback.length);
            botResponse = this.props.fallback[randomI]
        } else if (botResponse === ""){
            botResponse = "I don't understand :("
        }
            
        //push a new bot message into the state.messageHistory
        this.setState({
            messageHistory: [...this.state.messageHistory, {sender: "bot", text: botResponse}]
        })
    } 

    render() {
        return(
            <React.Fragment>
        <div className="botChatContainer content">
            <h1>Test chat</h1>
            <p>Send messages to {this.props.botName === "" ? "your bot" : this.props.botName} to see how your scripts are working! Please note that this is a developmental chat view - the default scripts are not available until you save the bot.</p>
            <MessageHistory history={this.state.messageHistory}/>
            <Form className="message-send" onSubmit={this.handleUserSend}>
            <Form.Group className="message-send">
                <Form.Input className="message-send" type="text" value={this.state.userInput} onChange={this.handleUserTyping} action={<Form.Input className="button-send" type="submit" value="Send" />}/>
            </Form.Group>
            <Divider />
            <Button className={window.innerWidth<380 ? "fluid" : null} size="large" primary as={ Link } to="/create"><Icon name="arrow left"/>Back to editing</Button>
            <Button className={window.innerWidth<380 ? "fluid" : null} floated="right" size="large" color="green" as={ Link } to="/save-bot">My bot is ready<Icon name="arrow right"/></Button>
            </Form>
            
        </div>
        {/* <Button.Group className={window.innerWidth<380 ? "Buttons" : null}> */}
            
        {/* </Button.Group> */}
        </React.Fragment>

        )
    }
}

//you may have to change this to retrieving from LocalStorage!!
const mapStateToProps = state => {
    return {
        scripts: state.scripts.scripts,
        fallback: state.scripts.fallback,
        botName: state.userAndBot.botName
    }
}

export default connect(mapStateToProps)(BotChatContainer);