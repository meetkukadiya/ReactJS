import "./CurrentTab.css";
import { Link } from "react-router-dom";

function CurrentTab() {
  return (
    <>
      <div className="curTab items-center">
        <div className="createSlot">
          <Link to={"/"} className="currText">
            Create Bulk 15 Min. Slots
          </Link>
        </div>
        <div className="inactiveTab "> Create One Slots</div>
      </div>
    </>
  );
}

export default CurrentTab;
