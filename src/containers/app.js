import React, {Component} from 'react';
import { connect } from 'react-redux'
import { receivePlaces, setLocation, fetchPlacesByAdress, fetchPlacesByGeocode } from '../redux/actions'
import { BounceLoader } from 'react-spinners';
import { SpinnerWrapper, NavButton } from '../components/common'
import '../app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap';
import PlaceList from '../components/placeList';
import SearchBar from '../components/searchBar';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {isLoadingLocation: false, flipCards: false};
      this.handleRandomPickPlace = this.handleRandomPickPlace.bind(this);
      this.handleRefreshList = this.handleRefreshList.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleRandomPickPlace() {
    if (!this.props.places || this.props.places.length <= 0) return;

    const flippedPlaces = Array.from(this.props.places);
    const flip = !this.state.flipCards;
    let temp = null;
    let randomIndex = null;
    this.setState({ flipCards: !this.state.flipCards});
    if (flip === false) return;

    // shuffle items arround in flippedPlaces array
    for (let i = 0; i < flippedPlaces.length; i++){
      temp = flippedPlaces[i];
      randomIndex =  Math.floor(Math.random() * flippedPlaces.length);
      flippedPlaces.splice(i, 1); // remove 1 item at i-index position
      flippedPlaces.splice(randomIndex, 0, temp); // insert temp at randomIndex-index position
    }
    setTimeout( () => this.props.receivePlaces(flippedPlaces), 500);
  }

  handleRefreshList() {
    if (!this.props.location || Object.keys(this.props.location) <= 0) return;

    // delay refresh only if cards are flipped over backwards
    const delay = this.state.flipCards ? 400 : 0;
    this.setState({ flipCards: false});
    setTimeout(() => this.props.fetchPlacesByGeocode(
            this.props.location.latitude, 
            this.props.location.longitude), 
            delay);
  }

  handleSearch(address){ 
    if (address.trim() === '') return;
    this.props.fetchPlacesByAdress(address);
  }

  
  render() {
    const { places, fetchPlacesStatus} = this.props;
    const { isLoadingLocation, error, flipCards} = this.state;
    const isLoading = (isLoadingLocation || fetchPlacesStatus.loading) && !error;
    const PlaceListComponent = <PlaceList places={places} flipCards={flipCards}></PlaceList>;
    const currentAddress = this.props.location ? this.props.location.address : null;

    return (
      <div className="App">
        <div className="App-header">
          {/*<div><h4 className="pull-left">Lunchify</h4></div>*/}
          <SearchBar onSearch={this.handleSearch} currentAddress={currentAddress}/>
          <div className="nav-bar">
            <NavButton onClick={ this.handleRandomPickPlace }>Flip 'n Pick</NavButton>
            <NavButton onClick={ this.handleRefreshList }>Refresh</NavButton> 
          </div>
        </div>
        
        <div className="App-body">
          <div className="content"> 

            <SpinnerWrapper hide={!isLoading}>
              <span>Getting nearby places...</span>
              <BounceLoader color={'#ED3524'} size={36} loading={isLoading}/>
            </SpinnerWrapper>

            { fetchPlacesStatus.error ? <div className="red"><strong>Oops!</strong>{` ${fetchPlacesStatus.error}`}</div> : null }
            <div>{!isLoading ? PlaceListComponent : null}</div>
          </div>

          { places.length <= 0 && !isLoading? 
            <div className="default-content">
              <p>Picking a restautrant doesn't have to be hard</p>
              <p>Give me a try 😁👆</p>
            </div> : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    places: state.places,
    fetchPlacesStatus: state.fetchPlacesStatus,
    location: state.location,
    randomPlaceIndex: state.randomPlaceIndex
})

const mapDispatchToProps = (dispatch) => ({
  fetchPlacesByAdress: (location) => {
    dispatch(fetchPlacesByAdress(location))
  },
  fetchPlacesByGeocode: (latitude, longitude) => {
    dispatch(fetchPlacesByGeocode(latitude, longitude))
  },
  receivePlaces: (listOfPlaces) => {
    dispatch(receivePlaces(listOfPlaces))
  },
  setLocation: (position) => {
    dispatch(setLocation(position))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)