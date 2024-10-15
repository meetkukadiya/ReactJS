import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./SelectTimeAndDate.css";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import moment from "moment";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Grid } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";

function SelectTimeAndDate() {
  const [appointment, setAppointment] = useState("");
  // const [startTime, setStartTime] = useState("");
  // const [startTime, setStartTime] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isToday, setIsToday] = useState(false);
  const [minEndTime, setMinEndTime] = useState(null);
  const [seatingCapacity, setSeatingCapacity] = useState(1);
  const [slots, setSlots] = useState([]);
  const [slotsCreated, setSlotsCreated] = useState(false);

  // const clearState = () => {
  //   setAppointment(dayjs());
  //   setStartTime(null);
  //   setEndTime(null);
  //   setIsToday(false);
  //   setMinEndTime(null);
  //   setSeatingCapacity(1);
  //   setSlots([]);
  // };

  const handleDateChange = (event) => {
    setStartTime(null);
    setEndTime(null);

    const selectedDate = moment(event["$d"]).format("DD-MM-YYYY");

    setAppointment(selectedDate);
    const isToday = selectedDate === moment(Date()).format("DD-MM-YYYY");
    setIsToday(isToday);

    // console.log("isToday :>> ", isToday);
    // console.log("Selected Date :>> ", selectedDate);
    // return appointment
  };

  const handleStartTimeChange = (time) => {
    // const selectedDate = event["$d"];
    setEndTime(null);

    const selectedStartTime = moment(time["$d"]).format("HH:mm");
    console.log("selectedStartTime :>> ", selectedStartTime);

    const getMinTime = selectedStartTime.split(":");
    const getMinHour = getMinTime[0];
    // const getMinMinute = getMinTime[1];
    const getMinMinute = getMinTime[1];
    // console.log("getMinHour :>> ", getMinHour);
    // console.log("getMinMinute :>> ", getMinMinute);
    // console.log("getMinTime :>> ", getMinTime);
    // const selectedStartTime = moment(time).format("HH:mm");
    // const liveTime = new Date().toLocaleTimeString();
    setStartTime(selectedStartTime);

    // const minEnd = selectedStartTime.add(15, "minute");
    const minHrAndMinu = dayjs()
      .set("hour", getMinHour)
      .set("minute", getMinMinute)
      .add(15, "minute")
      .startOf("minute");
    setMinEndTime(minHrAndMinu);

    // const minEndTime = selectedStartTime.clone().add(15, "minute");

    // const minEnd = selectedStartTime;

    // setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    // const selectedDate = event["$d"];

    // const selectedEndTime = moment(time["$d"]).format("HH:mm");
    // console.log("selectedEndTime :>> ", selectedEndTime);
    // // const selectedStartTime = moment(time).format("HH:mm");
    // // const liveTime = new Date().toLocaleTimeString();
    // setEndTime(selectedEndTime);

    const selectedEndTime = moment(time["$d"]).format("HH:mm");
    setEndTime(selectedEndTime);
    // const selectedEndTime = dayjs(time);
    // setEndTime(selectedEndTime.format("HH:mm"));

    // setStartTime(time);
  };

  const handleCancel = () => {
    setAppointment("");
    setStartTime(null);
    setEndTime(null);
    setIsToday(false);
    setMinEndTime(null);
    setSeatingCapacity(1);
    setSlots([]);
    setSlotsCreated(false);
  };

  const handleCreateSlots = async () => {
    if (!startTime || !endTime || !seatingCapacity) return;

    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");
    const intervals = [];
    let current = start;

    while (current <= end) {
      intervals.push(current.format("HH:mm"));
      current = current.add(15, "minutes");
    }

    const seatAllocation = Array(intervals.length).fill(0);
    let seatsLeft = seatingCapacity;

    for (let i = 0; i < intervals.length; i++) {
      const seatsForSlot = Math.ceil(seatsLeft / (intervals.length - i));
      seatAllocation[i] = seatsForSlot;
      seatsLeft -= seatsForSlot;
      // console.log("seatAllocation :>> ", seatAllocation);
      // console.log("seatsLeft :>> ", seatsLeft);
    }

    seatAllocation.reverse();
    console.log("reverse :>> ", seatAllocation);

    const slotsWithSeats = intervals.map((time, index) => ({
      time,
      seats: seatAllocation[index],
      date: appointment,
    }));

    setSlots((prevSlots) => ({
      ...prevSlots,
      [appointment]: slotsWithSeats,
    }));

    setSlots(slotsWithSeats);

    try {
      const response = await axios.post("http://localhost:8000/api/slots", {
        date: appointment,
        slots: slotsWithSeats,
      });

      toast.success(response.data.msg);
    } catch (error) {
      toast.error("Error creating slots");
      console.error(error);
    }
    setSlotsCreated(true);
    handleCancel(true);

    console.log("slots :>> ", slots);
    console.log("slotsWithSeats :>> ", slotsWithSeats);
    // clearState();
  };

  // const handleEndTimeChange = (time) => {
  //   // const selectedDate = event["$d"];
  //   const selectedEndTime = time();
  //   const liveTime = new Date().toLocaleTimeString();
  //   console.log("liveTime :>> ", liveTime);
  //   setEndTime(selectedEndTime);
  //   console.log("Selected End Time :>> ", selectedEndTime);
  // };

  // function handleDateChange(event) {a
  //   console.log("event :>> ", JSON.stringify(event));
  //   console.log("event :>> ", event["$d"]);
  // }

  return (
    <>
      <div className="dateandTimeF">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            {/* Date Picker */}
            <div className="startAndEndTime">
              <p>
                <b>1. SELECT DATE OF APPOINTMENT</b>
              </p>
              <p className="grayF">
                <b>Please select the dates that you'd like to open up slots.</b>
              </p>
              <div className="DatePickerWi">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    // defaultValue={dayjs(Date())}
                    dateFormat="dd/MM/yyyy"
                    disablePast
                    // value={value}
                    onChange={(event) => handleDateChange(event)}
                    className="FullCalander"
                  />
                </LocalizationProvider>
              </div>
              <p className="showDate">
                Selected Date :-
                <b>{appointment.toString()}</b>
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            {/* Time Picker  */}
            <div className="startAndEndTime">
              <div>
                <p>
                  <b>2. SELECT THE HOURS</b>
                </p>
                <p className="grayF">
                  <b>Please select the Start and End Time.</b>
                </p>
              </div>

              <div className="selectStartAndEnd">
                <div className="Time">
                  {/* <MultiSectionDigitalClockSection
          defaultValue={dayjs("2022-04-17T15:30")}
          ampm={false}
        /> */}
                  <p>Start Time : </p>

                  {/* <DatePicker
          // selected={dayjs(moment(startTime).format(""))}
          // selected={startTime ? dayjs(startTime, "HH:mm").toDate() : null}
          onChange={(time) => handleStartTimeChange(time)}
          // showTimeSelect
          // `showTimeSelectOnly`
          // timeIntervals={15}
          // timeCaption="Time"
          // timeFormat="HH:mm"
        /> */}
                  {/* <DatePicker
          selected={endTime}
          // onChange= (time) => handleEndTimeChange(time)
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          timeFormat="HH:mm"
          dateFormat="h:mm aa"
        /> */}
                  {/* <p>{startTime}</p> */}

                  {/* <DatePicker
          selected={startTime}
          ampm={false}
          onChange={(time) => handleStartTimeChange(time)}
          timeIntervals={15}
          showTimeSelect
          showTimeSelectOnly
          filterTime={filterPassedTime}
          timeFormat="HH:mm"
        /> */}

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DigitalClock
                      onChange={(time) => handleStartTimeChange(time)}
                      timeStep={15}
                      disablePast={isToday}
                      className="dclock"
                      ampm={false}
                    />
                  </LocalizationProvider>
                  <p className="grayF">
                    <b>Please select the start Time.</b>
                  </p>
                </div>

                <div className="Time">
                  {/* <MultiSectionDigitalClockSection
          defaultValue={dayjs("2022-04-17T15:30")}
          ampm={false}
        /> */}
                  <p>End Time : </p>

                  {/* <DatePicker
          // selected={dayjs(moment(startTime).format(""))}
          // selected={startTime ? dayjs(startTime, "HH:mm").toDate() : null}
          onChange={(time) => handleStartTimeChange(time)}
          // showTimeSelect
          // `showTimeSelectOnly`
          // timeIntervals={15}
          // timeCaption="Time"
          // timeFormat="HH:mm"
        /> */}
                  {/* <DatePicker
          selected={endTime}
          // onChange= (time) => handleEndTimeChange(time)
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          timeFormat="HH:mm"
          dateFormat="h:mm aa"
        /> */}
                  {/* <p>{startTime}</p> */}

                  {/* <DatePicker
          selected={startTime}
          ampm={false}
          onChange={(time) => handleStartTimeChange(time)}
          timeIntervals={15}
          showTimeSelect
          showTimeSelectOnly
          filterTime={filterPassedTime}
          timeFormat="HH:mm"
        /> */}

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DigitalClock
                      timeStep={15}
                      className="dclock"
                      ampm={false}
                      // minTime={minEndTime ? minEndTime.toDate() : null}
                      minTime={minEndTime}
                      onChange={(time) => handleEndTimeChange(time)}
                    />
                  </LocalizationProvider>
                  <p className="grayF">
                    <b>Please select the time your last 15 min Block Starts</b>
                  </p>
                </div>
              </div>
              <p>
                Selected Time :-
                <b>
                  {startTime} - {endTime}{" "}
                </b>
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            {/* Seating Capacity  */}
            <div className="SeatinC">
              <div>
                <p>
                  <b>3. SEATING CAPACITY</b>
                </p>
                <p className="grayF">
                  <b>Please enter total Seating Capacity.</b>
                </p>
              </div>
              <input
                type="number"
                name=""
                id=""
                min="1"
                className="SeatNumbers"
                value={seatingCapacity}
                onChange={(e) => setSeatingCapacity(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <input
          type="button"
          onClick={handleCancel}
          value="Cancel"
          className="cancelBtn"
        />

        <input
          type="button"
          value={slotsCreated ? "Slots Booked !" : "Create Slots"}
          onClick={handleCreateSlots}
          className="submitBtn"
        />
      </div>

      {/* Slots Listing Table */}
      {/* {slots.length > 0 && (
        <div className="slots">
          <h3 className="DateD">Allocated Slots on - {appointment}</h3>
          <div className="SlotTable">
            {/* <table border={2} cellPadding={1}>
              {slots.map((slot, index) => (
                <div key={index}>
                  {slot.time} - {slot.seats} seats
                </div>
              ))} */}
      {/* <table border={2} cellPadding={1}>
              <tr>
                <th>Slot Date</th>
                <th>Slot Timing</th>
                <th>Seating Capacity</th>
              </tr>
              {slots.map((slot, index) => {
                return (
                  <tr key={index}>
                    <td>{slot.date}</td>
                    <td>{slot.time}</td>
                    <td>{slot.seats}</td>
                  </tr>
                );
              })}
            </table>  */}

      {/* <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={slots}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div> */}
      {/* </div>
        </div>
      )} */}
    </>
  );
}
export default SelectTimeAndDate;
