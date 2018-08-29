import React from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react';

class WelcomeContainer extends React.Component {
  render() {
    return (
      <div className="WelcomeContainer">
      <div id="WelcomeContent">
        <h1>Build your own chatbot</h1>
        <div className="Buttons">
          <Button inverted secondary as={ Link }to="/create">Start building</Button>
          <Button inverted as={ Link } to="/login">Log in</Button>
        </div>
        </div>
      </div>
    );
  }
}

export default WelcomeContainer;