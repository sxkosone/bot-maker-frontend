import React from 'react';
import BotScriptContainer from './BotScriptContainer';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

class BotMakerContainer extends React.Component {
  state = {
    nameInput: this.props.botName
  }
  handleChange = (e) => {
    this.setState({
      nameInput: e.target.value
    })
  }
  handleSubmit = () => {
    //e.preventDefault()
    this.props.giveBotName(this.state.nameInput)
  }
  render() {
    return (
      <div className="BotMakerContainer">

        <h2>Botname</h2>
        <Form.Input type="text" value={this.state.nameInput} onChange={this.handleChange}/>
        <h2>Scripts</h2>
        <BotScriptContainer nameBot={this.handleSubmit}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    giveBotName: (newName) => dispatch({type:"ADD_BOTNAME", botName: newName})
  }
}

const mapStateToProps = state => {
  return {
    botName: state.userAndBot.botName
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BotMakerContainer);