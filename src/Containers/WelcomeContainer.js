import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import {connect} from 'react-redux';

class WelcomeContainer extends React.Component {
  render() {
    return (
      <div className="WelcomeContainer">
      <div id="WelcomeContent">
        <h1>Build your own chatbot</h1>
        
          
          {localStorage.getItem("token") ? <div>
          <Button className={window.innerWidth<380 ? "fluid" : null} size='huge' inverted secondary as={ Link }to="/create" onClick={this.props.clearScriptsAndBot}>Start building</Button>
          <Button className={window.innerWidth<380 ? "fluid" : null} size='huge' inverted as={ Link }to="/my-page">Your bots</Button>
          </div> : 
          <div>
          <Button className={window.innerWidth<380 ? "fluid" : null} size='huge' inverted secondary as={ Link }to="/create">Start building</Button>
          <Button className={window.innerWidth<380 ? "fluid" : null} size='huge' inverted as={ Link } to="/login">Log in</Button>
          </div>
          }
        
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearScriptsAndBot: () => dispatch({ type: "CLEAR_SCRIPTS" })
  }
}

export default connect(null, mapDispatchToProps)(WelcomeContainer);