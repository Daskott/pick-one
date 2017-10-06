import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components'; 

const AutocompleteItemWrapper = styled.div`
    padding: 4px;
    text-align: left;
`;

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchText: ''};
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
  
    handleSearchTextChange(newText){ 
        this.setState({searchText: newText});
    }

    handleSearch(){ 
       this.props.onSearch(this.state.searchText);
    }

    handleSelect(address) {
        this.setState({searchText: address});
        this.props.onSearch(address);
    }

    render() {

        const { currentAddress, error } = this.props; 
        const cssClasses = {
            root: 'has-feedback search-bar',
            input: 'search-input',
            autocompleteContainer: 'autocomplete-container',
            autocompleteItemActive: 'autocompleteItemActive'
        }
        const inputProps = {
            value: this.state.searchText,
            placeholder: error ? 'Enter an address' : currentAddress || "Enter an address",
            onChange: this.handleSearchTextChange
        }

        const AutocompleteItem = ({ formattedSuggestion }) => (
            <AutocompleteItemWrapper>
                <i className='fa fa-map-marker search__suggestion-icon'/>&nbsp;
                <strong>{`${formattedSuggestion.mainText} `}</strong>
                <small className="text-muted">{formattedSuggestion.secondaryText}</small>
            </AutocompleteItemWrapper>
        )
        return (
            <div className="content">
            {<h3 className="search-title">Find a place to go eat <span>🍽</span></h3>}
                <PlacesAutocomplete 
                    inputProps={inputProps} 
                    classNames={cssClasses} 
                    onSelect={this.handleSelect}
                    onEnterKeyDown={this.handleSearch} 
                    autocompleteItem={AutocompleteItem}/>
                {/*<span className="search-button">
                    <button className="btn btn-default" type="button" onClick={this.handleSearch}>Search</button>
                </span>*/}
            </div>
        )
  }
}

export default SearchBar;