// @flow

import _ from 'lodash';
import * as React from 'react';

import type { HeadingContentItem } from '../../../model';

import { passThroughProps } from '..';
import DisplayBlockWrapper from '../DisplayBlockWrapper';
import EditableTextContent from '../EditableTextContent';

type PassedProps = {
  contentItem: HeadingContentItem,
};

type Props = PassedProps;

const PureHeading = (props: Props): React.Node => {
  const { contentItem } = props;

  return (
    <DisplayBlockWrapper
      {..._.pick(props, passThroughProps)}
      iconName="header"
    >
      <EditableTextContent
        multiline={false}
        text={contentItem.text}
        onActivate={(): void => {}}
        onDeactivate={(): void => {}}
      />
    </DisplayBlockWrapper>
  );
};

const Heading = PureHeading;

export { PureHeading };
export default Heading;
