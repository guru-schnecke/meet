import React from "react";
import { shallow } from "enzyme";
import Event from "../components/Events/Event";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event />);
  });
  test("render text input", () => {
    expect(EventWrapper.find(".Event")).toHaveLength(1);
  });
});
