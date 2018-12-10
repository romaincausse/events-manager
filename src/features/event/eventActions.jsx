import { toastr } from 'react-redux-toastr'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants'
import { asynActionStart, asynActionError, asynActionFinish } from '../async/asyncActions'
import { fetchSampleData } from '../../app/data/mockApi';

export const createEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success("Success", "Event has been created")
    } catch(error) {
      toastr.error("Error!", "Something went wrong")
    }
  }
}

export const updateEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success("Success", "Event has been updated")
    } catch(error) {
      toastr.error("Error!", "Something went wrong")
    }
  }
}

export const deleteEvent = (eventId) => {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_EVENT,
        payload: {
          eventId
        }
      });
      toastr.success("Success", "Event has been deleted")
    } catch(error) {
      toastr.error("Error!", "Something went wrong")
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