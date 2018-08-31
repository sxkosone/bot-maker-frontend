import React from 'react';
import { NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {
  state = {
    loggedIn: localStorage.getItem("token")
  }
  logout = () => {
    localStorage.clear()
    this.setState({
      loggedIn: false
    })
  }
  renderLoginLogout = () => {
    return localStorage.getItem("token") ? <Menu.Item onClick={this.logout} position="right">Log out</Menu.Item> : <Menu.Item as={NavLink} to="/login" position="right">Login</Menu.Item>
  }
  render() {
    return (
      <Menu className="Navbar">
        
        <Menu.Item as={NavLink} exact to="/">BotMaker</Menu.Item>
        <Menu.Item as={NavLink} exact to="/create">Create</Menu.Item>
        {this.renderLoginLogout()}
      </Menu>
    );
  }
}

export default Navbar;