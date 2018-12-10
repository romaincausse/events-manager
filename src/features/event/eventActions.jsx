import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants'
import { asynActionStart, asynActionError, asynActionFinish } from '../async/asyncActions'
import { fetchSampleData } from '../../app/data/mockApi';

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: {
      event
    }
  }
}

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
  }
}

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}

export const fetchEvents = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events
  }
}


export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asynActionStart())
      let events = await fetchSampleData()
      dispatch(fetchEvents(events))
      dispatch(asynActionFinish())
    } catch(error) {
      console.log(error)
      dispatch(asynActionError())
    }
  }
}