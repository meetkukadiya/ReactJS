import Slot from "../model/slotModel.js";

export const slots = async (req, res) => {
  try {
    const slotData = new Slot(req.body);
    if (!slotData) {
      return res.status(404).json({ msg: "User Data not found" });
    }
    const savedData = await slotData.save();
    res.status(200).json({ data: savedData, msg: "User created Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllSlotData = async (req, res) => {
  try {
    const slotData = await Slot.find();
    if (!slotData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(slotData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
