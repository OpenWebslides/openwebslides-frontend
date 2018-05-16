// @flow

import * as React from 'react';

import InlineMarkdown from 'core-components/inline-markdown';
import type { DenormalizedParagraphContentItem } from '../../../model';
import type { SlideStyling } from '../../../../slide-styling/model';
import { contentItemTypes } from '../../../model';

type PassedProps = {
  contentItem: DenormalizedParagraphContentItem,
  children?: React.Node,
  containerClassName: string,
  slideStyling: SlideStyling,
};

type Props = PassedProps;

const PureParagraph = (props: Props): React.Node => {
  const { contentItem, children, containerClassName, slideStyling } = props;
  const styling = { color: slideStyling.rules[contentItemTypes.PARAGRAPH].color };

  return (
    <div className={`${containerClassName} ${containerClassName}--paragraph`}>
      <p className={`${containerClassName}__item ows_paragraph`}>
        <span style={styling}>
          <InlineMarkdown text={contentItem.text} />
        </span>
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
