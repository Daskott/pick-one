import * as ActionTypes from '../action_types';
import { getNearbyPlaces } from '../../google'

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
export const fetchPlaces = (position) => 
    // returns a dispatcher
    (dispatch) => { 
        dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_LOADING , true, ''));
        return getNearbyPlaces(position, (error, results) => {
            if (!error){
                dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_SUCCESS, false, ''));
                dispatch(receivePlaces(results));
            } else {
                console.log("Error: ", error);
                dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_FAIL, false, error));
                throw (error);
            }
            
        })
    }

 
export const setRandomPlaceIndex = (index) => ({
    type: ActionTypes.SET_RANDOM_PLACE_INDEX,
    index
});

export const setLocation = (position) => ({
    type: ActionTypes.SET_LOCATION,
    position
});