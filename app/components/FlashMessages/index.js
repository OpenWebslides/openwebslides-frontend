// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
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

type Props = {| ...StateProps |};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    flashMessages: getFlashMessages(state),
  };
};

const PureFlashMessages = (props: Props): React.Node => {
  const { flashMessages } = props;
  const [t] = useTranslation();

  return (
    <>
      {/MSIE|Trident|Edge/.test(window.navigator.userAgent) ? (
        <Message
          negative={true}
          icon="exclamation triangle"
          header={t('flash:UnsupportedBrowser.title')}
          content={t('flash:UnsupportedBrowser.message')}
          data-test-id="unsupported-browser-message"
        />
      ) : null}
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
};

const FlashMessages = connect(mapStateToProps)(PureFlashMessages);

export { PureFlashMessages };
export type { Flash };
export default FlashMessages;
