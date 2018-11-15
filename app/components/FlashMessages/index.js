// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import { getFlashMessages } from 'redux-flash';

import { type AppState } from 'types/redux';

type Flash = {|
  id: string,
  message: string,
  isError: boolean,
  props: {
    [string]: string,
  },
|};

type StateProps = {|
  flashMessages: $ReadOnlyArray<Flash>,
|};

type Props = {| ...TranslatorProps, ...StateProps |};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    flashMessages: getFlashMessages(state),
  };
};

const PureFlashMessages = (props: Props): React.Node => {
  const { t, flashMessages } = props;

  if (flashMessages.length === 0) {
    return null;
  }
  else {
    return (
      <>
        {flashMessages.map((flashMessage: Flash): React.Node => {
          return (
            <Message
              positive={!flashMessage.isError}
              negative={flashMessage.isError}
              key={flashMessage.id}
              floating={true}
            >
              { flashMessage.props.title != null && (
                <Message.Header>{flashMessage.props.title }</Message.Header>
              )}
              <p>{t(flashMessage.message)}</p>
            </Message>
          );
        })}
      </>
    );
  }
};

const FlashMessages = connect(mapStateToProps)(withNamespaces()(PureFlashMessages));

export { PureFlashMessages };
export type { Flash };
export default FlashMessages;
