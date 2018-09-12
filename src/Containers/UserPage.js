import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Icon, Divider } from 'semantic-ui-react';

import BotSnippet from "../Components/BotSnippet"

const USER_URL = "https://peaceful-journey-69488.herokuapp.com/user"
const BOT_URL = "https://peaceful-journey-69488.herokuapp.com/bots/"

// const USER_URL = "http://localhost:3000/user"
// const BOT_URL = "http://localhost:3000/bots/"

class UserPage extends React.Component {
    state = {
        user: this.props.currentUser,//used to be localStorage.getItem("token")
        
        redirect: false
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
            setTimeout(() => this.props.addInfoMessage(""), 5000)
            this.setState({
                user: null
            })
            
        
        }
    }

    delete = (botId) => {
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
                setTimeout(() => this.props.addInfoMessage(""), 5000)
                this.setState({user: response.user})
            } else {
                this.props.addErrorMessage(response.message)
                setTimeout(() => this.props.addErrorMessage(""), 5000)
            }
        })
    }

    renderMakeANewBotCard = () => {
        return <Card color="green" href="/create" onClick={this.props.clearScriptsAndBot}>
        
            
        <Icon name="plus" size="big"/>
        <Card.Content>
        <Card.Header>Make a new chatbot</Card.Header>
        </Card.Content>
        </Card>
    }

    render() {
        return(
            <div className="UserPage">
            {this.state.redirect ? <Redirect to="/create"/> : null}
            {/* two ternary operators to first check if login user fetch is ready and then to check if user is logged in at all */}
                {this.state.user ? (
                    <div>
                        <p><Icon name="user"/>{this.state.user.username}</p>
                        <h1>Your Chatbots</h1>
                        
                        {this.state.user.bots === undefined || this.state.user.bots.length === 0 ? <h3>You don't seem to have any bots yet. Create your first!<Divider />{this.renderMakeANewBotCard()}</h3> : <Card.Group centered>{this.state.user.bots.map(bot => 
                        <BotSnippet key={bot.id} bot={bot} delete={this.delete}/>)}{this.renderMakeANewBotCard()}</Card.Group>}
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
        addErrorMessage: (message) => dispatch({ type: "ADD_ERROR_MESSAGE", error: message }),
        clearScriptsAndBot: () => dispatch({ type: "CLEAR_SCRIPTS" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);