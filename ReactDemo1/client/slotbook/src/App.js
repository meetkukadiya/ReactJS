import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Slots from "./components/Slots/Slots.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SlotList from "./components/SlotList/SlotList.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slots />} />
        <Route path="/slotlist" element={<SlotList />} />
      </Routes>
    </Router>
  );
}

export default App;
