import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, Message, Icon } from 'semantic-ui-react';

const USER_URL = "http://localhost:3000/user"

class UserPage extends React.Component {
    state = {
        user: this.props.currentUser//used to be localStorage.getItem("token")
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
            debugger
            this.props.addInfoMessage("Login or sign up to view your bot")
            this.setState({
                user: null
            })
            
        
        }
    }

    copyToClipboard = () => {
        let link = `www.botmaker.com/bots/${this.state.user.bot_url_id}`
        console.log(link)
        
    }

    render() {
        return(
            <div className="UserPage content">
            {/* two ternary operators to first check if login user fetch is ready and then to check if user is logged in at all */}
                {this.state.user ? (
                    <div>
                        {this.props.info !== "" ? <Message color="violet">{this.props.info}</Message> : null}
                        <h1>Human: {this.state.user.username}</h1>
                        <h1>Bot: {this.state.user.bot_name}</h1>
                        <Button color="green" as={Link} to={`/bots/${this.state.user.bot_url_id}`}>Chat with {this.state.user.bot_name}</Button>
                         
                        <Button color="blue" as={Link} to="/edit-bot">Edit your bot</Button>
                        <h2>Share {this.state.user.bot_name} to the world</h2>
                        <Icon name="copy" onClick={this.copyToClipboard}/>
                        <Form.Input className="shareLink" value={`www.botmaker.com/bots/${this.state.user.bot_url_id}`}></Form.Input>
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
        addInfoMessage: (message) => dispatch({ type: "ADD_INFO_MESSAGE", info: message })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);