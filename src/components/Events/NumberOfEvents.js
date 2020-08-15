import React from "react";

class NumberOfEvents extends React.Component {
  state = {
    length: this.props.length,
  };

  handleChange = (event) => {
    this.setState({ length: event.target.value });
  };
  render() {
    let { length } = this.state;
    return (
      <div className="NumberOfEvents">
        Show{" "}
        <input
          className="eventCount"
          value={length}
          name="eventCount"
          onChange={this.handleChange}
        />{" "}
        Events
      </div>
    );
  }
}

export default NumberOfEvents;
