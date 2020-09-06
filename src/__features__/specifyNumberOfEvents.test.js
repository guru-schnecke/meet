import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import NumberOfEvents from "../components/Events/NumberOfEvents";
import { mount, shallow } from "enzyme";
import App from "../App";
import { mockData } from "../utilz/mock-data";

const feature = loadFeature("./src/__features__/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("A list of events has been loaded", () => {
      AppWrapper = mount(<App />);
    });

    when(
      "User hasn’t yet specified number of events shown on dashboard",
      () => {}
    );

    then("32 events around the users location will be shown by default", () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state("length")).toEqual(32);
    });
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given(
      "User hasn’t yet specified number of events shown on dashboard",
      () => {
        AppWrapper = mount(<App />);
      }
    );

    when(
      "User changed number of events shown on dashboard in app settings",
      () => {
        AppWrapper.update();
        const eventNumber = { target: { value: 5 } };
        AppWrapper.find(".eventCount").simulate("change", eventNumber);
      }
    );

    then("Customized number of events should be shown on dashboard", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".Event").hostNodes()).toHaveLength(5);
    });
  });
});
