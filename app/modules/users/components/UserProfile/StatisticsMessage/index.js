// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react';

import { USER_SETTINGS_ROUTE } from 'config/routes';

import * as m from '../../../model';

type PassedProps = {|
  user: m.User,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureStatisticsMessage = (props: Props): React.Node => {
  const { t, user } = props;

  if (user.age == null || user.gender == null || user.role == null || user.country == null) {
    return (
      <Message info={true} data-test-id="statistics-message">
        <Message.Header>{t('users:statistics.title')}</Message.Header>
        <p>
          <Trans
            i18nKey="users:statistics.message"
          >
            <Link to={USER_SETTINGS_ROUTE}>
              settings
            </Link>
          </Trans>
        </p>
      </Message>
    );
  }
  else return null;
};

const StatisticsMessage = withNamespaces()(PureStatisticsMessage);

export { PureStatisticsMessage };
export default StatisticsMessage;
