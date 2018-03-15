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

  switch (contentItem.type) {
    case plainTextContentItemTypes.PARAGRAPH:
      iconName = 'paragraph';
      break;
    case plainTextContentItemTypes.HEADING:
      iconName = 'header';
      break;
    default:
      iconName = 'warning sign';
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
