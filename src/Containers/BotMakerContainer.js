import React from 'react';
import BotScriptContainer from './BotScriptContainer';
import BotChatContainer from './BotChatContainer';

class BotMakerContainer extends React.Component {
  render() {
    return (
      <div className="BotMakerContainer">
        BotMakerContainer
        <BotScriptContainer />
        {/* where will this container end up in the final view? should i make own route? */}
        <BotChatContainer />
      </div>
    );
  }
}

export default BotMakerContainer;