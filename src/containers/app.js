import React, {Component} from 'react';
import { connect } from 'react-redux'
import { receivePlaces, setLocation, fetchPlaces } from '../redux/actions'
import { BounceLoader } from 'react-spinners';
import { SpinnerWrapper, PlaceListHeader } from '../components/common'
import logo from '../logo.svg';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap';
import PlaceList from '../components/placeList';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {isLoadingLocation: false, error: null, flipCards: false};
      this.handleRandomPickPlace = this.handleRandomPickPlace.bind(this);
      this.handleRefreshList = this.handleRefreshList.bind(this);
  }
  
  componentDidMount(){
    const self = this;
    if (!navigator.geolocation){ 
      return this.setState({error: 'This application requires your location to work properly.'});
    }
    
    var geoOptions = {
      maximumAge: 5 * 60 * 1000
    }

    const geoSuccess = (position) => {
      const currentPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      self.props.setLocation(currentPosition);
      self.props.fetchPlaces(currentPosition);
      self.setState({ isLoadingLocation: false });
    }

    const geoError = (error) => {
      console.log(`Error occurred. Error code: ${  error.code}`);
      self.setState({ isLoadingLocation: false, error: error.message });
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
    }

    // TODO: Request user location Onclick
    this.setState({ isLoadingLocation: true });
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  }

  handleRandomPickPlace() {
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
    // delay only if cards are flipped over backwards
    const delay = this.state.flipCards ? 400 : 0;
    this.setState({ flipCards: false});
    setTimeout(() => this.props.fetchPlaces(this.props.location), delay);
  }

  
  render() {
    let PlaceListComponent = null;
    const { places, randomPlaceIndex, fetchPlacesStatus} = this.props;
    const { isLoadingLocation, error, flipCards} = this.state;
    const isLoading = (isLoadingLocation || fetchPlacesStatus.loading) && !error;
    
    if (error || fetchPlacesStatus.error)
      return <div className="content white"><h4>Oops! {error || fetchPlacesStatus.error}</h4></div> // Improve
    else
       PlaceListComponent = <PlaceList places={places} flipCards={flipCards}></PlaceList>;

    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <div>
              <h3>Lunchify</h3>
          </div>
        </div>
        
        <div className="App-body">
          <div className="content"> 
            <PlaceListHeader>
              <a href="#" onClick={ this.handleRandomPickPlace }>Flip 'n Pick</a>&nbsp; | &nbsp; 
              <a href="#" onClick={ this.handleRefreshList }>Refresh</a> 
            </PlaceListHeader>

            <SpinnerWrapper hide={!isLoading}>
              <span>Getting nearby places...</span>
              <BounceLoader color={'#ED3524'} size={36} loading={isLoading}/>
            </SpinnerWrapper>

            <div>{!isLoading ? PlaceListComponent : null}</div>
          </div>
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
  fetchPlaces: (location) => {
    dispatch(fetchPlaces(location))
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