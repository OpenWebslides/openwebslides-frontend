// @flow
import * as React from 'react';
import { translate } from 'react-i18next';

// eslint-disable-next-line import/no-internal-modules
import VoicePlayer from 'lib/react-voice-components/VoicePlayer';

type PassedProps = {
  // A denormalized ROOT item containing the content to be displayed on this slide.
  content: string,
};

type Props = PassedProps;

const VoicePlayerToggleComp = (props: Props): React.Node => {
  const { content } = props;
  return (
    <VoicePlayer
      play={true}
      text={content}
    />);
};

const VoicePlayerToggle = translate()(VoicePlayerToggleComp);

export { VoicePlayerToggleComp };
export default VoicePlayerToggle;
