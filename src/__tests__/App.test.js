import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import EventList from "../components/Events/EventList";
import Event from "../components/Events/Event";
import CitySearch from "../components/City/CitySearch";
import NumberOfEvents from "../components/Events/NumberOfEvents";

describe("<App /> component", () => {
  //Happen before all test
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  // Test if the EventList component is rendered
  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  //test if Event is rendered in EventList
  test("render correct number of events", () => {
    const EventListWrapper = shallow(<EventList />);
    EventListWrapper.setState({
      events: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    });
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });

  //test if Event is rendered in EventList
  test("render correct number of events", () => {
    const EventListWrapper = shallow(<EventList />);
    EventListWrapper.setState({
      events: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    });
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});
