import React from 'react';
import BotScriptContainer from './BotScriptContainer';
import { connect } from 'react-redux';
import { Form, TextArea } from 'semantic-ui-react';

class BotMakerContainer extends React.Component {
  state = {
    nameInput: this.props.botName,
    descriptionInput: this.props.botDescription
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSubmit = () => {
    //e.preventDefault()
    this.props.giveBotName(this.state.nameInput)
    this.props.giveBotDescription(this.state.descriptionInput)
  }
  render() {
    return (
      <div className="BotMakerContainer">
        <h1>Create a chatbot</h1>
        <h2>Botname</h2>
        <Form.Input fluid name="nameInput" type="text" value={this.state.nameInput} onChange={this.handleChange}/>
        <h2>Description</h2>
        <Form>
        <TextArea name="descriptionInput" placeholder="Tell us about your bot..." autoHeight value={this.state.descriptionInput} onChange={this.handleChange}/>
        </Form>
        <BotScriptContainer nameBot={this.handleSubmit}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    giveBotName: (newName) => dispatch({type:"ADD_BOTNAME", botName: newName}),
    giveBotDescription: (desc) => dispatch({ type: "ADD_BOT_DESCRIPTION", botDescription: desc }),
    clearScriptsAndBot: () => dispatch({ type: "CLEAR_SCRIPTS" })
  }
}

const mapStateToProps = state => {
  return {
    botName: state.userAndBot.botName,
    botDescription: state.userAndBot.botDescription
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BotMakerContainer);