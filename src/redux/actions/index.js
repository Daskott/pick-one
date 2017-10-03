import * as ActionTypes from '../action_types';
import { getNearbyPlacesbyAddress, getNearbyPlaces } from '../../google'

export const receivePlaces = (places) => ({
    type: ActionTypes.RECEIVE_PLACES,
    places
});

export const setFetchPlaceStatus = (type, loading, error) => ({
    type,
    loading,
    error
});

//Async Action
export const fetchPlacesByAdress = (adderess) => 
    // returns a dispatcher
    (dispatch) => { 
        dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_LOADING , true, null));
        return getNearbyPlacesbyAddress(adderess, (error, data) => {
            if (!error){
                dispatch(setLocation(data.location));
                dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_SUCCESS, false, null));
                dispatch(receivePlaces(data.results));
            } else {
                dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_FAIL, false, error));
                throw (error);
            }
            
        })
    }

//Async Action
export const fetchPlacesByGeocode = (latitude, longitude) => 
    (dispatch) => { 
        dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_LOADING , true));
        return getNearbyPlaces(latitude, longitude, (error, results) => {
            if (!error){
                dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_SUCCESS, false));
                dispatch(receivePlaces(results));
            } else {
                dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_FAIL, false, error));
                throw (error);
            }
            
        })
    }

 
export const setRandomPlaceIndex = (index) => ({
    type: ActionTypes.SET_RANDOM_PLACE_INDEX,
    index
});

export const setLocation = (location) => ({
    type: ActionTypes.SET_LOCATION,
    location
});