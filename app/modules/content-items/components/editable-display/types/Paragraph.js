// @flow

import _ from 'lodash';
import * as React from 'react';

import type { ParagraphContentItem } from '../../../model';

import { passThroughProps } from '..';
import DisplayBlockWrapper from '../DisplayBlockWrapper';
import EditableTextContent from '../EditableTextContent';

type PassedProps = {
  contentItem: ParagraphContentItem,
};

type Props = PassedProps;

const PureParagraph = (props: Props): React.Node => {
  const { contentItem } = props;

  return (
    <DisplayBlockWrapper
      {..._.pick(props, passThroughProps)}
      iconName="paragraph"
    >
      <EditableTextContent
        multiline={true}
        text={contentItem.text}
        onActivate={(): void => {}}
        onDeactivate={(): void => {}}
      />
    </DisplayBlockWrapper>
  );
};

const Paragraph = PureParagraph;

export { PureParagraph };
export default Paragraph;
