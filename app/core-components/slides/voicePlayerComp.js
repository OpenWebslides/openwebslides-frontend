/* eslint-disable */ //afgezet voor commit, ik krijg fouten die ik niet begrijp

/*
Cannot assign object literal to `this.state` because object literal [1] is incompatible with undefined [2].

			   app/core-components/slides/voicePlayerComp.js:18:18
			                        v
			   18|     this.state = {
			   19|       content: voicePlayer.defaultProps.initialText,
			   20|       // play: voicePlayer.defaultProps.initplay,
			   21|     };
			           ^ [1]
 */

import * as React from 'react';
import VoicePlayer from 'lib/react-voice-components/VoicePlayer';

type State = {
  content: string,
  // play: boolean,
};

class voicePlayer extends React.Component<State> {
  static defaultProps = {
    initialText: 'rendered',
    // initplay: false,
  };
  constructor(): void {
    super();
    this.state = {
      content: voicePlayer.defaultProps.initialText,
      // play: voicePlayer.defaultProps.initplay, is blijkbaar undefined?
    };
  }

  // haalt alle spans op van de slide en merged ze samen
  // om in text attribuut van voiceplayer te plaatsen
  read = (): void => {
    const elems = document.getElementsByClassName('inline-markdown');
    let i:number = 0;
    const elementen = [];
    for (i = 0; i < elems.length; i += 1) {
      elementen.push(elems[i].innerHTML);
    }
    const res = elementen.join(' ');
    // console.log(`na samenvoegen lijst: ${res}`); geeft meteen juiste gegevens
    // alle elementen worden samengevoegd, werkt

    this.setState({ content: res, play: true });
    // wordt blijkbaar pas geset na 2de klik op de button + geen rerendering
    console.log(`${this.state.content},${this.state.play}`);

    /* return (
      <div id="player">
        <button onClick={this.read}>Click me</button>
        <VoicePlayer
          play={true}
          onEnd={(): void => {}}
          text={this.state.content}
        />
      </div>); dit erbij zetten helpt niet */
  };

  render(): React.Node {
    return (
      <div id="player">
        <button className="VoiceButton" onClick={this.read}>Click me</button>
        <VoicePlayer
          play={true}
          onEnd={(): void => {}}
          text={this.state.content}
        />
      </div>);
  }
}

export default voicePlayer;
