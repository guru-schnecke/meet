import React from "react";

class NumberOfEvents extends React.Component {
  state = {
    length: 32,
  };

  handleChange = (event) => {
    let { value } = event.target;
    this.setState({ length: +value });
    if (value !== "") {
      this.props.updateNumberOfEvents(+value);
    }
  };

  render() {
    let { length } = this.state;
    // console.log(this.state.length);
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
