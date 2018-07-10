// @flow

import * as React from 'react';
import InlineMarkdown from 'core-components/inline-markdown';

import * as model from '../../../model';

const { DenormalizedHeadingContentItem } = model;

type PassedProps = {
  contentItem: DenormalizedHeadingContentItem,
  children?: React.Node,
  headingLevel: number,
};

type Props = PassedProps;

const PureHeading = (props: Props): React.Node => {
  const { contentItem, children, headingLevel } = props;
  const HeadingTag = `h${Math.min(headingLevel, 6)}`;

  return (
    <section className="ows-container ows-container--heading">
      <HeadingTag className="ows-container__item ows_heading">
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
