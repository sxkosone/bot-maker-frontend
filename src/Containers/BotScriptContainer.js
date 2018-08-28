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


export default connect(mapStateToProps)(BotScriptContainer);