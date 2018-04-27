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

class VoicePlayerToggle extends React.Component<Props, State> {
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

  render(): React.Node {
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
        <Segment compact={true}>
          <Checkbox slider={true} checked={this.state.toggle} />
        </Segment>
        {VoicePlayerNode}

      </div>);
  }
}

export default VoicePlayerToggle;
