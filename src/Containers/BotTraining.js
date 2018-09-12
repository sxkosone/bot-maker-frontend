import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Form, Button, Loader, Dimmer, Icon} from 'semantic-ui-react';

const BOT_URL = "https://peaceful-journey-69488.herokuapp.com/training/"
const CLASSIFIER_URL = "https://peaceful-journey-69488.herokuapp.com/classifier/"

class BotTraining extends React.Component {
    state = {
        category1: "",
        category2: "",
        data1: "",
        data2: "",
        responses1: "",
        responses2: "",
        message: "",
        loading: true
    }

    componentDidMount() {
        //retrieve existing scripts and training data from the backend!
        let token = localStorage.getItem("token")
        if(token) {
            fetch(CLASSIFIER_URL+this.props.botId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }).then(r => r.json())
            .then(r => {
                if(r.classifier) {
                    let responses1 = r.classifier_responses.filter(resp => resp.category === r.classifier.category_1)
                    let responses2 = r.classifier_responses.filter(resp => resp.category === r.classifier.category_2)
                    
                    this.setState({
                        category1: r.classifier.category_1,
                        category2: r.classifier.category_2,
                        data1: r.classifier.data_1,
                        data2: r.classifier.data_2,
                        responses1: responses1.map(obj => obj.text).join("//"),
                        responses2: responses2.map(obj => obj.text).join("//"),
                        loading: false
                    })
                } else {
                    this.setState({
                        loading: false
                    })
                }
                
            })
        } else {
            this.setState({
                loading: false,
                message: "You must be logged in to train bots!"
            })
        }
        //check if button should be disabled
        //this.fieldsEmpty()
        
    }

    handleSubmit = () => {
        this.setState({
            loading: true
        })
        let token = localStorage.getItem("token")
        
        if (token) {
            const responses1Array = this.state.responses1.split("//")
            const responses2Array = this.state.responses2.split("//")
            const trainingData = {...this.state, responses: {responses1: responses1Array, responses2: responses2Array}}
            console.log("submitting this", trainingData)
            fetch(BOT_URL+this.props.botId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({"bot": trainingData})            
            })
            .then(r => r.json()).then(r => {
                console.log(r)
                this.setState({
                    message: r.message,
                    loading: false
                })
                setTimeout(() => this.setState({ message: "" }), 10000)
            })
        } else {
            console.log("unable to train your bot because reasons")
            // if(!token) {
            //     this.setState({
            //         message: "Unable to train your bot unless all fields are filled!",
            //         loading: false
            //     })
            // } else {
            //     this.setState({
            //         message: "Something went wrong, unable to train your bot at the moment.",
            //         loading: false
            //     })
            // }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showLoader = () => {
        if(this.state.loading) {
            return (
                <Dimmer active>
                    <Loader size="large" inverted>Training...</Loader>
                </Dimmer>
            )
        }
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            this.props.history.goBack()
        }
    }
    fieldsEmpty = () => {
        for(let input in this.state) {
            //debugger
            if (this.state[input]==="" && input !== "message") {
                return true
            }
        }
        return false
    }
    render() {
        return(
            <div className="BotTraining content">
            {this.showLoader()}
            {this.state.message !== "" ? <h2>{this.state.message}!</h2> : null}
            <h1>Train your bot</h1>
            <h2>Bots can learn to classify messages in two categories</h2>
            <p>This app uses machine learning to make bots better at recognising users' messages. You can add two categories, between which your bot should be able to distinguish. You should also add training data, like sentences or words, that represent that category. This text will be used to teach the bot what messages should belong to which category.</p>
            <Form>
                <Form.Group widths="equal">
                    <Form.Input required name="category1" onChange={this.handleChange} fluid label='Category #1' placeholder='Name your category with a word, like "happy"' value={this.state.category1}/>
                    <Form.Input required name="category2" onChange={this.handleChange} fluid label='Category #2' placeholder='Name your category with a word, like "happy"' value={this.state.category2}/>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.TextArea required name="data1" onChange={this.handleChange} autoHeight label="Example text for Category #1" placeholder="add some training text for Category #1" value={this.state.data1}/>
                    <Form.TextArea required name="data2" onChange={this.handleChange} autoHeight label="Example text for Category #2" placeholder="add some training text for Category #2" value={this.state.data2}/>
                </Form.Group>
                <p>Finally, add the responses to each category. What should the bot respond with if it recognizes a category from the user's message? You can add several response options, separated by "//"</p>
                <Form.Group widths="equal">
                    <Form.Input required name="responses1" onChange={this.handleChange} fluid label='Responses to Category #1' placeholder='Write responses, separated by "//"' value={this.state.responses1}/>
                    <Form.Input required name="responses2" onChange={this.handleChange} fluid label='Responses to Category #2' placeholder='Write responses, separated by "//"' value={this.state.responses2}/>
                </Form.Group>
                
                <Button color="blue" as={Link} to={`/edit-bot/${this.props.botId}`}><Icon name="arrow left"/>Back to editing</Button >
                <Button disabled={this.fieldsEmpty()} floated="right" color="green" onClick={this.handleSubmit}>Start training<Icon name="arrow right"/></Button >
                
            </Form>
            </div>
        )
    }
}


export default BotTraining;