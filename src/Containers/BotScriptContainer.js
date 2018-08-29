import React from 'react';
import TriggerResponsePair from '../Components/TriggerResponsePair';
import { connect } from 'react-redux'

class BotScriptContainer extends React.Component {
  state = {
    pairs: [{trigger: "", response: ""}] //will hold each new trigger-response pair object
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
    this.state.pairs.map(pair => {
      //separate each answer to it's own string if find ;
      pair.response = pair.response.split(";")
      return pair
    })
    this.props.addNewPairs(this.state.pairs)
    localStorage.setItem("scripts", JSON.stringify(this.state.pairs))
    this.setState({
      pairs: [{trigger: "", response: ""}]
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
  render() {
    return (
      <div className="BotScriptContainer">
        BotScriptContainer
        <form onSubmit={this.handleSubmit}>
        {this.state.pairs.map((pair, index) => <TriggerResponsePair key={index} index={index} pair={pair} handleEdits={this.handleEdits} addPair={this.props.addPair} delete={this.deleteTriggerResponsePair}/>)}
        <button onClick={this.addNewTriggerResponsePair}>+</button>
        <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //new attempt at shape of state
    scripts: state.scripts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //new attempt at shape of state
    addPair: (trigger, responses) => dispatch({type: "ADD_NEW_PAIR", trigger: trigger, responses: responses}),
    addNewPairs: (array) => dispatch({type: "ADD_MANY_NEW_PAIRS", newPairs: array})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BotScriptContainer);