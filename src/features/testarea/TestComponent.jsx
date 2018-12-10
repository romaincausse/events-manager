import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button} from 'semantic-ui-react'
import { incrementCounter, decrementCounter, incrementAsync } from './testActions'
import { openModal } from '../modals/modalActions'
import Script from 'react-load-script'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const mapState = (state) => ({
  data: state.test.data,
  loading: state.test.loading
})

const actions = {
  incrementCounter,
  decrementCounter,
  incrementAsync,
  openModal
}

class TestComponent extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };


  state = { 
    address: '',
    scriptLoaded: false
   };

   handleScriptLoaded = () => {
     this.setState({
      scriptLoaded : true
     })
   }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    const { incrementAsync, decrementCounter, openModal, data , loading} = this.props
    const {scriptLoaded} = this.state
    return (
      <div>
        <Script 
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOe-PBP66vIJn9PZP0F6ZqeNQXSd1kO6g&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button loading={loading} onClick={incrementAsync} color="green" content="Increment" />
        <Button loading={loading} onClick={decrementCounter} color="red" content="Decrement" />
        <Button onClick={() => openModal("TestModal", {data: 43})} color="teal" content="Open modal"/>

        <br /><br />
        {scriptLoaded && <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        }
        
      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent)
