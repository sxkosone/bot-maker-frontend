import React from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
//may need redirecting
//import LoginSignup from './LoginSignup';
import { Redirect } from 'react-router-dom'

const USER_URL = "http://localhost:3000/user"

class SaveBotAndUser extends React.Component {
    state = {
        botReady: false
    }

    componentDidMount() {
        this.saveBotForLoggedInUser()
    }

    saveBotForLoggedInUser = () => {
        debugger
        let token = localStorage.getItem("token")
        //check if user is logged in
        if (token) {
            console.log("in the user fetch")
            fetch(USER_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(userObj => {
                //TODO dispatch an action to state to update current user info!!
                console.log("got back from backend this user", userObj)
                this.props.setCurrentUser(userObj)
                const user = {
                    username: userObj.username, 
                    bot_name: this.props.botName,
                    bot_url_id: userObj.bot_url_id ? userObj.bot_url_id : cuid()
                    //expecting triggers: [{text:"hi", responses: ["hi!", "hey"]}]
                }
                user.triggers = this.props.scripts.map(pair => {
                    
                    const newResponses = pair.response.map(response => ( {text: response} ))
                    const newTrigger = { text: pair.trigger, responses: newResponses }
                    return newTrigger
                })
                fetch(`http://localhost:3000/users/${userObj.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json; charset=utf-8"},
                    body: JSON.stringify({"user": user})})
                    .then(r => r.json())
                    .then(r => {
                        console.log("I updated user and got this response:",r)
                        this.setState({
                            botReady: true
                        })
                    })
                    
            })
        }
    }
    redirectToLogin = () => {
        var saveState = {
            goal: "successfully redirect user to login and back to save page"
          };
           
        window.history.pushState(saveState, "", "save-bot");
        return <Redirect to='/login' />
    }

    redirectToUserPage = () => {
        if(this.state.botReady) {
            return <Redirect to='/my-page' />
        }
    }

    render() {
        console.log("in the /save-bot page!")
        return(
            <div>
            {this.redirectToUserPage()}
            {localStorage.getItem("token") ? null : this.redirectToLogin()}
            
            </div>
        )
    }
}

const mapStateToProps = state => {
    return  {
        scripts: state.scripts,
        botName: state.userAndBot.botName,
        currentUser: state.userAndBot.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (currentUser) => dispatch({ type: "LOG_IN", currentUser: currentUser })
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SaveBotAndUser)
