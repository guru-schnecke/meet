import React, { Component } from "react";
import Event from "./Event";
import { mockData } from "../../utilz/mock-data";
// import { extractLocations } from "../../utilz/api";

class EventList extends Component {
  state = {
    events: mockData,
  };
  render() {
    let { events } = this.state;
    return (
      <div className="EventList">
        {events.map((event, id) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    );
  }
}

export default EventList;
