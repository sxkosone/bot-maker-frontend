import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {
  
  //refactor to just one function!
  renderLoginLogout = () => {
    return localStorage.getItem("token") ? <Menu.Item as={Link} to="/" onClick={this.props.logout} position="right">Log out</Menu.Item> : <Menu.Item as={NavLink} to="/login" position="right">Login</Menu.Item>
  }
  renderMyPage = () => {
    return localStorage.getItem("token") ? <Menu.Item as={NavLink} exact to="/my-page">My Bots</Menu.Item> : <Menu.Item as={NavLink} exact to="/create">Create</Menu.Item>
  }
  render() {
    return (
      <Menu className="Navbar">
        
        <Menu.Item as={NavLink} exact to="/">BotMaker</Menu.Item>
        {this.renderMyPage()}
        
        {this.renderLoginLogout()}
      </Menu>
    );
  }
}

export default Navbar;