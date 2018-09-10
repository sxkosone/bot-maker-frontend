import React from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react';

class WelcomeContainer extends React.Component {
  render() {
    return (
      <div className="WelcomeContainer">
      <div id="WelcomeContent">
        <h1>Build your own chatbot</h1>
        
          
          {localStorage.getItem("token") ? <Button.Group className="Buttons">
          <Button size='huge' inverted secondary as={ Link }to="/create">Start building</Button>
          <Button size='huge' inverted as={ Link }to="/my-page">Your bots</Button>
          </Button.Group> : 
          <Button.Group className="Buttons">
          <Button size='huge' inverted secondary as={ Link }to="/create">Start building</Button>
          <Button size='huge' inverted as={ Link } to="/login">Log in</Button>
          </Button.Group>}
        
        </div>
      </div>
    );
  }
}

export default WelcomeContainer;