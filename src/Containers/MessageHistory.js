import React from 'react';

const MessageHistory = (props) => {

    const renderSentMessages = () =>{
        return props.history.map((message, index) => {
            return <p key={index} className={`${message.sender}-message`}>{message.sender} says: {message.text}</p>
        })
    }
    return(
        <div className="messageHistory">
        {renderSentMessages()}
        </div>
    )
}

export default MessageHistory;