import React, {Component} from 'react';
import { connect } from 'react-redux'
import {receivePlaces, 
        setLocation, 
        fetchPlacesByAdress, 
        fetchPlacesByGeocode, 
        setRandomPlaceIndex,
        resetFetchPlaceStatus 
        } from '../redux/actions'
import { BounceLoader } from 'react-spinners';
import {AppWrapper,
        AppHeader, 
        AppBody, 
        NavBar, 
        NavButton,
        Card,
        Anchor,
        DefaultContent,
        GitIconWrapper,
        SpinnerWrapper
        } from '../components/common/styles'
import '../app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap';
import PlaceList from '../components/placeList';
import SearchBar from '../components/searchBar';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {isLoadingLocation: false, flipCards: false, showRandomPlace: false};
      this.handleFlipAndPickPlace = this.handleFlipAndPickPlace.bind(this);
      this.handlePickRandomPlace = this.handlePickRandomPlace.bind(this);
      this.handleRefreshList = this.handleRefreshList.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleFlipAndPickPlace() {
    this.setState({showRandomPlace: false});
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

  handlePickRandomPlace() {
    const {places, setRandomPlaceIndex, randomPlaceIndex} = this.props;
    if (!places || places.length <= 0) return;

    let index = Math.floor(Math.random() * places.length);
    if (index === randomPlaceIndex){
      if (index + 1 < places.length){
        index+=1;
      } else if (index - 1 >= 0){ 
        index-=1;
      }
    }
    setRandomPlaceIndex(index);
    this.setState({showRandomPlace: true});
  }

  handleRefreshList() {
    this.setState({showRandomPlace: false});
    const {location, fetchPlacesByGeocode} = this.props;
    if (!location || !location.latitude || !location.longitude) return;

    // delay refresh only if cards are flipped over backwards
    const delay = this.state.flipCards ? 400 : 0;
    this.setState({ flipCards: false});
    setTimeout(() => fetchPlacesByGeocode(location.latitude, location.longitude), delay);
  }

  handleSearch(address){ 
    if (address.trim() === '') return;
    this.setState({ flipCards: false});
    this.props.receivePlaces([]);
    this.props.fetchPlacesByAdress(address);
  }
  
  render() {
    const { places, fetchPlacesStatus, randomPlaceIndex} = this.props;
    const { isLoadingLocation, error, flipCards, showRandomPlace} = this.state;
    const isLoading = (isLoadingLocation || fetchPlacesStatus.loading) && !error;

    let PlaceListComponent = null;
    if (showRandomPlace){ 
      PlaceListComponent = <PlaceList places={[places[randomPlaceIndex]]}></PlaceList>;
    } else {
      PlaceListComponent = <PlaceList places={places} flipCards={flipCards}></PlaceList>;
    }

    return (
      <AppWrapper>
        <AppHeader>
          <GitIconWrapper className="pull-right"  href="https://github.com/Daskott/PickOne" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github fa-2x" aria-hidden="true"></i>
          </GitIconWrapper>
          {<h4 className="search-title">Pick a nearby place to go eat!</h4>}  
          <SearchBar onSearch={this.handleSearch}/>
        </AppHeader>
        <NavBar>
          <NavButton 
            hide={places.length <= 0}
            onClick={this.handleFlipAndPickPlace}><i className="fa fa-exchange" aria-hidden="true"></i> Flip 'n Pick</NavButton>
          <NavButton 
            hide={places.length <= 0}
            onClick={this.handlePickRandomPlace}><i className="fa fa-random" aria-hidden="true"></i> Random</NavButton>
          <NavButton
            hide={places.length <= 0} 
            onClick={this.handleRefreshList}><i className="fa fa-refresh" aria-hidden="true"></i> Refresh</NavButton> 
        </NavBar>
        
        <AppBody>
          <div className="content"> 

            <SpinnerWrapper hide={!isLoading}>
              <span>Getting nearby places...</span>
              <BounceLoader color={'#ED3524'} size={36} loading={isLoading}/>
            </SpinnerWrapper>

            {/* Error Message (if any) */
              fetchPlacesStatus.error ? 
              <Card  height={'45px'} backgroundColor={'#e53935'} color={'#fff'}>
                {`${fetchPlacesStatus.error} `}
                <Anchor onClick={this.props.clearFetchPlacesError}>
                  Cancel
                </Anchor>
              </Card> 
              : null 
            }

            <div>{!isLoading ? PlaceListComponent : null}</div>
          </div>

          {!fetchPlacesStatus.error && places.length <= 0 && !isLoading? 
            <DefaultContent>
              <p>Picking a restautrant doesn't have to be difficult</p>
              <p>Give me a try <span  role="img" aria-label="smile and point up">😁👆</span></p>
            </DefaultContent> : null
          }
        </AppBody>
      </AppWrapper>
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
  },
  setRandomPlaceIndex: (index) => {
    dispatch(setRandomPlaceIndex(index))
  },
  clearFetchPlacesError: () => {
    dispatch(resetFetchPlaceStatus());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)