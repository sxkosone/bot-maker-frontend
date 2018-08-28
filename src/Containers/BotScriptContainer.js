import React from 'react';
import TriggerResponsePair from '../Components/TriggerResponsePair';
import { connect } from 'react-redux'

class BotScriptContainer extends React.Component {
  render() {
    return (
      <div className="BotScriptContainer">
        BotScriptContainer
        <TriggerResponsePair />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    triggers: state.triggers,
    responses: state.responses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTrigger: (formData) => dispatch({type: "ADD_TRIGGER", trigger: formData}),
    addResponse: (formData, triggerId) => dispatch({type: "ADD_RESPONSE", response: formData, triggerId: triggerId})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BotScriptContainer);