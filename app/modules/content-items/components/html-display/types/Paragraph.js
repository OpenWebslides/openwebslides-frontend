// @flow

import * as React from 'react';

/* import VoicePlayer from 'lib/react-voice-components/VoicePlayer';

<div id="voice" >
  <VoicePlayer
    play={true}
    onEnd={(): void => {}}
    text={contentItem.text}
  />
</div> */

import InlineMarkdown from 'core-components/inline-markdown';
import type { DenormalizedParagraphContentItem } from '../../../model';

type PassedProps = {
  contentItem: DenormalizedParagraphContentItem,
  children?: React.Node,
  containerClassName: string,
};

type Props = PassedProps;

const PureParagraph = (props: Props): React.Node => {
  const { contentItem, children, containerClassName } = props;


  return (
    <div className={`${containerClassName} ${containerClassName}--paragraph`}>
      <p className={`${containerClassName}__item ows_paragraph`}>
        <InlineMarkdown text={contentItem.text} />
      </p>
      {children}
    </div>
  );
};

PureParagraph.defaultProps = {
  children: null,
};

const Paragraph = PureParagraph;

export { PureParagraph };
export default Paragraph;
