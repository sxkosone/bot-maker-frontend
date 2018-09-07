import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, Message, Icon } from 'semantic-ui-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const USER_URL = "http://localhost:3000/user"
const BOT_URL = "http://localhost:3000/bots/"

class UserPage extends React.Component {
    state = {
        user: this.props.currentUser,//used to be localStorage.getItem("token")
        copied: false
    }

    componentDidMount() {
        let token = localStorage.getItem("token")
        if (token) {
            console.log("in the user fetch")
            fetch(USER_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(userObj => {
                
                this.setState({ user: userObj })
            })
            //think about setting an error message to redux state
            .catch(e => e.json()).then(console.log)
        } 
        else {
            this.props.addInfoMessage("Login or sign up to view your bot")
            this.setState({
                user: null
            })
            
        
        }
    }

    copyToClipboard = (urlId) => {
        let link = `www.botmaker.com/bots/${urlId}`
        console.log(link)
        this.setState({
            copied: true
        })
        //setTimeout(this.setState({copied: false}), 5000) //do you need this rly
    }

    delete = (botId) => {
        console.log("deleting bot number", botId)
        let token = localStorage.getItem("token")
        fetch(BOT_URL+botId, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(response => {
            if(response.success) {
                
                this.props.addInfoMessage(response.message)
                this.setState({user: response.user})
            } else {
                this.props.addErrorMessage(response.message)
            }
        })
    }

    renderABot = (bot)  => {
        //example obj {id: 2, name: "lisabot", url_id: "12345", user_id: 3, include_default_scripts: true, …}
        return (<div key={bot.id} className="bot-snippet">
        <h1>Bot: {bot.name}</h1>
                        <Button color="green" as={Link} to={`/bots/${bot.url_id}`}>Chat with {bot.name}</Button>
                         
                        <Button color="blue" as={Link} to={`/edit-bot/${bot.url_id}`}>Edit your bot</Button>
                        <h2>Share {bot.name} to the world</h2>
                        
                        <Form.Input className="shareLink" value={`www.botmaker.com/bots/${bot.url_id}`}>
                            <input />
                            <CopyToClipboard text={`www.botmaker.com/bots/${bot.url_id}`}>
                                <Icon name="copy" onClick={() => this.copyToClipboard(bot.url_id)}/>
                            </CopyToClipboard>
                        </Form.Input>
                        {this.state.copied ? <p>Link copied to clipboard!</p> : null}
                        <Button inverted color="red" onClick={() => this.delete(bot.id)}>Delete</Button>
        </div>)
    }

    render() {
        return(
            <div className="UserPage content">
            {/* two ternary operators to first check if login user fetch is ready and then to check if user is logged in at all */}
                {this.state.user ? (
                    <div>
                        {this.props.info !== "" ? <Message color="violet">{this.props.info}</Message> : null}
                        <h1>Human: {this.state.user.username}</h1>
                        <Button inverted as={Link} to="/create" >Make a new bot</Button>
                        {this.state.user.bots === undefined ? null : this.state.user.bots.map(bot => this.renderABot(bot))}
                    </div>
                ) : localStorage.getItem("token") ? null : <Redirect to="/login" />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return  {
        info: state.messages.info,
        error: state.messages.error,
        currentUser: state.userAndBot.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addInfoMessage: (message) => dispatch({ type: "ADD_INFO_MESSAGE", info: message }),
        addErrorMessage: (message) => dispatch({ type: "ADD_ERROR_MESSAGE", error: message })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);