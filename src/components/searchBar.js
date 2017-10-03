import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchText: ''};
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
  
    handleSearchTextChange(newText){ 
        this.setState({searchText: newText});
    }

    handleSearch(){ 
       this.props.onSearch(this.state.searchText);
    }

    render() {
        const currentAddress = this.props.currentAddress; 
        const cssClasses = {
            root: 'has-feedback search-bar',
            input: 'search-input',
            autocompleteContainer: 'autocomplete-container'
        }
        const inputProps = {
            value: this.state.searchText,
            placeholder: currentAddress || "Enter an address",
            onChange: this.handleSearchTextChange
        }
        const AutocompleteItem = ({ formattedSuggestion }) => (
            <div className="search-suggestion-item">
                <i className='fa fa-map-marker search__suggestion-icon red'/>&nbsp;
                <strong>{formattedSuggestion.mainText}</strong>{' '}
                <small className="text-muted">{formattedSuggestion.secondaryText}</small>
            </div>
        )
        return (
            <div className="content">
                <h3 className="search-title">Find a place to go eat <span>🍽</span></h3>
                <PlacesAutocomplete inputProps={inputProps} classNames={cssClasses} onEnterKeyDown={this.handleSearch} autocompleteItem={AutocompleteItem}/>
                {/*<span className="search-button">
                    <button className="btn btn-default" type="button" onClick={this.handleSearch}>Search</button>
                </span>*/}
            </div>
        )
  }
}

export default SearchBar;