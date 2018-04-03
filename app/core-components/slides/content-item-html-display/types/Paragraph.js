// @flow

import * as React from 'react';

import InlineMarkdown from 'core-components/inline-markdown';
import type { DenormalizedParagraphContentItem } from 'modules/content-items';

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
