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
        if (status === google.maps.places.PlacesServiceStatus.OK) return callback(null, results);
        callback('Unable to retrieve any result', null);
    });
}

export const getGeocodebyAddress = (address, callback) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode( { address}, (results, status) => {
      if (status === 'OK') {
         return callback(null, results);
      } else {
        callback(`Unable to retrieve any result for the following reason:${  status}`, null);
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