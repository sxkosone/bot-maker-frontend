import React from 'react';
// import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import MessageHistory from './MessageHistory';

// const BOT_URL = "https://peaceful-journey-69488.herokuapp.com/bots/"
// const SCRIPT_URL = "https://peaceful-journey-69488.herokuapp.com/find-answer"


const SCRIPT_URL = "http://localhost:3000/find-answer"
const BOT_URL = "http://localhost:3000/bots/"

class BotPage extends React.Component {
    state = {
        userInput: "",
        errorMessage: "",
        botName: "",
        botDescription: "",
        messageHistory: [] //holds messages between human and bot
    }
    componentDidMount() {
        fetch(BOT_URL+this.props.botId).then(r => r.json())
        .then(response => {
            console.log(response)
            if(response.success) {
                // this.props.setBotName(response.bot_name)
                // this.props.setBotDescription(response.description)
                this.setState({
                    botName: response.bot_name,
                    botDescription: response.description
                })
            } else {
                this.setState({
                    errorMessage: "No bot lives in this address"
                })
            }
            
        })
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
        fetch(SCRIPT_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({
                user_message: userMessage, 
                bot_url_id: this.props.botId, 
                message_history: this.state.messageHistory
            })
        }).then(r => r.json()).then(answer => {
            console.log(answer)
            this.setState({
                messageHistory: [...this.state.messageHistory, {sender: "bot", text: answer.text}]
            })
        })
    }

    renderBotPage = () => {
        return (
            <div id="WelcomeContent">
                <h1>Chat with {this.state.botName}</h1>
                <p>{this.state.botDescription}</p>
                <MessageHistory history={this.state.messageHistory}/>
                <Form onSubmit={this.handleUserSend}>
                    {/* <Form.Group>
                    <Form.Input type="text" value={this.state.userInput} onChange={this.handleUserTyping} action={<Form.Input type="submit" value="Send" />}/>

                    </Form.Group> */}
            <Form.Group className="message-send">
                <Form.Input className="message-send" type="text" value={this.state.userInput} onChange={this.handleUserTyping} action={<Form.Input className="button-send" type="submit" value="Send" />}/>
            </Form.Group>
                    
                </Form>
                
                {localStorage.getItem("token") ? <Button inverted as={Link} to="/my-page">Back to your bots</Button> : <Button inverted as={Link} to="/create">Build your own chatbot</Button>}
            </div>
        )
    }

    render() {
        return(
            <div className="WelcomeContainer">{this.state.errorMessage === "No bot lives in this address" ? <h1>{this.state.errorMessage}.<br/> <Button inverted size="huge" as={Link} to="/create">Create your bot here</Button></h1> : this.renderBotPage()}</div>
        )
    }
}



export default BotPage;