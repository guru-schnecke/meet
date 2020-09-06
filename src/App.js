import React from "react";
import "./App.css";
import EventList from "./components/Events/EventList";
import CitySearch from "./components/City/CitySearch";
import NumberOfEvents from "./components/Events/NumberOfEvents";
import { getEvents } from "./utilz/api";
import { Container } from "react-bootstrap";

class App extends React.Component {
  state = {
    locations: [],
    currentLocation: "all",
    events: [],
    filtered: [],
    numberOfEvents: 32,
  };
  updateEvents = (location) => {
    getEvents().then((response) => {
      const { currentLocation, numberOfEvents } = this.state;
      const locationEvents =
        currentLocation === "all"
          ? response.events
          : response.events.filter((event) => event.location === location);

      let events = [];
      if (!locationEvents.length) {
        events = response.events.slice(0, numberOfEvents);
      } else {
        events = locationEvents.slice(0, numberOfEvents);
      }

      return this.setState({
        filtered: events,
        currentLocation: location,
      });
    });
  };

  updateNumberOfEvents = (number) => {
    this.setState({ numberOfEvents: number });
    this.updateEvents("");
  };

  componentDidMount() {
    this.mounted = true;
    getEvents()
      .then((response) => {
        if (this.mounted) {
          this.setState({
            events: response.events,
            locations: response.locations,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let { numberOfEvents, locations, events, filtered } = this.state;

    return (
      <Container>
        <CitySearch updateEvents={this.updateEvents} locations={locations} />
        <NumberOfEvents
          updateNumberOfEvents={this.updateNumberOfEvents}
          length={numberOfEvents}
        />
        <EventList events={filtered.length ? filtered : events} />
      </Container>
    );
  }
}

export default App;
