import { createReducer } from '../../app/common/util/reducerUtil'
import { UPDATE_EVENT, CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants'


 const initialState = [];

export const createEvent = (state, payload) => {
  // spread operator can preserve unmutability of state
  return [...state, Object.assign({}, payload.event)]
}

export const updateEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.event.id),
    Object.assign({}, payload.event)
  ]
}

export const deleteEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.eventId)
  ]
}

export const fetchEvents = (state, payload) => {
  return payload.events
}

export default createReducer(initialState, {
  [UPDATE_EVENT]: updateEvent,
  [CREATE_EVENT]: createEvent,
  [DELETE_EVENT]: deleteEvent,
  [FETCH_EVENTS]: fetchEvents,
})