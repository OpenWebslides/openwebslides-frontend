// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Grid, Form, Button, Input, Card, Checkbox } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Page from 'pages/Page';

type Props = TranslatorProps & { /* new props go here */ };

const PureSignupPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Page>
      <Grid centered={true} verticalAlign="middle">
        <Grid.Column width={8}>
          <Card fluid={true}>
            <Card.Content extra={true}>
              <Card.Header>
                {t('auth:signup.title')}
              </Card.Header>
              <Card.Description>
                {t('auth:signup.description')}
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Form>
                <Form.Field>
                  <label>{t('auth:input.email')}</label>
                  <Input
                    placeholder={t('auth:input.email')}
                    icon="at"
                    iconPosition="left"
                  />
                </Form.Field>
                <Form.Group>
                  <Form.Field width={8}>
                    <label>{t('auth:input.firstname')}</label>
                    <Input
                      placeholder={t('auth:input.firstname')}
                      icon="user"
                      iconPosition="left"
                    />
                  </Form.Field>
                  <Form.Field width={8}>
                    <label>{t('auth:input.lastname')}</label>
                    <Input
                      placeholder={t('auth:input.lastname')}
                      icon="user"
                      iconPosition="left"
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label>{t('auth:input.password')}</label>
                  <Input
                    type="password"
                    placeholder={t('auth:input.password')}
                    icon="lock"
                    iconPosition="left"
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    type="password"
                    placeholder={t('auth:input.repeatpassword')}
                    icon="lock"
                    iconPosition="left"
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox label={t('auth:input.tos')} />
                </Form.Field>
              </Form>
            </Card.Content>
            <Card.Content extra={true}>
              <Button.Group fluid={true} vertical={true}>
                <Button primary={true} type="submit">
                  {t('auth:button.create')}
                </Button>
                <Button basic={true} as={Link} to="/auth/signin">
                  {t('auth:button.back')}
                </Button>
              </Button.Group>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </Page>
  );
};

const SignupPage = translate()(PureSignupPage);

export { PureSignupPage };
export default SignupPage;
