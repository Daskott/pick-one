import React, {Component} from 'react';
import { connect } from 'react-redux'
import { receivePlaces, setRandomPlaceIndex, setLocation, fetchPlaces } from '../redux/actions'
import logo from '../logo.svg';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap';
import PlaceList from '../components/placeList';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {isLoadingLocation: false, error: null, showRandomPlace: false};
      this.handleRandomPickPlace = this.handleRandomPickPlace.bind(this);
      this.handleShowAllPlacess = this.handleShowAllPlacess.bind(this);
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
    const { places } = this.props;
    if (places.length <= 0) return;
    const randomIndex = Math.floor(Math.random() * places.length);
    this.props.setRandomPlaceIndex(randomIndex);
    this.setState({ showRandomPlace: true });
  }

  handleShowAllPlacess() {
    if (!this.state.showRandomPlace) return;
    this.props.setRandomPlaceIndex(-1);
    this.setState({ showRandomPlace: false });
  }

  render() {
    let PlaceListComponent = null;
    const { places, randomPlaceIndex, fetchPlacesStatus} = this.props;
    const { isLoadingLocation, error} = this.state;

    // updating places & its status
    if ((isLoadingLocation || fetchPlacesStatus.loading) && !error) 
      PlaceListComponent = <span>Getting placess nearby...</span>;
    else if (this.state.showRandomPlace)
      PlaceListComponent = <PlaceList places={ [places[randomPlaceIndex]] }></PlaceList>;
    else if (error || fetchPlacesStatus.error)
      return <div className="content white"><h4>Oops! {error || fetchPlacesStatus.error}</h4></div> // Improve
    else
      PlaceListComponent = <PlaceList places={ places }></PlaceList>;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
           <div className="panel-heading">
              <a href="#" onClick={ this.handleRandomPickPlace }>Random Pick</a>&nbsp; | &nbsp; 
              <a href="#" onClick={ this.handleShowAllPlacess }>Show All</a> 
            </div>
        </div>

        <div className="padding-default App-body">
          <div className="panel panel-default content">
            <div>{ PlaceListComponent }</div>
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
  setRandomPlaceIndex: (index) => {
    dispatch(setRandomPlaceIndex(index))
  },
  setLocation: (position) => {
    dispatch(setLocation(position))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)