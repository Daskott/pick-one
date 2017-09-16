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
      this.state = { places: [], isLoading: false, error:'' };
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

  render() {
    let PlaceListComponent = null;
    if (this.state.isLoading) 
      PlaceListComponent = <p className="blue"><strong>Loading...</strong></p>;
    else
      PlaceListComponent = <PlaceList places={this.state.places}></PlaceList>;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div className="padding-default">
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div className="panel panel-default content">
            <div className="panel-heading"><h2>Places Nearby</h2></div>
            <div>{ PlaceListComponent }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
