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

        Name your bot!
        {/* <Form onSubmit={this.handleSubmit}>
        <Form.Group> */}
          <Form.Input type="text" value={this.state.nameInput} onChange={this.handleChange}/>
          {/* <Form.Input type="submit" value="name!"/>
          </Form.Group> */}
        {/* </Form> */}
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