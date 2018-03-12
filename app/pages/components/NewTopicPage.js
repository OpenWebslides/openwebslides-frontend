// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Form, Input, TextArea, Button, Segment, Grid, Menu } from 'semantic-ui-react';

import Page from '../Page';

type Props = TranslatorProps & { /* new props go here */ };

const NewTopicPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Page>
      <Grid stretched={true}>
        <Grid.Column stretched={true} width={2}>
          <Menu vertical={true} fluid={true}>
            <Menu.Header>
              <Segment vertical={true}>
                <Link to="/topics">{t('common:link.topics')}</Link>
              </Segment>
            </Menu.Header>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched={true} width={8}>
          <h1>Create new topic</h1>
          <Form>
            <Form.Field id="form-input-control-title" control={Input} label="Title" placeholder="Title" />
            <Form.Field id="form-textarea-control-description" control={TextArea} label="Description" placeholder="Description" />
            <Form.Group>
              <Form.Field id="form-button-control-public" control={Button}>
                <Link to="/Library">Cancel</Link>
              </Form.Field>
              <Form.Field id="form-button-control-public" control={Button} content="Confirm" />
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid>
    </Page>
  );
};


export { NewTopicPage as PureNewTopicPage };
export default translate()(NewTopicPage);
