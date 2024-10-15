import React from "react";
import logo from "../../img/logo.png";
import user from "../../img/user.png";
import "./SearchBar.css";

function SearchBar() {
  return (
    <>
      <div className="searchbar content-center p-4">
        <div className="logod">
          <div>
            <img src={logo} alt="" className="w-10" />
          </div>
          <div className="content-center brandname">
            <h3 className="font-mono text-2xl font-bold">Slot Booking</h3>
          </div>
        </div>
        <div className="SeachInLen">
          <input
            type="search"
            name=""
            id=""
            placeholder="🔎 Search anything"
            className="search"
          />
        </div>

        <div className="userdetail">
          <div className="uimg">
            <img src={user} alt="" className="user" />
          </div>
          <div>
            <div className="uname">
              <span>Mr. John</span>
            </div>
            <div className="utype">
              <span>Patient</span>
            </div>
          </div>
          <div className="ddown">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
