import React, {Component} from 'react';
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
      this.state = { places: [], isLoading: false, error:'', showRandomPlace: false, randomPlace: []};
      this.handleRandomPickPlace = this.handleRandomPickPlace.bind(this);
  }
  
  componentDidMount(){
      const self = this;
      if (!navigator.geolocation){ 
        return this.setState({error: 'pele! your browser does not support this'});
      }

      this.setState({ isLoading: true });
      navigator.geolocation.getCurrentPosition((position) => {
        const location = `${String(position.coords.latitude)},${String(position.coords.longitude)}`;
        axios.get(`/api/places/?location=${location}`)
        .then((response) => {
          const result = response.data;
            if (result.success){
                const data = result.data;
                self.setState({ places: data, isLoading: false });
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
            this.setState({ isLoading: false });
        });
      })
  }

  handleRandomPickPlace(){
    const { places } = this.state;
    if (places.length <= 0) return;
    const randomIndex = Math.floor(Math.random() * places.length);
    this.setState({ randomPlace: [places[randomIndex]], showRandomPlace: true });
  }

  render() {
    let PlaceListComponent = null;
    if (this.state.isLoading) 
      PlaceListComponent = <p className="blue"><strong>Loading...</strong></p>;
    else if (this.state.showRandomPlace)
      PlaceListComponent = <PlaceList places={this.state.randomPlace}></PlaceList>;
    else
      PlaceListComponent = <PlaceList places={this.state.places}></PlaceList>;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div className="padding-default">
          <div className="panel panel-default content">
            <div className="panel-heading"><h2>Places Nearby</h2> 
              <a href="#" onClick={this.handleRandomPickPlace}>Random Pick</a> |	&nbsp; 
              <a href="#" onClick={ () => this.setState({ showRandomPlace: false })}>Show All</a> 
            </div>
            <div>{ PlaceListComponent }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
