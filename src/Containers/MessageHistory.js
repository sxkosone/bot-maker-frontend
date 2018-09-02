import React from 'react';
import scrollIntoView from "scroll-into-view";


const MessageHistory = (props) => {

    const scrollDiv = () => {
        return <div id="scroll"> </div>
    }

    const renderSentMessages = () => {
        scrollDown()
        return props.history.map((message, index) => {
            return <p key={index} className={`${message.sender}-message speech-bubble`}>{message.text}</p>
        })
    }
    const scrollDown = () => {
        scrollIntoView(scrollDiv());
    }
    
    return(
        <div className="messageHistory">
        {renderSentMessages()}
        {scrollDiv()}
        {scrollDown()}
        </div>
    )
}

export default MessageHistory;