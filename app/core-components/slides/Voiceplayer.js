// @flow


import * as React from 'react';
import { Checkbox, Segment } from 'semantic-ui-react';
import VoicePlayer from 'lib/react-voice-components/VoicePlayer';

type Props = {
  initContent: string,
  initPlay: boolean,
  initToggle: boolean,
};

type State = {
  content: string,
  play: boolean,
  toggle: boolean,
};

class voicePlayer extends React.Component<Props, State> {
  static defaultProps = {
    initContent: 'rendered',
    initPlay: false,
    initToggle: false,
  };

  static getDerivedStateFromProps = (nextProps: Props, prevState: State): State => {
    const nextState: State = { ...prevState };

    if (prevState.content !== nextProps.initContent) {
      nextState.content = nextProps.initContent;
    }

    return nextState;
  };

  state: State = {
    content: '',
    play: false,
    toggle: false,
  };

  // haalt alle spans op van de slide en merged ze samen
  // om in text attribuut van voiceplayer te plaatsen
  read = (): void => {
    if (this.state.toggle) {
      this.setState({ toggle: false, play: false });
      console.log('off');
    }
    else {
      console.log('on');
      const elems = document.getElementsByClassName('inline-markdown');
      let i:number;
      const elementen = [];
      for (i = 0; i < elems.length; i += 1) {
        elementen.push(elems[i].innerHTML);
      }
      const res = elementen.join(' ');

      this.setState({ content: res, play: true, toggle: true });
      console.log(`${this.state.content}`);
    }
  };

  render(): React.Node {
    console.log(this.state.play);
    const VoicePlayerNode = (<VoicePlayer
      play={this.state.play}
      onEnd={(): void => {}}
      text={this.state.content}
    />);
    return (
      <div id="player">
        <Segment compact={true}>
          <Checkbox slider={true} onClick={this.read} checked={this.state.toggle} />
        </Segment>
        {VoicePlayerNode}

      </div>);
  }
}

export default voicePlayer;
