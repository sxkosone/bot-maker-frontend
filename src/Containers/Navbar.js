import React from 'react';
import {Link, NavLink} from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <div className="Navbar">
        
        <NavLink exact to="/">BotMaker</NavLink>
        <NavLink exact to="/create">Create</NavLink>
        <NavLink to="/">Login</NavLink>
      </div>
    );
  }
}

export default Navbar;