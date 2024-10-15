import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  slots: [
    {
      time: String,
      seats: Number,
    },
  ],
});

export default mongoose.model("Slot", slotSchema);
