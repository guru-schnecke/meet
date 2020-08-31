import React from "react";
import { shallow, mount } from "enzyme";

import EventList from "../components/Events/EventList";
import Event from "../components/Events/Event";

describe("<EventList /> ", () => {
  //test if Event is rendered in EventList
  test("render correct number of events", () => {
    const EventListWrapper = shallow(
      <EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
    );
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });
});
