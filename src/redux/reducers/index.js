import { combineReducers } from 'redux';
import * as ActionTypes from '../action_types';

const places = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_PLACES:
      return [
          ...action.places
      ]
    default:
      return state
  }
}

const fetchPlacesStatus = (state = { loading: false, error: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PLACES_LOADING:
      return {loading: action.loading, error: action.error};
    case ActionTypes.FETCH_PLACES_SUCCESS:
      return {loading: action.loading, error: action.error};
    case ActionTypes.FETCH_PLACES_FAIL:
      return {loading: action.loading, error: action.error};
    case ActionTypes.FETCH_PLACES_RESET_STATUS:
      return {loading: false, error: null};
    default:
      return state
  }
}

const randomPlaceIndex = (state = -1, action) => {
  switch (action.type) {
    case ActionTypes.SET_RANDOM_PLACE_INDEX:
      return action.index;
    default:
      return state
  }
}

const location = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOCATION:
      return action.location
    default:
      return state
  }
}

const lunchifyReducer = combineReducers({
  places,
  fetchPlacesStatus,
  randomPlaceIndex,
  location
})

export default lunchifyReducer;