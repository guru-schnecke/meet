import React, { Component } from "react";
import { Form } from "react-bootstrap";
// import { mockData } from "../../utilz/mock-data";
// import { extractLocations } from "../../utilz/api";

class CitySearch extends Component {
  state = {
    locations: this.props.locations,
    query: "",
    suggestions: [],
    showSuggestions: false,
  };

  // handleInputChanged = (event) => {
  //   const value = event.target.value;
  //   this.setState({ query: value });
  // };
  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });

    return this.setState({
      query: value,
      suggestions,
      showSuggestions: true,
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
    });
    this.props.updateEvents(suggestion);
  };

  render() {
    let { value } = this.state;
    return (
      <div className="CitySearch mb-3">
        <Form.Control
          type="text"
          className="city"
          value={value}
          placeholder="Abuja, Nigeria"
          onChange={this.handleInputChanged}
        />
        <ul
          className={
            this.state.showSuggestions
              ? "suggestions showSuggestions"
              : "display-none"
          }
        >
          {this.state.suggestions.map((suggestion) => (
            <li
              className="suggested"
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
