import React from 'react';
import TriggerInput from './TriggerInput';
import ResponseInput from './ResponseInput';

const TriggerResponsePair = (props) => {
    return (
      <div className="TriggerResponsePair">
        TriggerResponsePair
        {/* Later on render separate trigger and response components! */}
        <form>
          <label for="trigger">Trigger</label>
          <input type="text" name="trigger"/>
          <label for="response">Response</label>
          <input type="text" name="response"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default TriggerResponsePair;