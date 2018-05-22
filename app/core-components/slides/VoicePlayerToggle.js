// @flow
import * as React from 'react';
import { translate } from 'react-i18next';
import VoicePlayer from 'lib/react-voice-components/VoicePlayer';


type PassedProps = {
  // A denormalized ROOT item containing the content to be displayed on this slide.
  content: string,
  pausePlay: boolean,
  startPlay: boolean,
};

type Props = PassedProps;

const VoicePlayerToggleComp = (props: Props): React.Node => {
  const { content, pausePlay, startPlay } = props;
  return (
    <VoicePlayer
      play={startPlay}
      pause={pausePlay}
      onEnd={(): void => {}}
      text={content}
    />);
};

const VoicePlayerToggle = translate()(VoicePlayerToggleComp);

export { VoicePlayerToggleComp };
export default VoicePlayerToggle;
