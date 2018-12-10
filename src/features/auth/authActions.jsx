import { LOGIN_USER, SIGN_OUT_USER } from './authConstants'
import { closeModal } from '../modals/modalActions'

export const login = (creds) => {
  return dispach => {
    dispach({
      type: LOGIN_USER,
      payload: {
        creds
      }
    });
    dispach(closeModal())
  }
}

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  }
}