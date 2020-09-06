import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import CitySearch from "../components/City/CitySearch";
import { mockData } from "../utilz/mock-data";
import { extractLocations } from "../utilz/api";
let locations = extractLocations(mockData);
const feature = loadFeature("./src/__features__/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  test("When user hasn't searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn't searched for any city", () => {});
    let AppWrapper;
    when("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    then("the user should see the list of upcoming events.", () => {
      AppWrapper.update();

      expect(AppWrapper.find(".Event").hostNodes()).toHaveLength(
        mockData.length
      );
    });
  });

  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    let CitySearchWrapper;
    given("the main page is open", () => {
      CitySearchWrapper = shallow(
        <CitySearch updateEvents={() => {}} locations={locations} />
      );
    });

    when("the user starts typing in the city textbox", () => {
      CitySearchWrapper.find(".city").simulate("change", {
        target: { value: "Berlin" },
      });
    });

    then(
      "the user should receive a list of cities (suggestions) that match what they've typed",
      () => {
        expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
      }
    );
  });

  test("User can select a city from the suggested list", ({
    given,
    when,
    then,
    and,
  }) => {
    let AppWrapper;

    given('user was typing "Berlin" in the city textbox', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find("input.city")
        // .hostNodes()
        .simulate("change", {
          target: { value: "Berlin" },
        });
    });

    and("the list of suggested cities is showing", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".suggestions li")).toHaveLength(2);
    });
    when(
      'the user selects a city (e.g., "Berlin, Germany") from the list',
      () => {
        AppWrapper.find(".suggestions li").at(0).simulate("click");
      }
    );

    then(
      'their city should be changed to that city (i.e., "Berlin, Germany")',
      () => {
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        expect(CitySearchWrapper.state("query")).toBe("Berlin, Germany");
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      () => {
        expect(AppWrapper.find(".Event").hostNodes()).toHaveLength(
          mockData.length
        );
      }
    );
  });
});

// test('User can expand an event to see its details', async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('http://localhost:3000/');

//   await page.waitForSelector('.event');
//   await page.click('.Event .details-btn');

//   const eventDetails = await page.$('.Event .event__Details');
//   expect(eventDetails).toBeDefined();
//   browser.close();
// });
