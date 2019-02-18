// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { clearMessages } from 'redux-flash';
import { Translation } from 'react-i18next';

import { type TFunction } from 'types/i18next';
import { VERSION } from 'config/version';

import NavigationBar from './NavigationBar';

type PassedProps = {|
  children: React.Node,
  className?: string,
|};

type DispatchProps = {|
  onClearFlashMessages: () => void,
|};

type Props = {| ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<{ type: string }>): DispatchProps => {
  return {
    onClearFlashMessages: (): void => {
      dispatch(clearMessages());
    },
  };
};

class PurePageWrapper extends React.Component<Props> {
  componentDidMount(): void {
    const { onClearFlashMessages } = this.props;
    // Clear all flash messages from previous page on new page load.
    onClearFlashMessages();
  }

  renderTranslated = (t: TFunction): React.Node => {
    const { children, className } = this.props;

    return (
      <div className={`page ${className || ''}`} data-test-id="page">
        <div className="page__header">
          <NavigationBar />
        </div>
        <div className="page__main">
          {children}
        </div>
        <div className="page__version">
          <small>
            {t('global:version', { version: VERSION })}
          </small>
        </div>
      </div>
    );
  };

  render(): React.Node {
    return (
      <Translation>
        {(t: TFunction): React.Node => this.renderTranslated(t)}
      </Translation>
    );
  }
}

const PageWrapper = connect(null, mapDispatchToProps)(PurePageWrapper);

export { PurePageWrapper };
export default PageWrapper;
