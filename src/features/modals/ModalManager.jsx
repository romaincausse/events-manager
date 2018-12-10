import React from 'react'
import { connect } from 'react-redux'
import TestModal from "./TestModal"
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal
}


const mapState = (state) => ({
  currentModal: state.modals
})

function ModalManager({currentModal}) {
  let renderModal = null;

  if(currentModal) {
    const {modalType, modalProp} = currentModal;
    const ModalComponent = modalLookup[modalType]

    renderModal = <ModalComponent {...modalProp} />;
  }
  return <span>{renderModal}</span>
}

export default connect(mapState)(ModalManager)
