// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Icon, Popup, Menu, Button, Dropdown } from 'semantic-ui-react';

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

    return (
      <Dropdown icon="bell" pointing={true} item={true} className="alerts-menu">
        <Dropdown.Menu scroll={true}>
          {(sortedAlerts.length === 0 ? (
            <Dropdown.Item disabled={true}>
              <em>{t('alerts:menu.empty')}</em>
            </Dropdown.Item>
          ) : '')}
          {(sortedAlerts.forEach((alert: Alert): React.Node => {
            return (
              <Dropdown.Item>
                <Alert alert={alert} />
              </Dropdown.Item>
            );
          }))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const Alerts = connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(PureAlerts));

export { PureAlerts };
export default Alerts;
