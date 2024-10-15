import React, { useEffect, useState } from "react";
import "./SlotList.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { Link } from "react-router-dom";

function SlotList() {
  const [slots, setSlotData] = useState([]);
  const [appointment, setAppointment] = useState("");

  const handleDateChange = (event) => {
    const selectedDate = moment(event["$d"]).format("DD-MM-YYYY");

    setAppointment(selectedDate);
    console.log("selectedDate :>> ", selectedDate);
  };

  const handleAppointment = () => {
    setAppointment("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/getAllSlotData"
      );
      setSlotData(response.data);
    };

    fetchData();
  }, []);

  const flattenedSlots = slots.flatMap((slot) =>
    slot.slots.map((s) => ({
      date: slot.date,
      time: s.time,
      seats: s.seats,
    }))
  );

  const filteredSlots = appointment
    ? flattenedSlots.filter((slot) => slot.date === appointment)
    : flattenedSlots;

  const columns = [
    {
      name: "Slot Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Slot Timing",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "Seating Capacity",
      selector: (row) => row.seats,
      sortable: true,
    },
  ];

  return (
    <>
      <div className="slots">
        <h3 className="DateD">
          Allocated Slots :{" "}
          <b>{appointment ? appointment : "All Appointments"} </b>
        </h3>
        <Link to={"/"}>
          <button className="p-[3px] relative ml-3">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Book Appointment
            </div>
          </button>
        </Link>

        <div className="displayDate">
          <div className="calander">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Basic date picker"
                  onChange={handleDateChange}
                  disablePast
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="AllAppointment">
            <input
              type="button"
              value="All Appointment"
              onClick={handleAppointment}
              className="submitBtn"
            />
          </div>
        </div>
        <div className="SlotTable">
          <DataTable
            columns={columns}
            data={filteredSlots}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
}

export default SlotList;
