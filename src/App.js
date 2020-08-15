import React from "react";
import "./App.css";
import EventList from "./components/Events/EventList";
import CitySearch from "./components/City/CitySearch";
import NumberOfEvents from "./components/Events/NumberOfEvents";

function App() {
  return (
    <div className="App">
      <EventList />
      <CitySearch />
      <NumberOfEvents length={20} />
    </div>
  );
}

export default App;
