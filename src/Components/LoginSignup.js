import React from 'react';
//import cuid from 'cuid'
import { connect } from 'react-redux';
import { Form, Button, Tab } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'


const LOGIN_URL = "https://peaceful-journey-69488.herokuapp.com/login"
const USER_URL = "https://peaceful-journey-69488.herokuapp.com/users"

class LoginSignup extends React.Component {
    state = {
        username: "",
        password: "",
        error: "",
        redirect: false
    }

    login = () => {
        console.log("logging in")
        let login_params = {
            username: this.state.username,
            password: this.state.password
          };
        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(login_params)
        })
        .then(r => r.json())
        .then(response => {
            if (response.success) {
                localStorage.setItem("token", response.token);
                console.log("received this response",response)
                //used currently to tell navbar to rerender
                this.props.setCurrentUser(response.current_user)
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
    

    //save user to the backend
    createUserAndLogThemIn = () => {
        console.log("creating new user")
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        
        fetch(USER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({"user": user})})
            .then(r => r.json())
            .then(response => {
                if(response.success) {
                    this.login()
                } else {
                    if(response.errors) {
                        this.setState({
                            error: Object.keys(response.errors)[0]+" "+response.errors.username[0]
                        })
                    } else {
                        this.setState({
                            error: "Something went wrong, unable to create new user"
                        })
                    }
                    
                }
            })
            // .then(this.login)
            // .catch(error => error.json()).then(console.log)
    }

    renderLoginForm() {
        return(
            <Form onSubmit={this.login}>
            <br />
            <h2>Login</h2>
            
                <Form.Field>
                <label>Username</label>
                <input type="text" placeholder='First Name' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} required/>
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input type="password" placeholder='Password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} required/>
                </Form.Field>
                <Button color="black" type='submit'>Login</Button>
            </Form>
        )
    }

    renderSignUpForm() {
        return (
            <Form onSubmit={this.signup}>
            <br />
            <h2>Sign up</h2>
                <Form.Field>
                <label>Username</label>
                <input type="text" placeholder='First Name' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} required/>
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input type="password" placeholder='Password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} required/>
                </Form.Field>
                <Button color="blue" type='submit'>Signup</Button>
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
            <div className="container">
                {/* {this.props.info !== "" ? <Message color="violet">{this.props.info}</Message> : null} */}
                {this.renderRedirect()}
                {this.state.error !== "" ? <p className="error-message">{this.state.error}</p> : null}
                <Tab panes={this.renderPanes()} />
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (current) => dispatch({ type: "LOG_IN", currentUser: current })
    }
}

const mapStateToProps = state => {
    return {
        info: state.messages.info,
        error: state.messages.error
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginSignup));