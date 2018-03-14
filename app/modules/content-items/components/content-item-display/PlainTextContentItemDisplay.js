// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Icon, Segment } from 'semantic-ui-react';

import { plainTextContentItemTypes } from '../../model';
import type { PlainTextContentItem } from '../../model';

type PassedProps = {
  contentItem: PlainTextContentItem,
};

type Props = TranslatorProps & PassedProps;

const PurePlainTextContentItemDisplay = (props: Props): React.Node => {
  const { contentItem } = props;
  let iconName: string;

  // #TODO highlights (using markdown?)

  switch (contentItem.type) {
    case plainTextContentItemTypes.PARAGRAPH:
      iconName = 'paragraph';
      break;
    case plainTextContentItemTypes.HEADING:
      iconName = 'heading';
      break;
    default:
      iconName = 'warning sign';
  }

  return (
    <Segment>
      <Icon name={iconName} />
      {contentItem.text}
    </Segment>
  );
};

const PlainTextContentItemDisplay = translate()(PurePlainTextContentItemDisplay);

export { PurePlainTextContentItemDisplay };
export default PlainTextContentItemDisplay;
