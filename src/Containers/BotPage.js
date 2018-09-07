import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import MessageHistory from './MessageHistory';

const BOT_URL = "http://localhost:3000/get-bot/"
const SCRIPT_URL = "http://localhost:3000/find-answer"

class BotPage extends React.Component {
    state = {
        userInput: "",
        messageHistory: [] //holds messages between human and bot
    }
    componentDidMount() {
        fetch(BOT_URL+this.props.botId).then(r => r.json())
        .then(nameObj => {
            this.props.setBotName(nameObj.bot_name)
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

    render() {
        return(
            <div>
                <h1>BotPage for {this.props.botName}</h1>
                <MessageHistory history={this.state.messageHistory}/>
                <Form onSubmit={this.handleUserSend}>
                    <Form.Group>
                        <Form.Input type="text" value={this.state.userInput} onChange={this.handleUserTyping}/>
                        <Form.Input type="submit" value="Send" />
                    </Form.Group>
                </Form>
                <Button color="blue" as={Link} to="/edit-bot">Edit your bot</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        botName: state.userAndBot.botName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setBotName: (botName) => dispatch({ type: "ADD_BOTNAME", botName: botName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BotPage);