import React from 'react';
import BotScriptContainer from './BotScriptContainer';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

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
      <div className="BotMakerContainer content">

        <h2>Botname</h2>
        <Form.Input name="nameInput" type="text" value={this.state.nameInput} onChange={this.handleChange}/>
        <h2>Description</h2>
        <Form.Input name="descriptionInput" type="textarea" value={this.state.descriptionInput} onChange={this.handleChange}/>
        <BotScriptContainer nameBot={this.handleSubmit}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    giveBotName: (newName) => dispatch({type:"ADD_BOTNAME", botName: newName}),
    giveBotDescription: (desc) => dispatch({ type: "ADD_BOT_DESCRIPTION", botDescription: desc })
  }
}

const mapStateToProps = state => {
  return {
    botName: state.userAndBot.botName,
    botDescription: state.userAndBot.botDescription
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BotMakerContainer);