// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Form, Input, TextArea, Button, Card, Divider, Segment, Grid, Icon, Image, Menu } from 'semantic-ui-react';

type Props = TranslatorProps & { /* new props go here */ };

const description1 = `This is an introductory course on the subject of mutations.
                      It should help you understand how genetic evolution works
                      and why mutants, like the famous X-men, exist`;

const description2 = `This is an introductory course on the subject of modern slang.
                      It should help the reader to better understand teens,
                      as well as peoplez of the internet, and how they
                      communicate. Beware: course contains dank memes`;

const description3 = `This is an introductory course on the subject of DBZ
                      and its cultural impact. Beware: this is a Work In Progress.
                      Or better yet: rejoice, because this isn't even the topic's FINAL FORM!`;


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

const LibraryPage = (props: Props): React.Node => {
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
          <h1>All topics</h1>
          <Card.Group>
            <Card>
              <Card.Content header="Introduction to mutations in modern biology" />
              <Card.Content description={description1} />
              <Card.Content extra={true}>
                <Image src="/assets/images/icons/fork.png" />
                1 Fork
                <Divider />
                <Image src="/assets/images/icons/edit.png" />
                Edit
                <Divider />
                <Image src="/assets/images/icons/delete.png" />
                Delete
              </Card.Content>
            </Card>

            <Card>
              <Card.Content header="Y U DO DIS: An analysis of modern slang" />
              <Card.Content description={description2} />
              <Card.Content extra={true}>
                <Image src="/assets/images/icons/fork.png" />
                5 Forks
                <Divider />
                <Image src="/assets/images/icons/edit.png" />
                Edit
                <Divider />
                <Image src="/assets/images/icons/delete.png" />
                Delete
              </Card.Content>
            </Card>

            <Card>
              <Card.Content header="The cultural impact of Dragon Ball Z on youths today" />
              <Card.Content description={description3} />
              <Card.Content extra={true}>
                <Image src="/assets/images/icons/fork.png" />
                &gt;9000 Forks
                <Divider />
                <Image src="/assets/images/icons/edit.png" />
                Edit
                <Divider />
                <Image src="/assets/images/icons/delete.png" />
                Delete
              </Card.Content>
            </Card>
          </Card.Group>

        </Grid.Column>

        <Grid.Column verticalAlign="top" width={6}>
          <h1>Create new topic</h1>
          <Form>
            <Form.Field id="form-input-control-title" control={Input} label="Title" placeholder="Title" />
            <Form.Field id="form-textarea-control-description" control={TextArea} label="Discription" placeholder="Description" />
            <Form.Field id="form-button-control-public" control={Button} content="Confirm" />
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};


export { LibraryPage as PureLibraryPage };
export default translate()(LibraryPage);
