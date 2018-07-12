// @flow

import * as React from 'react';

import InlineMarkdown from 'core-components/inline-markdown';

import * as m from '../../../model';

type PassedProps = {
  contentItem: m.DenormalizedParagraphContentItem,
  children?: React.Node,
};

type Props = PassedProps;

const PureParagraph = (props: Props): React.Node => {
  const { contentItem, children } = props;

  return (
    <div className="ows-container ows-container--paragraph">
      <p className="ows-container__item ows_paragraph">
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
