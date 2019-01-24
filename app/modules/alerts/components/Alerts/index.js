// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Dropdown, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

import { type ModulesAction, type AppState } from 'types/redux';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

import Alert from './Alert';

type StateProps = {|
  sortedAlerts: $ReadOnlyArray<m.Alert>,
|};

type DispatchProps = {|
  handleFetchAll: () => void,
|};

type Props = {| ...TranslatorProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    sortedAlerts: selectors.getAllByCurrentUserSortedDescByTimestamp(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    handleFetchAll: (): void => {
      dispatch(actions.fetchAll());
    },
  };
};

class PureAlerts extends React.Component<Props> {
  componentDidMount(): void {
    const { handleFetchAll } = this.props;
    handleFetchAll();
  }

  render(): React.Node {
    const { t, sortedAlerts } = this.props;

    const timeLimit = moment().subtract(7, 'days').startOf('day');

    const recentAlerts = sortedAlerts.filter((alert: m.Alert): boolean => {
      return moment(alert.timestamp).isAfter(timeLimit);
    });
    const earlierAlerts = sortedAlerts.filter((alert: m.Alert): boolean => {
      return moment(alert.timestamp).isBefore(timeLimit);
    });

    const isUnread = sortedAlerts.some((alert: m.Alert): boolean => !alert.read);

    return (
      <Dropdown
        pointing={true}
        item={true}
        className="alerts-menu"
        trigger={(
          <Icon name="bell">
            {isUnread ? (
              <div className="alerts-menu__dot" data-test-id="alerts-menu-unread-dot">
                <Label color="red" empty={true} circular={true} />
              </div>
            ) : null}
          </Icon>
        )}
      >
        <Dropdown.Menu>
          {(sortedAlerts.length === 0 ? (
            <Dropdown.Item disabled={true} data-test-id="alerts-menu-empty">
              <em>{t('alerts:menu.empty')}</em>
            </Dropdown.Item>
          ) : (
            <>
              {recentAlerts.length !== 0 ? <Dropdown.Header content={t('alerts:menu.recent')} data-test-id="alerts-menu-recent" /> : ''}
              {(recentAlerts.map((alert: m.Alert): React.Node => {
                return (
                  <Dropdown.Item key={alert.id} className={alert.read ? '' : 'unread'} data-test-id="alerts-menu-alert">
                    <Alert alert={alert} />
                  </Dropdown.Item>
                );
              }))}
              {earlierAlerts.length !== 0 ? <Dropdown.Header content={t('alerts:menu.earlier')} data-test-id="alerts-menu-earlier" /> : ''}
              {(earlierAlerts.map((alert: m.Alert): React.Node => {
                return (
                  <Dropdown.Item key={alert.id} className={alert.read ? '' : 'unread'} data-test-id="alerts-menu-alert">
                    <Alert alert={alert} />
                  </Dropdown.Item>
                );
              }))}
            </>
          ))}

        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const Alerts = connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(PureAlerts));

export { PureAlerts };
export default Alerts;
