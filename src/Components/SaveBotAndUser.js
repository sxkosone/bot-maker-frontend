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

    saveBotForLoggedInUser = () => {

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
                
                console.log("got back from backend this user", userObj, "with these scripts:", this.props.scripts)
                const user = {
                    username: userObj.username, 
                    bot_name: this.props.botName,
                    bot_url_id: cuid()
                    //expecting triggers: [{text:"hi", responses: ["hi!", "hey"]}]
                }
                user.triggers = this.props.scripts.map(pair => {
                    
                    const newResponses = pair.response.map(response => ( {text: response} ))
                    const newTrigger = { text: pair.trigger, responses: newResponses }
                    return newTrigger
                })
                //console.log("user has these triggers", user.triggers)
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
        //you may have to change this to redirect to LoginSignup, so that you can user the goBack()
        //return <div><h1> Login or sign up to save your bot!</h1> <LoginSignup /></div>
        return <Redirect to='/login' />
    }

    redirectToUserPage = () => {
        if(this.state.botReady) {
            return <Redirect to='/my-page' />
        }
    }

    render() {
        return(
            <div>
            
            {localStorage.getItem("token") ? this.saveBotForLoggedInUser() : this.redirectToLogin()}
            {this.redirectToUserPage()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return  {
        scripts: state.scripts,
        botName: state.userAndBot.botName
    }
}

export default connect(mapStateToProps)(SaveBotAndUser)
