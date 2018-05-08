// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import { getLatestMessage } from 'redux-flash';

import type { CustomTranslatorProps } from 'types/translator';

import type { State } from 'types/state';

import type { Flash } from './model';

type StateProps = {
  flash: ?Flash,
};

const mapStateToProps = (state: State): StateProps => {
  return {
    flash: getLatestMessage(state),
  };
};

type Props = CustomTranslatorProps & StateProps;

const PureFlashMessages = (props: Props): React.Node => {
  const { t, flash } = props;

  if (!flash) {
    return null;
  }

  let flashTitle: string = flash.isError ? t('flash:title.error') : t('flash:title.success');

  if (flash.props.title) {
    flashTitle = flash.props.title;
  }

  return (
    <Message positive={!flash.isError} negative={flash.isError}>
      <Message.Header>{flashTitle}</Message.Header>
      <p>{flash.message}</p>
    </Message>
  );
};

const FlashMessages = connect(mapStateToProps)(translate()(PureFlashMessages));

export default FlashMessages;
