// @flow

import * as React from 'react';
import VoicePlayer from 'lib/react-voice-components/VoicePlayer';

type Props = {
  initialText: string,
};

type State = {
  content: string,
};

class voicePlayer extends React.Component<Props, State> {
  static defaultProps = {
    initialText: '',
  };
  constructor(props: Props): void {
    super(props);
    this.state = {
      content: props.initialText,
    };
  }

  componentWillReceiveProps = (props: Props): void => {
    if (this.state.content !== props.initialText) {
      this.setState({ content: props.initialText });
    }
  };

  read = (): React.Node => {
    const elems = document.getElementsByClassName('inline-markdown');
    let i:number = 0;
    const elementen = [];
    for (i = 0; i < elems.length; i += 1) {
      elementen.push(elems[i].innerHTML);
    }
    const res = elementen.join(' ');
    // alle elementen worden samengevoegd, werkt

    this.setState({ content: res });
    console.log(this.state.content);

    return (
      <div id="player">
        <button onClick={this.read}>Click me</button>
        <VoicePlayer
          play={true}
          onEnd={(): void => {}}
          text={this.state.content}
        />
      </div>);
  };

  render(): React.Node {
    return (
      <div id="player">
        <button onClick={this.read}>Click me</button>
        <VoicePlayer
          play={true}
          onEnd={(): void => {}}
          text={this.state.content}
        />
      </div>);
  }
}

export default voicePlayer;
