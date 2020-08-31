import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../components/Events/EventList";
import Event from "../components/Events/Event";
import CitySearch from "../components/City/CitySearch";
import NumberOfEvents from "../components/Events/NumberOfEvents";
import { mockData } from "../utilz/mock-data";

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

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe("<App /> integration", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = mount(<App />);
  });

  afterAll(() => {
    AppWrapper.unmount();
  });
  test("get list of events after the user selects a city", async () => {
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.instance().handleItemClicked("Berlin, Germany");

    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);

    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(
      "Berlin, Germany"
    );
  });

  test("change state after getting list of events", async () => {
    const AppWrapper = shallow(<App />);
    AppWrapper.instance().updateEvents("");
    await AppWrapper.update();

    expect(await AppWrapper.state("events")).toStrictEqual(mockData);
  });

  test("render correct list of events", () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({
      events: mockData,
    });
    expect(AppWrapper.find(".Event")).toHaveLength(mockData.length);
  });
});
