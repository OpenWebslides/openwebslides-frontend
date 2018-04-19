// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import DeleteTopicModal from './DeleteTopicModal';

type PassedProps = {
  id: string,
  modalType: string,
};

type Props = PassedProps;

const MODAL_COMPONENTS = {
  DELETE_TOPIC: DeleteTopicModal,
  /* other modals */
};

const ModalRoot = (props: Props): React.Node => {
  const {
    modalType,
  } = props;

  if (modalType === '') {
    return <span />; // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...props} />;
};

export default connect(
  (state) => state.modals,
)(ModalRoot);
