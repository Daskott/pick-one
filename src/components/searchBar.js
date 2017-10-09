import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components'; 

const AutocompleteItemWrapper = styled.div`
    padding: 4px;
    text-align: left;
    font-size: 0.95em;
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
        const cssClasses = {
            root: 'has-feedback search-bar',
            input: 'search-input',
            autocompleteContainer: 'autocomplete-container',
            autocompleteItemActive: 'autocompleteItemActive',
            googleLogoContainer: 'googleLogoContainer'
        }
        const inputProps = {
            value: this.state.searchText,
            placeholder: "Search place",
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