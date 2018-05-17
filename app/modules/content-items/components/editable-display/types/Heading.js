// @flow

import _ from 'lodash';
import * as React from 'react';

import type { Identifier } from 'types/model';
import type { HeadingContentItem } from '../../../model';

import { passThroughProps } from '..';
import DisplayBlockWrapper from '../DisplayBlockWrapper';
import EditableTextContent from '../EditableTextContent';

type PassedProps = {
  contentItem: HeadingContentItem,
  onEditPlainText: (id: Identifier, text: string) => void,
};

type Props = PassedProps;

const PureHeading = (props: Props): React.Node => {
  const { contentItem, onEditPlainText } = props;

  return (
    <DisplayBlockWrapper
      {..._.pick(props, passThroughProps)}
      iconName="header"
    >
      <EditableTextContent
        initialText={contentItem.text}
        onInput={(text: string) => onEditPlainText(contentItem.id, text)}
      />
    </DisplayBlockWrapper>
  );
};

const Heading = PureHeading;

export { PureHeading };
export default Heading;
