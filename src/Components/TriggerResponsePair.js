import React from 'react';
// import TriggerInput from './TriggerInput';
// import ResponseInput from './ResponseInput';

class TriggerResponsePair extends React.Component {

    handleChange = (e) => {
      const key=e.target.name
      const value=e.target.value
      this.props.handleEdits(this.props.index, key, value)
    }
    render () {
      return (
        <div className="TriggerResponsePair">
          {/* Later on render separate trigger and response components! */}
            <label htmlFor="triggerText">Trigger</label>
            <input type="text" name="trigger" onChange={(e) => this.handleChange(e)} value={this.props.pair.trigger}/>
            <label htmlFor="responseText">Response</label>
            <input type="text" name="response" onChange={(e) => this.handleChange(e)} value={this.props.pair.response}/>
            <button onClick={() => this.props.delete(this.props.index)}>-</button>
        </div>
      );
    }
    
}

export default TriggerResponsePair;