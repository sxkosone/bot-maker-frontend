import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

const LOGIN_URL = "http://localhost:3000/login"

class LoginSignup extends React.Component {
    state = {
        username: "",
        password: "",
        error: ""
    }
    login = () => {
        let params = {
            username: this.state.username,
            password: this.state.password
          };
        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(r => r.json())
        .then(response => {
            if (response.success) {
                localStorage.setItem("token", response.token);
                this.setState({ error: "" });
            } else {
                this.setState({ error: "Invalid username or password" });
            }
        })

    }

    render() {
        return(
        <div className="LoginSignup">
        <Form onSubmit={this.login}>
            {this.state.error ? <Message error header='Oh no!' content={this.state.error} /> : null}
            <Form.Field>
            <label>Username</label>
            <input placeholder='First Name' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
            </Form.Field>
            <Form.Field>
            <label>Password</label>
            <input placeholder='Password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
            </Form.Field>
            <Button type='submit'>Login</Button>
        </Form>
        </div>
        )
    }
}

export default LoginSignup;