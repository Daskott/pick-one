import React from 'react';

function Image(props){
    return (
        <div className="image-wrapper">
            <img src={props.url} className="place-Image"/>
        </div>
    )
}
function Place(props){
    const photos = props.place.photos;
    const iconUrl = photos ? photos[0].getUrl({'maxWidth': 70, 'maxHeight': 70}): props.place.icon;
   
    let hoursElement = null;
    if (props.place.opening_hours) { 
        const isOpen = props.place.opening_hours ? props.place.opening_hours.open_now : null;
        hoursElement = <span className={`place-item ${isOpen? 'green': 'red'}`}>{ isOpen ? 'Open' : 'Closed' }</span>;
    } else {
        hoursElement = <span>{'n/a'}</span>;
    }

    return (
        <div className="list-group-item card">
            <span className="pull-right label label-default">{String(props.place.rating).length < 3? `${props.place.rating}.0`: props.place.rating}</span>
            <Image url={iconUrl}/>
            <span className="place-item">{props.place.name}</span>
            { hoursElement }
        </div>
    )
}

function PlaceList(props){
    const places = props.places.map((place) => <Place key={place.id} place={place}/>)
    return (
        <div className="place-list">
            <ul className="list-group">{ places }</ul>
        </div>
    )
}

export default PlaceList;