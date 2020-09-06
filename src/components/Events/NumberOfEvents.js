import React from "react";
import { ErrorAlert } from "../Alert";

class NumberOfEvents extends React.Component {
  state = {
    length: 32,
    message: null,
  };

  handleChange = (event) => {
    let { value } = event.target;
    this.setState({ length: +value });
    if (value <= 0) {
      this.setState({ message: "Number should be greater than 0" });
    } else {
      this.setState({ message: null });
      this.props.updateNumberOfEvents(+value);
    }
  };

  render() {
    let { length, message } = this.state;
    // console.log(this.state.length);
    return (
      <div className="NumberOfEvents">
        {message && <ErrorAlert text={message} />}
        Show{" "}
        <input
          className="eventCount"
          value={length}
          name="eventCount"
          type="number"
          onChange={this.handleChange}
        />{" "}
        Events
      </div>
    );
  }
}

export default NumberOfEvents;
