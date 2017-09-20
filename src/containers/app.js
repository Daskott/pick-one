import React, {Component} from 'react';
import { connect } from 'react-redux'
import { receivePlaces, setRandomPlaceIndex, setLocation, fetchPlaces } from '../redux/actions'
import logo from '../logo.svg';
import '../app.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap';
import PlaceList from '../components/placeList';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {isLoadingLocation: false, error:'', showRandomPlace: false};
      this.handleRandomPickPlace = this.handleRandomPickPlace.bind(this);
      this.handleShowAllPlacess = this.handleShowAllPlacess.bind(this);
  }
  
  componentDidMount(){
      const self = this;
      if (!navigator.geolocation){ 
        return this.setState({error: 'This application requires your location to work properly.'});
      }

      this.setState({ isLoadingLocation: true });
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ isLoadingLocation: false });
        const location = `${String(position.coords.latitude)},${String(position.coords.longitude)}`;
        self.props.setLocation(location);
        self.props.fetchPlaces(location);
      })
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
    if ((isLoadingLocation || fetchPlacesStatus.isLoading) && error === '') 
      PlaceListComponent = <p className="blue"><strong>Loading...</strong></p>;
    else if (this.state.showRandomPlace)
      PlaceListComponent = <PlaceList places={ [places[randomPlaceIndex]] }></PlaceList>;
    else if (error !== '')
      return <div className="content"><h4>Oops! {error}</h4></div> // Improve
    else
      PlaceListComponent = <PlaceList places={ places }></PlaceList>;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div className="padding-default">
          <div className="panel panel-default content">
            <div className="panel-heading"><h2>Places Nearby</h2> 
              <a href="#" onClick={ this.handleRandomPickPlace }>Random Pick</a> |	&nbsp; 
              <a href="#" onClick={ this.handleShowAllPlacess }>Show All</a> 
            </div>
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
  setLocation: (location) => {
    dispatch(setLocation(location))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)