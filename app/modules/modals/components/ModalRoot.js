// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { State } from 'types/state';

import DeleteTopicModal from './DeleteTopicModal';
import { getModal } from '../selectors';


/*
type PassedProps = {
  id: string,
  modalType: string,
};
*/
type StateProps = {
  id: string,
  modalType: string,
};

type Props = StateProps;

const MODAL_COMPONENTS = {
  DELETE_TOPIC: DeleteTopicModal,
  /* other modals */
};

const mapStateToProps = (state: State): StateProps => {
  const modal = getModal(state);

  return {
    ...modal,
  };
};

const ModalRoot = (props: Props): React.Node => {
  const {
    id,
    modalType,
  } = props;

  if (modalType === '') {
    return <span />; // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal id={id} modalType={modalType} />;
};

export default connect(mapStateToProps)(ModalRoot);
