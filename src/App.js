import React from "react";
import "./App.css";
import EventList from "./components/Events/EventList";
import CitySearch from "./components/City/CitySearch";

function App() {
  return (
    <div className="App">
      <EventList />
      <CitySearch />
    </div>
  );
}

export default App;
