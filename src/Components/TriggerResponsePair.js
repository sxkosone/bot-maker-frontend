import React from 'react';
import { Form, Icon, Divider } from 'semantic-ui-react';


class TriggerResponsePair extends React.Component {

    handleChange = (e) => {
      const key=e.target.name
      const value=e.target.value
      this.props.handleEdits(this.props.index, key, value)
    }
    render () {
      return (
        <div className="TriggerResponsePair">
        <Divider/>
            <Form.Group widths='equal'>
              <Form.Input fluid label="Trigger" name="trigger" onChange={(e) => this.handleChange(e)} value={this.props.pair.trigger} />
              <Form.Input fluid label='Response' name="response" onChange={(e) => this.handleChange(e)} value={this.props.pair.response} />
              <Icon name="delete" onClick={() => this.props.delete(this.props.index)}/>
            </Form.Group>
            
        </div>
        
      );
    }
    
}

export default TriggerResponsePair;