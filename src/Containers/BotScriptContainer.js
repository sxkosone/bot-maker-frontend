import React from 'react';
import TriggerResponsePair from '../Components/TriggerResponsePair';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Checkbox, Icon, Popup, Divider } from 'semantic-ui-react';

class BotScriptContainer extends React.Component {
  state = {
    redirectToChat: false,
    includeDefaultScripts: this.props.includeDefaultScripts,
    includeClassifier: this.props.includeClassifier,
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
    this.props.addClassifierSelector(this.state.includeClassifier) //mood detection on/off
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
  machineLearningText = () => {
    return <p>Train your bot to categorize between two separate classes - add mood detection, for example. This uses machine learning to train your bot to recognize if a message belongs to a category, and what the bot should respond in that case.</p>
  }
  machineLearningControls = () => {
    if (this.props.botUrl !== "") {
      return <React.Fragment>
            <h2>Classifier</h2>
            <Checkbox toggle checked={this.state.includeClassifier} onClick={() => this.setState({ includeClassifier: !this.state.includeClassifier })} label="Machine learning ON/OFF"/>
            <br /><Popup hideOnScroll on="hover" content={this.machineLearningText()} trigger={<p><em>What's this?</em></p>}/>
            {this.state.includeClassifier ? <Button inverted secondary as={Link} to={`/training/${this.props.botUrl}`}>Train your bot<Icon name="arrow right"/></Button> : null}

          </React.Fragment>
    } else {
      return null
    }
  }
  render() {
    return (
      <div className="BotScriptContainer">
      {this.renderRedirectToChat()}
        <h2>Default Scripts</h2>
        <Checkbox toggle checked={this.state.includeDefaultScripts} onClick={() => this.setState({ includeDefaultScripts: !this.state.includeDefaultScripts })} label="Default scripts ON/OFF"/> 
        <p>Include default answers to general greetings and questions - don't worry, your scripts will always be prioritized! <Popup hideOnScroll on="hover" content={this.defaultScriptText()} trigger={<em>What default scripts?</em>}/></p>
        {this.machineLearningControls()}
        <h2>Your Scripts</h2>
        <p>Add some script to your bot. What "triggers" should the bot respond to? Separate responses with "//" to add multiple responses to the same trigger.</p>
        <Form onSubmit={this.handleSubmit}>
        {this.state.pairs.map((pair, index) => <TriggerResponsePair key={index} index={index} pair={pair} handleEdits={this.handleEdits} addPair={this.props.addPair} delete={this.deleteTriggerResponsePair}/>)}
        <Divider />
        
        <Button className={window.innerWidth<380 ? "fluid" : null} color="black" onClick={this.addNewTriggerResponsePair}><Icon name="plus"/>Add a new trigger</Button>
        <Button className={window.innerWidth<380 ? "fluid" : null} floated="right" primary type="submit">Save and chat<Icon name="arrow right"/></Button>
        </Form>
        <br />
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
    botUrl: state.userAndBot.botUrl,
    includeDefaultScripts: state.scripts.includeDefaultScripts,
    includeClassifier: state.scripts.includeClassifier
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewPairs: (array) => dispatch({type: "ADD_MANY_NEW_PAIRS", newPairs: array }),
    addDefaultScriptsSelector: (boolean) => dispatch({ type: "ADD_INCLUDE_DEFAULT_SCRIPTS", selection: boolean }),
    addClassifierSelector: (boolean) => dispatch({ type: "ADD_CLASSIFIER", selection: boolean })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BotScriptContainer);