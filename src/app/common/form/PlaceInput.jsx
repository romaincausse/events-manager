import React, { Component } from 'react'
import { Form, Message, Segment } from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutocomplete from 'react-places-autocomplete'


export default class PlaceInput extends Component {

  state = {
    scriptLoaded: false
  }

  handleScriptLoaded = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  renderDropDown = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
    const { placeholder } = this.props
    return (
      <div className="ui fluid selection">
        <input {...getInputProps({ className: 'my-input', placeholder: placeholder})} />
        <Segment attached className="autocomplete-dropdown divided ui items"  hidden={suggestions.length === 0}>
          {suggestions.map(suggestion => {
            let className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                  className += " item"
            return (
              <div {...getSuggestionItemProps(suggestion, { className })}>
                {suggestion.description}
              </div>
            );
          })}
        </Segment>
      </div>
    )
  }

  render() {
    const { input: { value, onChange }, width, onSelect, options, meta: { touched, error } } = this.props
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOe-PBP66vIJn9PZP0F6ZqeNQXSd1kO6g&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            value={value}
            options={options}
            onChange={onChange}
            onSelect={onSelect}
            searchOptions={options}
          >
            {this.renderDropDown}
          </PlacesAutocomplete>
        )}
        {touched && error && (
          <Message
            color="red"
            content={error}
          />
        )
        }
      </Form.Field>
    )
  }
}
