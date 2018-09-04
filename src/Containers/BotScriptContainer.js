import React from 'react';
import TriggerResponsePair from '../Components/TriggerResponsePair';
import { connect } from 'react-redux';
import {Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

class BotScriptContainer extends React.Component {
  state = {
    redirectToChat: false,
    pairs: [...this.props.stringifiedScripts, {trigger: "", response: ""}] //will hold each new trigger-response pair object
  }

  handleEdits = (index, key, value) => {
    let pairToEdit = this.state.pairs[index]
    pairToEdit[key] = value
    const newPairArray = this.state.pairs.map((pair, i) => {
      return i===index ? pairToEdit : pair
    })
    this.setState({
     pairs: [...newPairArray]
    })
  }

  handleSubmit = (e) => {
    //submit does 3 things: 1)saves scripts & 2)botname to redux state and 3) redirects to chat page 
    e.preventDefault()
    const newArr = [...this.state.pairs].map(pair => {
      //separate each answer to it's own string if find //
      const newResponseArray = pair.response.split("//")
      return {...pair, response: newResponseArray}
    })
    this.props.nameBot()
    this.props.addNewPairs(newArr)
    //debatable: should scripts also be saved to localstorage to ensure they're not lost on refresh?
    //localStorage.setItem("scripts", JSON.stringify(this.state.pairs))
    this.setState({
      redirectToChat: true
    })
  }

  addNewTriggerResponsePair = (e) => {
    e.preventDefault()
    const newPair = {trigger: "", response: ""}
    this.setState({
      pairs: [...this.state.pairs, newPair]
    })
  }
  deleteTriggerResponsePair = (index) => {
    this.setState({
      pairs: this.state.pairs.filter((pair, i) => i !== index)
    })
  }
  renderRedirectToChat = () => {
    if(this.state.redirectToChat) {
      return <Redirect to="/chat" />
    }
  }
  render() {
    return (
      <div className="BotScriptContainer">
      {this.renderRedirectToChat()}
        <p>Add some script to your bot. What "triggers" should the bot respond to? Separate responses with "//" to add multiple responses to the same trigger.</p>
        <Form onSubmit={this.handleSubmit}>
        {this.state.pairs.map((pair, index) => <TriggerResponsePair key={index} index={index} pair={pair} handleEdits={this.handleEdits} addPair={this.props.addPair} delete={this.deleteTriggerResponsePair}/>)}
        <Button circular color="green" onClick={this.addNewTriggerResponsePair}><h1>+</h1></Button>
        <Button type="submit">Save Script and go to chat with bot</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //map the state to copy all scripts to the input fields
  const stringScripts = [...state.scripts].map(pair => {
    const responsesString = pair.response.join("//")
    return {...pair, response: responsesString}
  })
  
  return {
    stringifiedScripts: stringScripts,
    botName: state.userAndBot.botName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewPairs: (array) => dispatch({type: "ADD_MANY_NEW_PAIRS", newPairs: array})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BotScriptContainer);