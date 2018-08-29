import React from 'react';
import BotScriptContainer from './BotScriptContainer';
import { connect } from 'react-redux';

class BotMakerContainer extends React.Component {
  state = {
    nameInput: ""
  }
  handleChange = (e) => {
    this.setState({
      nameInput: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.giveBotName(this.state.nameInput)
  }
  render() {
    return (
      <div className="BotMakerContainer">
        BotMakerContainer
        <BotScriptContainer />
        {/* where will this container end up in the final view? should i make own route? */}
        {/* <BotChatContainer /> */}
        Name your bot!
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.nameInput} onChange={this.handleChange}/>
          <input type="submit" value="name!"/>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    giveBotName: (newName) => dispatch({type:"ADD_BOTNAME", botName: newName})
  }
}

export default connect(null, mapDispatchToProps)(BotMakerContainer);