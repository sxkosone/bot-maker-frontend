import React from "react";
import { connect } from 'react-redux';
import {Form,TextArea, Button} from 'semantic-ui-react';

const BOT_URL = "http://localhost:3000/training/"

class BotTraining extends React.Component {
    state = {
        category1: "",
        category2: "",
        data1: "",
        data2: "",
        responses1: "",
        responses2: ""
    }
    handleSubmit = () => {
        
        let token = localStorage.getItem("token")
        
        let notFilled = false
        for(let input in this.state) {
            if (this.state[input]==="") {
                notFilled = true
            }
        }
        
        if (token && !notFilled) {
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
            .then(r => r.json()).then(console.log)
        } else {
            console.log("unable to train your bot because reasons")
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return(
            <div className="BotTraining content">
            <h1>Train your bot to recognize categories</h1>
            <p className="highlight">This app uses machine learning to make bots better at recognising users' messages. You can add two categories, between which your bot should be able to distinguish. You should also add training data, like sentences or words, that represent that category. This text will be used to teach the bot what messages should belong to which category.</p>
            <Form>
                <Form.Group widths="equal">
                    <Form.Input required name="category1" onChange={this.handleChange} fluid label='Category #1' placeholder='Name your category with a word, like "happy"' />
                    <Form.Input required name="category2" onChange={this.handleChange} fluid label='Category #2' placeholder='Name your category with a word, like "happy"' />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.TextArea required name="data1" onChange={this.handleChange} autoHeight label="Example text for Category #1" placeholder="add some training text for Category #1"/>
                    <Form.TextArea required name="data2" onChange={this.handleChange} autoHeight label="Example text for Category #2" placeholder="add some training text for Category #2"/>
                </Form.Group>
                <p>Finally, add the responses to each category. What should the bot respond with if it recognizes a category from the user's message? You can add several response options, separated by "//"</p>
                <Form.Group widths="equal">
                    <Form.Input required name="responses1" onChange={this.handleChange} fluid label='Responses to Category #1' placeholder='Write responses, separated by "//"' />
                    <Form.Input required name="responses2" onChange={this.handleChange} fluid label='Responses to Category #2' placeholder='Write responses, separated by "//"' />
                </Form.Group>
                <Button fluid inverted secondary onClick={this.handleSubmit}>Start training</Button >
            </Form>
            </div>
        )
    }
}

export default connect()(BotTraining);