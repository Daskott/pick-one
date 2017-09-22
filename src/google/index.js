/*global google*/
const container = new google.maps.Map(document.createElement('div'));
const service = new google.maps.places.PlacesService(container);

export const getNearbyPlaces = (location, callback) => {
    const request = {
        location: new google.maps.LatLng(location.latitude, location.longitude),
        radius: '1500',
        types: ['restaurant']
    };
    return service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) return callback(null, results);
        callback({message: 'Unable to retrieve any result'}, []);
    });
}