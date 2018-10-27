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
  let flashTitle: string;

  if (flashMessages.length === 0) {
    return null;
  }
  else {
    return (
      <div>
        {flashMessages.map((flashMessage: Flash): React.Node => {
          flashTitle = flashMessage.isError ? t('flash:title.error') : t('flash:title.success');
          return (
            <Message
              positive={!flashMessage.isError}
              negative={flashMessage.isError}
              key={flashMessage.id}
            >
              <Message.Header>{flashMessage.props.title || flashTitle }</Message.Header>
              <p>{t(flashMessage.message)}</p>
            </Message>
          );
        })}
      </div>
    );
  }
};

const FlashMessages = connect(mapStateToProps)(withNamespaces()(PureFlashMessages));

export { PureFlashMessages };
export type { Flash };
export default FlashMessages;
