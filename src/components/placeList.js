import React from 'react';

function PlaceList(props){
    const places = props.places.map((place) => <li className="list-group-item" key={place.id}>{ place.name }</li>)
    return (
        <div className="place-list">
            <ul className="list-group">{ places }</ul>
        </div>
    )
}

export default PlaceList;