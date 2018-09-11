import React from 'react';
import scrollIntoView from "scroll-into-view";


const MessageHistory = (props) => {
    //receives messagehistory as props!

    //scrolling not working
    const scrollDiv = () => {
        return <div id="scroll"> </div>
    }
    const scrollDown = () => {
        scrollIntoView(scrollDiv());
    }
    ////
    
    const renderSentMessages = () => {
        return props.history.map((message, index) => {
            return <p key={index} className={`${message.sender}-message speech-bubble`}>{message.text}</p>
        })
    }
    
    
    return(
        <div className="messageHistory">
        {renderSentMessages()}
        </div>
    )
}

export default MessageHistory;