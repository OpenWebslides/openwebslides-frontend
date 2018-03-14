// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Grid, Image } from 'semantic-ui-react';

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
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column width={12}>
            <h1>{t('pages:library.title')}</h1>
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
    </Page>
  );
};


export { LibraryPage as PureLibraryPage };
export default translate()(LibraryPage);
