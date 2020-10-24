import React from "react";
import "./App.css";
import EventList from "./components/Events/EventList";
import CitySearch from "./components/City/CitySearch";
import NumberOfEvents from "./components/Events/NumberOfEvents";
import { getEvents } from "./utilz/api";

import { Col, Container, Row } from "react-bootstrap";
import ChartView from "./components/Chart/ChartView";
import EventGenre from "./components/Events/EventGenre";

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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location)
        .length;
      const city = location.split(" ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    let { numberOfEvents, locations, events, filtered } = this.state;
    console.log("events & filter", filtered.length ? filtered : events);
    return (
      <Container>
        <div className="text-center">
          <h1>Meet App</h1>
          <div className="mb-3">Choose your nearest city</div>
          <CitySearch updateEvents={this.updateEvents} locations={locations} />
          <NumberOfEvents
            updateNumberOfEvents={this.updateNumberOfEvents}
            length={numberOfEvents}
          />
          <h4>Events in each day</h4>
          <Row>
            <Col>
              <EventGenre events={filtered.length ? filtered : events} />
            </Col>
            <Col>
              <ChartView getData={this.getData} />
            </Col>
          </Row>
        </div>
        <EventList events={filtered.length ? filtered : events} />
      </Container>
    );
  }
}

export default App;
