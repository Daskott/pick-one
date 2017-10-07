/*global google*/
const container = new google.maps.Map(document.createElement('div'));
const service = new google.maps.places.PlacesService(container);

export const getNearbyPlaces = (latitude, longitude, callback) => {
    const request = {
        location: new google.maps.LatLng(latitude, longitude),
        rankBy: google.maps.places.RankBy.DISTANCE,
        types: ['restaurant']
    };
    return service.nearbySearch(request, (results, status) => {
        switch (status){
            case google.maps.places.PlacesServiceStatus.OK:
                callback(null, results);
                break;
            case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
                callback(`Unable to find any restaurants nearby`, null);
                break;
            default:
                console.error(status);
                callback(`Well that's embarassing, it would seem an error has occured`, null);
        }
    });
}

export const getGeocodebyAddress = (address, callback) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode( { address}, (results, status) => {
        switch (status){
            case google.maps.places.PlacesServiceStatus.OK:
                callback(null, results);
                break;
            case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
                callback(`Unable to find any location matching the address`, null);
                break;
            default:
                console.error(status);
                callback(`Well that's embarassing, it would seem an error has occured`, null);
        }
    });
}

export const getNearbyPlacesbyAddress = (address, callback) => {  
    if (!address || typeof(address) !== 'string') return callback('A search address is required', null);
    getGeocodebyAddress( address, (error, results) => {
        if (results) { 
            const location = {
                latitude: results[0].geometry.location.lat(),
                longitude: results[0].geometry.location.lng(),
                address: results[0].formatted_address,
                placeId: results[0].formatted_id
            }
            getNearbyPlaces(location.latitude, location.longitude, (error, results) => {
                if (results){
                    return callback(null, {results, location});
                } else {
                    callback(error, null);
                }
            });
      } else {
        callback(error, null);
      }
    });
}