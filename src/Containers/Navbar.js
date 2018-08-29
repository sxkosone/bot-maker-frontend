import React from 'react';
import { NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {
  render() {
    return (
      <Menu className="Navbar">
        
        <Menu.Item as={NavLink} exact to="/">BotMaker</Menu.Item>
        <Menu.Item as={NavLink} exact to="/create">Create</Menu.Item>
        
        <Menu.Item as={NavLink} to="/" position="right">Login</Menu.Item>
      </Menu>
    );
  }
}

export default Navbar;