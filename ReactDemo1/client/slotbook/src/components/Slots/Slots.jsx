import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Menus from "../Menus/Menus";
import CurrentState from "../CurrentState/CurrentState";
import "./Slots.css";
import CurrentTab from "../CurrentTab/CurrentTab";
import SelectTimeAndDate from "../SelectTimeAndDate/SelectTimeAndDate";
import SlotList from "../SlotList/SlotList";

function Slots() {
  // console.log("isToday :>> ", isToday);
  // console.log("Selected Date :>> ", selectedDate);
  // return appointment

  

  return (
    <>
      <div className="searchF">
        <SearchBar className="search" />
      </div>
      <div className="menuf">
        <div className="LeftSpace">
          
          <Menus />
        </div>
        <div className="RightSpace">
          <div className="currents">
            <CurrentState />
          </div>
          <div className="currents1 items-center">
            <CurrentTab />
          </div>
          <div className="dateandtime">
            <SelectTimeAndDate />
          </div>
        </div>
      </div>
    </>
  );
}

export default Slots;
