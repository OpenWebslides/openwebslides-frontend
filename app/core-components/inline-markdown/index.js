// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const allowedMarkdownTypes = [
  'emphasis',
  'strong',
  'inlineCode',
  'link',
];

type PassedProps = {
  text: string,
};

type Props = TranslatorProps & PassedProps;

const PureInlineMarkdown = (props: Props): React.Node => {
  const { text } = props;

  return (
    <ReactMarkdown
      className="inline-markdown"
      source={text}
      allowedTypes={allowedMarkdownTypes}
      unwrapDisallowed={true}
      renderers={{ root: 'span' }}
    />
  );
};

const InlineMarkdown = translate()(PureInlineMarkdown);

export { PureInlineMarkdown };
export default InlineMarkdown;
