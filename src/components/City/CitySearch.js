import React, { Component } from "react";
// import { mockData } from "../../utilz/mock-data";
// import { extractLocations } from "../../utilz/api";

class CitySearch extends Component {
  state = {
    locations: this.props.location,
    query: "",
    suggestions: [],
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
  };

  handleItemClicked = (value) => {
    this.setState({ query: value });
  };

  render() {
    let { value } = this.state;
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={value}
          onChange={this.handleInputChanged}
        />
        <ul className="suggestions">
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CitySearch;
