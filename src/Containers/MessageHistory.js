import React from 'react';


class MessageHistory extends React.Component {
    //receives messagehistory as props!

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
      
      componentDidMount() {
        this.scrollToBottom();
      }
      
      componentDidUpdate() {
        this.scrollToBottom();
      }
    
    renderSentMessages = () => {
        return this.props.history.map((message, index) => {
            return <p key={index} className={`${message.sender}-message speech-bubble`}>{message.text}</p>
        })
    }
    
    render() {
        return(
            <React.Fragment>
                <div id="messageHistory">
                {this.renderSentMessages()}
                {/* dummy div to enable scroll down with new messages */}
                <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
                </div>
                </div>
    
                
            </React.Fragment>
        )
    }
    
}

export default MessageHistory;