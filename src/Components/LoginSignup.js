import React from 'react';
//import cuid from 'cuid'
import { connect } from 'react-redux';
import { Form, Button, Message, Tab } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'


const LOGIN_URL = "http://localhost:3000/login"

class LoginSignup extends React.Component {
    state = {
        username: "",
        password: "",
        error: "",
        redirect: false
    }

    login = () => {
        console.log("logging in")
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
                console.log("received this response",response)
                //probably not necessary here, because doesn't have scripts at this point.
                //this.props.setCurrentUser(response.current_user)
                this.setState({ 
                    error: "",
                    redirect: true
                });

            } else {
                this.setState({ error: "Invalid username or password" });
            }
        })
    }
    signup = () => {
        console.log("signing in...")
        //first fetch ->, create a user with these credentials
        //then fetch ->, log them in
        //login function changes redirect to true and redirect to /my-page
        this.createUserAndLogThemIn()
        
    }
    signUpAndSaveBot = () => {
        //if user has already some scripts, then also save scripts. Otherwise, just sign up and log in
    }
    

    //save user to the backend
    createUserAndLogThemIn = () => {
        console.log("creating new user")
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({"user": user})})
            .then(r => r.json())
            .then(console.log)
            .then(this.login)
            .catch(error => error.json()).then(console.log)
    }

    renderLoginForm() {
        return(
            <Form onSubmit={this.login}>
            
            <h2>Login</h2>
            {this.state.error !== "" ? <p>{this.state.error}</p> : null}
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
        )
    }

    renderSignUpForm() {
        return (
            <Form onSubmit={this.signup}>
            <h2>Sign up</h2>
                {this.state.error !== "" ? <Message error header='Oh no!' content={this.state.error} /> : null}
                <Form.Field>
                <label>Username</label>
                <input placeholder='First Name' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input placeholder='Password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                </Form.Field>
                <Button type='submit'>Signup</Button>
            </Form>
        )
    }

    renderPanes = () =>{
        return [{menuItem: "Login", render: () => this.renderLoginForm()}, {menuItem: "Signup", render: () => this.renderSignUpForm()}]
    }

    //redirect logged in users to their userpage
    renderRedirect = () => {
        if (this.state.redirect) {
            this.props.history.goBack()
        }
    }

    render() {
        return(
        <div className="LoginSignup">
        {this.renderRedirect()}
        <Tab panes={this.renderPanes()} />
        </div>
        )
    }
}

//NOT USED AT THE MOMENT!!! DELETE?
// const mapStateToProps = state => {
//     
//     // const nonEmptyScripts = state.scripts.length !== 0
//     // return {
//     //     alreadyCreatedBot: nonEmptyScripts
//     // }
// }

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (current) => dispatch({ type: "LOG_IN", currentUser: current })
    }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginSignup));