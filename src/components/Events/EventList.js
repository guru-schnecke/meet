import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    let { events } = this.props;
    // console.log(events);
    return (
      <div className="EventList">
        {events &&
          events.map((event, id) => <Event key={event.id} event={event} />)}
      </div>
    );
  }
}

export default EventList;
