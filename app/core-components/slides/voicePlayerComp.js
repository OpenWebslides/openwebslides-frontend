/*  eslint-disable */

import * as React from 'react';
import { translate } from 'react-i18next';
import VoicePlayer from 'lib/react-voice-components/VoicePlayer';


class voicePlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }
    read = () => {
      const elems = document.getElementsByClassName('inline-markdown');
      let i:number = 0;
      let elementen = [];
      for (i = 0; i < elems.length; i += 1) {
        elementen.push(elems[i].innerHTML);
      }
      let res = elementen.join(" ");
      // alle elementen worden samengevoegd, werkt
      this.setState({content: res}, function () {
        console.log(this.state.content);
        // voiceplayer wordt niet opnieuw gerenderd.
      });

    };

    render(): React.Node {
      return (
        <div id="player">
          <button onClick={this.read.bind(this)}>Click me</button>
          <VoicePlayer
            play={true}
            onEnd={(): void => {}}
            text={this.state.content}
          />
        </div>);
    }
}

const VoicePlay = translate()(voicePlayer);

export { voicePlayer };
export default VoicePlay;
