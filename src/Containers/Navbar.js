import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';

class Navbar extends React.Component {

  state = {
    currentUser: this.props.currentUser
  }

  logout = () => {
    localStorage.clear()
    
    //redirecting
    const saveState = {
          goal: "redirect user to front page after logged out"
        };
         
    window.history.pushState(saveState, "", "/");

    this.props.addLoggedOutMessage("You're now logged out")
    setTimeout(this.props.clearMessage, 5000)
    this.props.clearCurrentUserFromState()
    this.props.clearScripts()
  }  

  renderNavLinksForLoggedInOrOut = () => {
    return this.state.currentUser || localStorage.getItem("token") ? 
    <React.Fragment>
      <Menu.Item as={NavLink} exact to="/my-page">My Bots</Menu.Item>
      <Menu.Item as={Link} to="/" onClick={this.logout} position="right">Log out</Menu.Item>
    </React.Fragment> : 
    <React.Fragment>
      <Menu.Item as={NavLink} exact to="/create">Create</Menu.Item>
      <Menu.Item as={NavLink} to="/login" position="right">Login</Menu.Item>
    </React.Fragment>
  }
  render() {
    return (
      <React.Fragment>
      <Menu className="Navbar top fixed">
        
        <Menu.Item as={NavLink} exact to="/">BotMaker</Menu.Item>
        
        {this.renderNavLinksForLoggedInOrOut()}
      </Menu>
        {this.props.info ? <p className="info-message">{this.props.info}</p> : null}
        {this.props.error ? <p className="error-message">{this.props.error}</p> : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    info: state.messages.info,
    error: state.messages.error,
    currentUser: state.userAndBot.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLoggedOutMessage: (message) => dispatch({ type: "ADD_INFO_MESSAGE", info: message }),
    clearMessage: () => dispatch({ type: "ERASE_INFO_MESSAGE" }),
    clearCurrentUserFromState: () => dispatch({ type: "LOG_OUT" }),
    clearScripts: () => dispatch({ type: "CLEAR_SCRIPTS" })
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);