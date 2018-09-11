import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Form, Icon, Card, Divider } from 'semantic-ui-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class BotSnippet extends React.Component {
    state = {
        copied: false
    }
    copyToClipboard = (urlId) => {
        let link = `www.botmaker.com/bots/${urlId}`
        console.log(link)
        this.setState({
            copied: true
        })
        setTimeout((() => this.setState({copied: false})), 5000) //do you need this rly
    }
    render() {
        return(
            <Card>
                <Card.Content>
            <Card.Header><h2>{this.props.bot.name}</h2></Card.Header>
            {this.props.bot.description ? <Card.Description>{this.props.bot.description}</Card.Description> : <Card.Description>Write something about your bot</Card.Description>}
             <br />
                            <CopyToClipboard text={`www.botmaker.com/bots/${this.props.bot.url_id}`}>
                            <p>Share<Icon name="copy" onClick={() => this.copyToClipboard(this.props.bot.url_id)}/></p>
                            </CopyToClipboard>
                            
                            <Form.Input className="shareLink" value={`www.botmaker.com/bots/${this.props.bot.url_id}`}>
                                <input />
                                
                            </Form.Input>
                            {this.state.copied ? <p>Link copied to clipboard!</p> : null}
                            <div className="ui three buttons">
                            <Button inverted secondary as={Link} to={`/bots/${this.props.bot.url_id}`}>Chat</Button>
                            <Button inverted secondary as={Link} to={`/edit-bot/${this.props.bot.url_id}`}>Edit</Button>
                            <Button inverted secondary onClick={() => this.props.delete(this.props.bot.id)}>Delete</Button>
                            </div>
                            </Card.Content>
            </Card>
        )
    }
    
}

export default BotSnippet;