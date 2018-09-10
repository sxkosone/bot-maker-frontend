import React from "react";
import { connect } from 'react-redux';

class BotTraining extends React.Component {
    render() {
        return(
            <div className="BotTraining content">
            <h1>Train your bot to recognize categories</h1>
            </div>
        )
    }
}

export default connect()(BotTraining);