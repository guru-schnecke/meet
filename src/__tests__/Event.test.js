import React from "react";
import { shallow } from "enzyme";
import Event from "../components/Events/Event";
describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(
      <Event
        event={{
          kind: "calendar#event",
          etag: '"3181159875584000"',
          id: "3qtd6uscq4tsi6gc7nmmtpqlct",
          status: "confirmed",
          htmlLink:
            "https://www.google.com/calendar/event?eid=M3F0ZDZ1c2NxNHRzaTZnYzdubW10cHFsY3RfMjAyMDA1MjBUMTIwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
          created: "2020-05-19T19:14:30.000Z",
          updated: "2020-05-27T11:45:37.792Z",
          summary: "React is Fun",
          description:
            "Love HTML, CSS, and JS? Want to become a cool front-end developer? \n\nReact is one of the most popular front-end frameworks. There is a huge number of job openings for React developers in most cities. \n\nJoin us in our free React training sessions and give your career a new direction. ",
          location: "Berlin, Germany",
          creator: {
            email: "fullstackwebdev@careerfoundry.com",
            self: true,
          },
          organizer: {
            email: "fullstackwebdev@careerfoundry.com",
            self: true,
          },
          start: {
            dateTime: "2020-05-20T14:00:00+02:00",
            timeZone: "Europe/Berlin",
          },
          end: {
            dateTime: "2020-05-20T15:00:00+02:00",
            timeZone: "Europe/Berlin",
          },
          recurrence: ["RRULE:FREQ=WEEKLY;WKST=SU;BYDAY=FR,MO,WE"],
          iCalUID: "3qtd6uscq4tsi6gc7nmmtpqlct@google.com",
          sequence: 0,
          reminders: {
            useDefault: true,
          },
        }}
      />
    );
  });

  beforeEach(() => {
    EventWrapper.setState({ show: false });
  });

  test("render text input", () => {
    expect(EventWrapper.find(".Event")).toHaveLength(1);
  });

  test('show extra info when user clicks on "Details" button', () => {
    EventWrapper.find(".detailsBtn").simulate("click");
    expect(EventWrapper.find(".EventDetail")).toHaveLength(1);
  });

  test('hide extra info when user clicks on "Details" button', () => {
    EventWrapper.setState({ show: true });
    EventWrapper.find(".detailsBtn").simulate("click");
    expect(EventWrapper.find(".EventDetail")).toHaveLength(0);
  });
});
