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
      return Object.assign({}, state, { loading: action.loading })
    case ActionTypes.FETCH_PLACES_SUCCESS:
      return Object.assign({}, state, { loading: action.loading })
    case ActionTypes.FETCH_PLACES_FAIL:
      return Object.assign({}, state, { loading: action.loading, error: action.error })
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