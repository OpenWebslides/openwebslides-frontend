// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { Button } from 'semantic-ui-react';
import { hideModal } from '../actions';

type DispatchProps = {
  onConfirmButtonClick: (string, string) => void,
};

type PassedProps = {
  id: string,
  modalType: string,
};

type Props = DispatchProps & PassedProps;

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onConfirmButtonClick: (id: string, modalType: string): void => {
      dispatch(
        hideModal(modalType, id),
      );
    },
  };
};


const PureDeleteTopicModal = (props: Props): React.Node => {
  const {
    onConfirmButtonClick,
    id,
    modalType,
  } = props;

  return (
    <Button color="green" inverted={true} onClick={() => onConfirmButtonClick(id, modalType)}>
      CLOSE ZE MODAL
    </Button>
  );
};

const DeleteTopicModal = connect(null, mapDispatchToProps)(PureDeleteTopicModal);

export { PureDeleteTopicModal };
export default DeleteTopicModal;
