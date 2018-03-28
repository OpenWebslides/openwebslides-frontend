// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Icon, Segment } from 'semantic-ui-react';

import { plainTextContentItemTypes } from '../../model';
import type { PlainTextContentItem } from '../../model';

import EditableTextContent from '../helpers/EditableTextContent';

type PassedProps = {
  contentItem: PlainTextContentItem,
};

type Props = TranslatorProps & PassedProps;

const PurePlainTextContentItemDisplay = (props: Props): React.Node => {
  const { contentItem } = props;
  let iconName: string;
  let multiline: boolean;

  switch (contentItem.type) {
    case plainTextContentItemTypes.PARAGRAPH:
      iconName = 'paragraph';
      multiline = true;
      break;
    case plainTextContentItemTypes.HEADING:
      iconName = 'header';
      multiline = false;
      break;
    default:
      iconName = 'warning sign';
      multiline = false;
  }

  return (
    <Segment>
      <div style={{ display: 'table', width: '100%' }}>
        <div style={{ display: 'table-cell', width: '1%', paddingRight: '1rem' }}>
          <Icon name={iconName} color="grey" />
        </div>
        <div style={{ display: 'table-cell', width: '99%' }}>
          { /* $FlowFixMe */ }
          <EditableTextContent
            multiline={multiline}
            text={contentItem.text}
            onActivate={(): void => {}}
            onDeactivate={(): void => {}}
          />
        </div>
      </div>
    </Segment>
  );
};

const PlainTextContentItemDisplay = translate()(PurePlainTextContentItemDisplay);

export { PurePlainTextContentItemDisplay };
export default PlainTextContentItemDisplay;
