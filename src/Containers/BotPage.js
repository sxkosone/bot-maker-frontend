import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import MessageHistory from './MessageHistory';

const BOT_URL = "https://peaceful-journey-69488.herokuapp.com/bots/"
const SCRIPT_URL = "https://peaceful-journey-69488.herokuapp.com/find-answer"

class BotPage extends React.Component {
    state = {
        userInput: "",
        errorMessage: "",
        messageHistory: [] //holds messages between human and bot
    }
    componentDidMount() {
        fetch(BOT_URL+this.props.botId).then(r => r.json())
        .then(response => {
            if(response.success) {
                this.props.setBotName(response.bot_name)
                this.props.setBotDescription(response.description)
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
            <React.Fragment>
                <h1>Chat with {this.props.botName}</h1>
                <p>{this.props.botDescription}</p>
                <MessageHistory history={this.state.messageHistory}/>
                <Form onSubmit={this.handleUserSend}>
                    <Form.Group>
                    <Form.Input type="text" value={this.state.userInput} onChange={this.handleUserTyping} action={<Form.Input type="submit" value="Send" />}/>

                    </Form.Group>
                </Form>
                {localStorage.getItem("token") ? <Button inverted color="blue" as={Link} to="/my-page">Back to your bots</Button> : <Button inverted color="blue" as={Link} to="/create">Build your own chatbot</Button>}
            </React.Fragment>
        )
    }

    render() {
        return(
            <div className="BotPage content">{this.state.errorMessage === "No bot lives in this address" ? <h1>{this.state.errorMessage}.<br/> <Button inverted size="huge" as={Link} to="/create">Create your bot here</Button></h1> : this.renderBotPage()}</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        botName: state.userAndBot.botName,
        botDescription: state.userAndBot.botDescription
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setBotName: (botName) => dispatch({ type: "ADD_BOTNAME", botName: botName }),
        setBotDescription: (desc) => dispatch({ type: "ADD_BOT_DESCRIPTION", botDescription: desc })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BotPage);