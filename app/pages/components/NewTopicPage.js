// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Grid, Form, Input, TextArea, Button } from 'semantic-ui-react';

import Page from '../Page';

type Props = TranslatorProps & { /* new props go here */ };

const NewTopicPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Page>
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column>
            <h1>{t('pages:topic_new.title')}</h1>
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
      </Grid.Row>
    </Page>
  );
};

export { NewTopicPage as PureNewTopicPage };
export default translate()(NewTopicPage);
