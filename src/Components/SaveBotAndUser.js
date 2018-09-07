import React from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
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
                
                //dispatch an action to state to update current user info!!
                console.log("got back from backend this user", userObj)
                this.props.setCurrentUser(userObj)
                //debugger
                const user = {
                    username: userObj.username, 
                    bot_name: this.props.botName,
                    bot_url_id: this.props.botUrl ? this.props.botUrl : cuid(),
                    include_default_scripts: this.props.includeDefaultScripts
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
        this.props.addInfoMessage("Login or sign up to save your bot")
        var saveState = {
            goal: "successfully redirect user to login and back to save page"
          };
           
        window.history.pushState(saveState, "", "save-bot");
        return <Redirect to='/login' />
    }

    redirectToUserPage = () => {
        if(this.state.botReady) {
            this.props.addInfoMessage("Successfully saved your bot!")
            //set a timeout to dispatch an action to clear info message!
            setTimeout(this.props.clearInfoMessage, 5000)
            return <Redirect to='/my-page' />
        }
    }

    render() {
        console.log("rendering the /save-bot page!")
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
        scripts: state.scripts.scripts,
        botName: state.userAndBot.botName,
        botUrl: state.userAndBot.botUrl,
        currentUser: state.userAndBot.currentUser,
        includeDefaultScripts: state.scripts.includeDefaultScripts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (currentUser) => dispatch({ type: "LOG_IN", currentUser: currentUser }),
        addInfoMessage: (message) => dispatch({ type: "ADD_INFO_MESSAGE", info: message}),
        clearInfoMessage: () => dispatch({ type: "ERASE_INFO_MESSAGE" })
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SaveBotAndUser)
