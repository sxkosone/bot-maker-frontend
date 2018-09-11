import React from 'react';
import BotMakerContainer from './BotMakerContainer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';

const USER_URL = "https://peaceful-journey-69488.herokuapp.com/user"
const BOT_URL = "https://peaceful-journey-69488.herokuapp.com/bots/"


class EditUsersBot extends React.Component {
    state = {
        scriptsReady: false,
        redirect: false
    }
    componentDidMount() {
        //fetch user's bot's all scripts and save them to state
        let token = localStorage.getItem("token")
        if(token) {
            this.retrieveBotScripts(token)
        } else {
            //you need to redirect them elsewhere if they're not logged in
            
            this.setState({
                redirect: true
            })
        }
    }

    retrieveBotScripts = (token) => {
        //first fetch to get and verify user info
        fetch(USER_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(userObj => {
            //second fetch to get bot info and scripts
            
            let match = userObj.bots.find(bot => bot.url_id === this.props.urlId)
            
            fetch(BOT_URL+match.url_id)
            .then(r => r.json())
            .then(response => {
                
                const defaultScripts = response.include_default_scripts === null ? true : response.include_default_scripts 
                this.props.addScriptsFromBackendToState(response.scripts)
                this.props.addNameFromBackendToState(response.bot_name)
                this.props.addDefaultScriptsSelector(defaultScripts)
                this.props.addBotUrlFromBackendToState(match.url_id)
                this.props.addBotDescriptionFromBackendToState(response.description)
                this.setState({
                    scriptsReady: true
                })
                
            })
        })
    }
    showLoader = () => {
        if(!this.state.scriptsReady) {
            return (
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            )
        }
    }

    render() {
        return(
            <div className="EditUsersBot content">
            {this.state.redirect ? <Redirect to="/" /> : null}
            {this.showLoader()}
            {this.state.scriptsReady ? <BotMakerContainer /> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addScriptsFromBackendToState: (scripts) => dispatch({ type: "ADD_MANY_NEW_PAIRS", newPairs: scripts }),
        addNameFromBackendToState: (name) => dispatch({ type: "ADD_BOTNAME", botName: name }),
        addBotUrlFromBackendToState: (url) => dispatch({ type: "ADD_BOT_URL", url: url }),
        addBotDescriptionFromBackendToState: (desc) => dispatch({ type: "ADD_BOT_DESCRIPTION", botDescription: desc }),
        addDefaultScriptsSelector: (boolean) => dispatch({ type: "ADD_INCLUDE_DEFAULT_SCRIPTS", selection: boolean})
    }
}

export default connect(null, mapDispatchToProps)(EditUsersBot);