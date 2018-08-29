import React from 'react';
import TriggerResponsePair from '../Components/TriggerResponsePair';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom' 

class BotScriptContainer extends React.Component {
  state = {
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
    e.preventDefault()
    const newArr = this.state.pairs.map(pair => {
      //separate each answer to it's own string if find ;
      if(typeof pair.response === "string") {
        pair.response = pair.response.split(";")
      }
      return pair
    })
    this.props.addNewPairs(newArr)
    localStorage.setItem("scripts", JSON.stringify(this.state.pairs))

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
  render() {
    return (
      <div className="BotScriptContainer">
        BotScriptContainer
        <form onSubmit={this.handleSubmit}>
        {this.state.pairs.map((pair, index) => <TriggerResponsePair key={index} index={index} pair={pair} handleEdits={this.handleEdits} addPair={this.props.addPair} delete={this.deleteTriggerResponsePair}/>)}
        <button onClick={this.addNewTriggerResponsePair}>+</button>
        <button type="submit">Save Script</button>
        <Link to="/chat">{this.props.botName==="" ? "Bot" : this.props.botName} is ready, let's chat!</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const stringScripts = state.scripts.map(pair => {
    console.log("current response:", pair.response)
    if (typeof pair.response === "object") {
      pair.response = pair.response.join(";")
      console.log("modified pair is:", pair.response)
    }
    return pair
  })
  return {
    //new attempt at shape of state
    scripts: state.scripts,
    stringifiedScripts: stringScripts,
    botName: state.userAndBot.botName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //new attempt at shape of state
    addNewPairs: (array) => dispatch({type: "ADD_MANY_NEW_PAIRS", newPairs: array})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BotScriptContainer);