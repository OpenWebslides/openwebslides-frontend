// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Segment, Grid, Image, Menu } from 'semantic-ui-react';

import Page from '../Page';

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

const LibraryPage = (props: Props): React.Node => {
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

        <Grid.Column stretched={true} width={14}>
          <Grid.Row>
            <Grid padded="vertically">
              <Grid.Column width={12}>
                <h1>{t('pages:librarypage.title')}</h1>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button floated="right">
                  <Link to="/topics/new">{t('common:link.newtopic')}</Link>
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row>
            <Card.Group>
              <Card>
                <Card.Content header="Introduction to mutations in modern biology" />
                <Card.Content description={description1} />
                <Card.Content extra={true}>
                  <Image src="/assets/images/icons/fork.png" />
                  1 Fork
                  <Divider />

                  <Button>
                    Edit
                  </Button>

                  <Button basic={true} color="red" floated="right">
                    Delete
                  </Button>
                </Card.Content>
              </Card>

              <Card>
                <Card.Content header="Y U DO DIS: An analysis of modern slang" />
                <Card.Content description={description2} />
                <Card.Content extra={true}>
                  <Image src="/assets/images/icons/fork.png" />
                  5 Forks
                  <Divider />

                  <Button>
                    Edit
                  </Button>

                  <Button basic={true} color="red" floated="right">
                    Delete
                  </Button>
                </Card.Content>
              </Card>

              <Card>
                <Card.Content header="The cultural impact of Dragon Ball Z on youths today" />
                <Card.Content description={description3} />
                <Card.Content extra={true}>
                  <Image src="/assets/images/icons/fork.png" />
                  &gt;9000 Forks
                  <Divider />
                  <Button>
                    Edit
                  </Button>

                  <Button basic={true} color="red" floated="right">
                    Delete
                  </Button>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Page>
  );
};


export { LibraryPage as PureLibraryPage };
export default translate()(LibraryPage);
