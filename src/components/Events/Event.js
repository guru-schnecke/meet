import React from "react";
import moment from "moment";
import "./Event.css";
class Event extends React.Component {
  state = {
    show: false,
  };

  handleClick = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    return (
      <div className="Event">
        <div className="dates">
          <div className="event__str">
            {moment(this.props.event.start.dateTime).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </div>
          <div className="event__end">
            {moment(this.props.event.end.dateTime).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </div>
        </div>
        <div className="event__summary">
          {this.props.event.summary}
          <div className="event__location">{this.props.event.location}</div>
          <button className="detailsBtn" onClick={this.handleClick}>
            Details
          </button>
        </div>

        {this.state.show && (
          <div className="EventDetail">
            <div className="event__description">
              {this.props.event.description}{" "}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
