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
                const errorMessage = `${error} for "${adderess}"`;
                dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_FAIL, false, errorMessage));
                throw (error);
            }
            
        })
    }

//Async Action
export const fetchPlacesByGeocode = (latitude, longitude) => 
    (dispatch) => { 
        dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_LOADING , true, null));
        return getNearbyPlaces(latitude, longitude, (error, results) => {
            if (!error){
                dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_SUCCESS, false, null));
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

export const resetFetchPlaceStatus = () =>
    (dispatch) => dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_RESET_STATUS, false, null));


export const setLocation = (location) => ({
    type: ActionTypes.SET_LOCATION,
    location
});