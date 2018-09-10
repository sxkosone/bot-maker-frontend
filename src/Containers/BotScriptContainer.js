import React from 'react';
import TriggerResponsePair from '../Components/TriggerResponsePair';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button, Checkbox, Icon, Popup, Divider } from 'semantic-ui-react';

class BotScriptContainer extends React.Component {
  state = {
    redirectToChat: false,
    includeDefaultScripts: this.props.includeDefaultScripts,
    includeMoodDetection: this.props.includeMoodDetection,
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
    this.props.addDefaultScriptsSelector(this.state.includeDefaultScripts) //default scripts on/off
    this.props.addMoodDetectionSelector(this.state.includeMoodDetection) //mood detection on/off
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
  defaultScriptText = () => {
    return <p><strong>Default scripts include recognition of most common greetings and goodbyes.</strong> It also has answers to common questions, such as 'how are you' and 'how do you work'. Your scripts will always take precedence, so even if the same trigger phrase is both in your scripts and the default scripts, your response will be always chosen.</p>
  }
  render() {
    return (
      <div className="BotScriptContainer">
      {this.renderRedirectToChat()}
        <h2>Default Scripts</h2>
        <Checkbox toggle checked={this.state.includeDefaultScripts} onClick={() => this.setState({ includeDefaultScripts: !this.state.includeDefaultScripts })} label="Default scripts ON/OFF"/> 
        <p>Include default answers to general greetings and questions - don't worry, your scripts will always be prioritized! <Popup hideOnScroll on="hover" content={this.defaultScriptText()} trigger={<em>What default scripts?</em>}/></p>
        <h2>Mood detection</h2>
        <Checkbox toggle checked={this.state.includeMoodDetection} onClick={() => this.setState({ includeMoodDetection: !this.state.includeMoodDetection })} label="Mood detection ON/OFF"/> 

        <h2>Your Scripts</h2>
        <p>Add some script to your bot. What "triggers" should the bot respond to? Separate responses with "//" to add multiple responses to the same trigger.</p>
        <Form onSubmit={this.handleSubmit}>
        {this.state.pairs.map((pair, index) => <TriggerResponsePair key={index} index={index} pair={pair} handleEdits={this.handleEdits} addPair={this.props.addPair} delete={this.deleteTriggerResponsePair}/>)}
        <Divider />
        <Button color="green" onClick={this.addNewTriggerResponsePair}><Icon name="plus"/>Add a new trigger</Button>
        <Button floated="right" color="blue" type="submit">Save and chat<Icon name="arrow right"/></Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //map the state to copy all scripts to the input fields
  const stringScripts = [...state.scripts.scripts].map(pair => {
    const responsesString = pair.response.join("//")
    return {...pair, response: responsesString}
  })
  
  return {
    stringifiedScripts: stringScripts,
    botName: state.userAndBot.botName,
    includeDefaultScripts: state.scripts.includeDefaultScripts,
    includeMoodDetection: state.scripts.includeMoodDetection
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewPairs: (array) => dispatch({type: "ADD_MANY_NEW_PAIRS", newPairs: array }),
    addDefaultScriptsSelector: (boolean) => dispatch({ type: "ADD_INCLUDE_DEFAULT_SCRIPTS", selection: boolean }),
    addMoodDetectionSelector: (boolean) => dispatch({ type: "ADD_MOOD_DETECTION", selection: boolean })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BotScriptContainer);