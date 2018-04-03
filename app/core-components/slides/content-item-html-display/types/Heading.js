// @flow

import * as React from 'react';

import InlineMarkdown from 'core-components/inline-markdown';
import type { DenormalizedHeadingContentItem } from 'modules/content-items';

type PassedProps = {
  contentItem: DenormalizedHeadingContentItem,
  children?: React.Node,
  headingLevel: number,
  containerClassName: string,
};

type Props = PassedProps;

const PureHeading = (props: Props): React.Node => {
  const { contentItem, children, headingLevel, containerClassName } = props;
  const HeadingTag = `h${Math.min(headingLevel, 6)}`;

  return (
    <section className={`${containerClassName} ${containerClassName}--heading`}>
      <HeadingTag className={`${containerClassName}__item ows_heading`}>
        <InlineMarkdown text={contentItem.text} />
      </HeadingTag>
      {children}
    </section>
  );
};

PureHeading.defaultProps = {
  children: null,
};

const Heading = PureHeading;

export { PureHeading };
export default Heading;
