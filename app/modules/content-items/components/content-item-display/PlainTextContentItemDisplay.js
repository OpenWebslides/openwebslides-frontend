// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import { Grid, Icon, Segment } from 'semantic-ui-react';

import { plainTextContentItemTypes } from '../../model';
import type { PlainTextContentItem } from '../../model';

type PassedProps = {
  contentItem: PlainTextContentItem,
};

type Props = TranslatorProps & PassedProps;

const allowedTypes = [
  'emphasis',
  'strong',
  'inlineCode',
  'link',
];

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
      <Grid verticalAlign="middle">
        <Grid.Row style={{ flexWrap: 'nowrap' }}>
          <Grid.Column style={{ width: 'auto' }}>
            <Icon name={iconName} color="grey" />
          </Grid.Column>
          <Grid.Column style={{ width: 'auto' }}>
            <ReactMarkdown
              source={contentItem.text}
              allowedTypes={allowedTypes}
              unwrapDisallowed={true}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const PlainTextContentItemDisplay = translate()(PurePlainTextContentItemDisplay);

export { PurePlainTextContentItemDisplay };
export default PlainTextContentItemDisplay;
