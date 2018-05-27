// @flow

import * as React from 'react';

import InlineMarkdown from 'core-components/inline-markdown';
import type { State } from 'types/state';

import type { DenormalizedHeadingContentItem } from '../../../model';

import type { SlideStyling } from '../../../../slide-styling/model';
import { contentItemTypes } from '../../../model';


type PassedProps = {
  contentItem: DenormalizedHeadingContentItem,
  children?: React.Node,
  headingLevel: number,
  containerClassName: string,
  slideStyling: SlideStyling,
};

type Props = PassedProps;

const PureHeading = (props: Props, state: State): React.Node => {
  const { contentItem, children, headingLevel, containerClassName, slideStyling } = props;

  const HeadingTag = `h${Math.min(headingLevel, 6)}`;
  // eslint-disable-next-line flowtype/require-variable-type
  let styling = { color: slideStyling.rules[contentItemTypes.HEADING].color };
  styling = { ...styling, fontFamily: slideStyling.rules[contentItemTypes.HEADING].font };
  return (
    <section className={`${containerClassName} ${containerClassName}--heading`}>
      <HeadingTag style={styling} className={`${containerClassName}__item ows_heading`}>
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
