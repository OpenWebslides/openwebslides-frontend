// @flow

import * as React from 'react';
import ReactMarkdown from 'react-markdown';

type PassedProps = {|
  text: string,
|};

type Props = {| ...PassedProps |};

const allowedMarkdownTypes = [
  'text',
  'emphasis',
  'strong',
  'inlineCode',
  'link',
  'delete',
];

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

const InlineMarkdown = PureInlineMarkdown;

export { PureInlineMarkdown };
export default InlineMarkdown;
