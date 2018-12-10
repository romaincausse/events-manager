import { ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START } from './asyncConstants'

export const asynActionStart = () => {
  return {
    type: ASYNC_ACTION_START
  }
}

export const asynActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH
  }
}

export const asynActionError = () => {
  return {
    type: ASYNC_ACTION_ERROR
  }
}
