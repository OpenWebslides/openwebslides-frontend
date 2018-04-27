// @flow


import * as React from 'react';
import { translate } from 'react-i18next';
import VoicePlayer from 'lib/react-voice-components/VoicePlayer';


type PassedProps = {
  // A denormalized ROOT item containing the content to be displayed on this slide.
  content: string,
};

type Props = PassedProps;

const VoicePlayerToggleComp = (props: Props): React.Node => {
  const { content } = props;
  console.log(`render voiceplay,${content}`);
  return (
    <VoicePlayer
      play={true}
      onEnd={(): void => {}}
      text={content}
    />);
};

const VoicePlayerToggle = translate()(VoicePlayerToggleComp);

export { VoicePlayerToggleComp };
export default VoicePlayerToggle;
