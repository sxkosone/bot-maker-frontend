import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const USER_URL = "http://localhost:3000/user"

class UserPage extends React.Component {
    state = {
        user: null
    }

    componentDidMount() {
        let token = localStorage.getItem("token")
        if (token) {
            console.log("in the user fetch")
            fetch(USER_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(userObj => {
                this.setState({ user: userObj })
            })
            .catch(e => e.json()).then(console.log)
        }
    }

    render() {
        return(
            <div className="UserPage">
                {this.state.user ? (
                    <div>
                        <h2>Welcome, {this.state.user.username}!</h2>
                        <h3>Your bot {this.state.user.bot_name} lives here: <Link to={`/bots/${this.state.user.bot_url_id}`}>www.botmaker.com/bots/{this.state.user.bot_url_id}</Link></h3>
                        <Button as={Link} to="/edit-bot">Edit your bot</Button>
                    </div>
                ) : <h2>You must login first</h2>}
            </div>
        )
    }
}

export default UserPage;