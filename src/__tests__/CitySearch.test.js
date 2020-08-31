import React from "react";
import { shallow, mount } from "enzyme";
import CitySearch from "../components/City/CitySearch";
import { extractLocations } from "../utilz/api";
import { mockData } from "../utilz/mock-data";

const locations = extractLocations(mockData);

describe("<CitySearch /> component", () => {
  let CitySearchWrapper;
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch locations={locations} />);
  });
  test("render text input", () => {
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });

  // test("renders a list of suggestions", () => {
  //   expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  // });

  test("renders text input correctly", () => {
    // const query = CitySearchWrapper.state("query");
    // expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
    const eventObject = { target: { value: "Berlin" } };
    CitySearchWrapper.find(".city").simulate("change", eventObject);
    expect(CitySearchWrapper.state("query")).toBe("Berlin");
  });

  // test("render list of suggestions correctly", () => {
  //   const CitySearchWrapper = shallow(<CitySearch locations={locations} />);
  //   const suggestions = CitySearchWrapper.state("suggestions");

  //   expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(
  //     suggestions.length + 1
  //   );
  //   for (let i = 0; i < suggestions.length; i += 1) {
  //     expect(CitySearchWrapper.find(".suggestions li").at(i).text()).toBe(
  //       suggestions[i].name_string
  //     );
  //   }
  // });
});

describe("<CitySearch /> integration", () => {
  test("get a list of cities when the user searches for Berlin", () => {
    const CitySearchWrapper = mount(
      <CitySearch locations={locations} updateEvents={() => {}} />
    );
    CitySearchWrapper.find(".city").simulate("change", {
      target: { value: "Berlin" },
    });
    expect(CitySearchWrapper.state("suggestions")).toEqual(["Berlin, Germany"]);
  });

  //
  test("renders a list of suggestions correctly", () => {
    const CitySearchWrapper = shallow(
      <CitySearch updateEvents={() => {}} locations={locations} />
    );
    CitySearchWrapper.find('input[type="text"]').simulate("change", {
      target: {
        value: "Berlin",
      },
    });
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
    CitySearchWrapper.find(".suggestions li").at(0).simulate("click");
    expect(CitySearchWrapper.state("query")).toBe("Berlin, Germany");
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(0);
  });

  test("selecting a suggestion should change query state", () => {
    const CitySearchWrapper = shallow(
      <CitySearch updateEvents={() => {}} locations={locations} />
    );
    CitySearchWrapper.setState({
      suggestions: locations,
    });
    CitySearchWrapper.find('input[type="text"]').simulate("change", {
      target: {
        value: "London",
      },
    });
    CitySearchWrapper.find(".suggestions li").at(0).simulate("click");
    expect(CitySearchWrapper.state("query")).toBe("London, UK");
  });
});
