import express from "express";
import { slots, getAllSlotData } from "../controller/slotController.js";

const route = express.Router();

route.post("/slots", slots);
route.get("/getAllSlotData", getAllSlotData);

export default route;
