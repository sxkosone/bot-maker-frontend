import React from 'react';
import BotMakerContainer from './BotMakerContainer';
import { connect } from 'react-redux';

const USER_URL = "http://localhost:3000/user"
const BOT_URL = "http://localhost:3000/get-bot/"


class EditUsersBot extends React.Component {
    state = {
        scriptsReady: false
    }
    componentDidMount() {
        //fetch user's bot's all scripts and save them to state
        let token = localStorage.getItem("token")
        if(token) {
            this.retrieveUserScripts(token)
        }
    }

    retrieveUserScripts = (token) => {
        //first fetch to get and verify user info
        fetch(USER_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(userObj => {
            //second fetch to get bot info and scripts
            //console.log(userObj)
            fetch(BOT_URL+userObj.bot_url_id)
            .then(r => r.json())
            .then(response => {
                this.props.addScriptsFromBackendToState(response.scripts)
                this.props.addNameFromBackendToState(response.bot_name)
                this.setState({
                    scriptsReady: true
                })
            })
        })
    }

    render() {
        return(
            <div className="EditUsersBot">Edit your bot
                {this.state.scriptsReady ? <BotMakerContainer /> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addScriptsFromBackendToState: (scripts) => dispatch({ type: "ADD_MANY_NEW_PAIRS", newPairs: scripts }),
        addNameFromBackendToState: (name) => dispatch({ type: "ADD_BOTNAME", botName: name })
    }
}

const mapStateToProps = state => {

}

export default connect(null, mapDispatchToProps)(EditUsersBot);