// @flow


import * as React from 'react';
import VoicePlayer from 'lib/react-voice-components/VoicePlayer';

type Props = {
  initContent: string,
  initPlay: boolean,
};

type State = {
  content: string,
  play: boolean,
};

class VoicePlayerToggle extends React.Component<Props, State> {
  static defaultProps = {
    initContent: 'render',
    initPlay: false,
  };

  static getDerivedStateFromProps = (nextProps: Props, prevState: State): State => {
    const nextState: State = { ...prevState };

    if (prevState.content !== nextProps.initContent) {
      nextState.content = nextProps.initContent;
    }
    if (prevState.play !== nextProps.initPlay) {
      nextState.play = nextProps.initPlay;
    }

    return nextState;
  };

  state: State = {
    content: '',
    play: false,
  };

  render(): React.Node {
    console.log(`render voiceplay, ${this.state.play}, ${this.state.content}`);
    let VoicePlayerNode: VoicePlayer;
    if (this.state.play) {
      VoicePlayerNode = (<VoicePlayer
        play={true}
        onEnd={(): void => {}}
        text={this.state.content}
      />);
    }
    else {
      VoicePlayerNode = null;
    }

    return (
      <div id="player">
        {VoicePlayerNode}
      </div>);
  }
}

export default VoicePlayerToggle;
