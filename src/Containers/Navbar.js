import React from 'react';
import { NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Navbar extends React.Component {
  
  logout = () => {
    //Should I TODO?: dispatch an action to clear the current user and bot from app's state
    localStorage.clear()
    
    //redirecting
    var saveState = {
          goal: "redirect user to front page after logged out"
        };
         
    window.history.pushState(saveState, "", "/");
    this.props.addLoggedOutMessage("You're now logged out")
    setTimeout(this.props.clearMessage, 5000)
    this.props.clearCurrentUserFromState()

  }
  //refactor to just one function!
  renderLoginLogout = () => {
    return localStorage.getItem("token") ? <Menu.Item onClick={this.logout} position="right">Log out</Menu.Item> : <Menu.Item as={NavLink} to="/login" position="right">Login</Menu.Item>
  }
  renderMyPageOrCreate = () => {
    return localStorage.getItem("token") ? <Menu.Item as={NavLink} exact to="/my-page">My Bot</Menu.Item> : <Menu.Item as={NavLink} exact to="/create">Create</Menu.Item>
  }
  render() {
    return (
      <Menu className="Navbar">
        
        <Menu.Item as={NavLink} exact to="/">BotMaker</Menu.Item>
        {this.renderMyPageOrCreate()}
        
        {this.renderLoginLogout()}
      </Menu>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLoggedOutMessage: (message) => dispatch({ type: "ADD_INFO_MESSAGE", info: message }),
    clearMessage: () => dispatch({ type: "ERASE_INFO_MESSAGE" }),
    clearCurrentUserFromState: () => dispatch({ type: "LOG_OUT" })
  }
  
}

const mapStateToProps = state => {
  return {
    currentUser: state.userAndBot.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);