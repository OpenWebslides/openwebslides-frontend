// @flow

import _ from 'lodash';
import * as React from 'react';

import type { Identifier } from 'types/model';

import { contentItemTypes } from '../../../model';
import type { HeadingContentItem, ContentItemType } from '../../../model';

import { passThroughProps } from '..';
import DisplayBlockWrapper from '../DisplayBlockWrapper';
import EditableTextContent from '../EditableTextContent';

type PassedProps = {
  contentItem: HeadingContentItem,
  onEditPlainText: (id: Identifier, type: ContentItemType, text: string) => void,
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
        onDeactivate={(text: string) => onEditPlainText(
          contentItem.id,
          contentItemTypes.HEADING,
          text,
        )}
      />
    </DisplayBlockWrapper>
  );
};

const Heading = PureHeading;

export { PureHeading };
export default Heading;
