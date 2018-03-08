// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Form, Input, TextArea, Button, Segment, Grid, Icon, Image, Menu } from 'semantic-ui-react';

type Props = TranslatorProps & { /* new props go here */ };

const MenuRight = (): React.Node => {
  return (
    <Menu.Menu position="right">
      <Menu.Item>
        <Icon name="bell outline" size="large" />
      </Menu.Item>
      <Menu.Item>
        <strong>Professor X</strong>
      </Menu.Item>
      <Menu.Item>
        <Icon name="user" size="large" circular={true} inverted={true} />
      </Menu.Item>
    </Menu.Menu>
  );
};

const NewTopicPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <div>
      <Menu secondary={true} attached="top">
        <Menu.Item icon={true}>
          <Image size="tiny" src="/assets/images/logo.png" href="/" />
          {t('app:title')}
        </Menu.Item>
        <MenuRight />
      </Menu>
      <Grid stretched={true}>
        <Grid.Column stretched={true} width={2}>
          <Menu vertical={true} fluid={true}>
            <Menu.Header>
              <Segment vertical={true}>
                <Link to="/topics">Topics</Link>
              </Segment>
              <Segment vertical={true}>
                <Link to="/Library">Library</Link>
              </Segment>
            </Menu.Header>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched={true} width={8}>
          <h1>Create new topic</h1>
          <Form>
            <Form.Field id="form-input-control-title" control={Input} label="Title" placeholder="Title" />
            <Form.Field id="form-textarea-control-description" control={TextArea} label="Discription" placeholder="Description" />
            <Form.Group>
              <Form.Field id="form-button-control-public" control={Button}>
                <Link to="/Library">Cancel</Link>
              </Form.Field>
              <Form.Field id="form-button-control-public" control={Button} content="Confirm" />
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};


export { NewTopicPage as PureNewTopicPage };
export default translate()(NewTopicPage);
