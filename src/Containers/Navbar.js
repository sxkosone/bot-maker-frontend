import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {
  
  //refactor to just one function!
  

  renderNavLinksForLoggedInOrOut = () => {
    return localStorage.getItem("token") ? 
    <React.Fragment><Menu.Item as={NavLink} exact to="/my-page">My Bots</Menu.Item><Menu.Item as={Link} to="/" onClick={this.props.logout} position="right">Log out</Menu.Item></React.Fragment> : 
    <React.Fragment>
    <Menu.Item as={NavLink} exact to="/create">Create</Menu.Item>
    <Menu.Item as={NavLink} to="/login" position="right">Login</Menu.Item>
    </React.Fragment>
  }
  render() {
    return (
      <Menu className="Navbar top fixed">
        
        <Menu.Item as={NavLink} exact to="/">BotMaker</Menu.Item>
        
        {this.renderNavLinksForLoggedInOrOut()}
      </Menu>
    );
  }
}

export default Navbar;