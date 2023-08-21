import React from "react";
import { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import "../styles/Navbar.css";

const Navbar = ({ onSelectGrouping, onSelectOrdering }) => {
  // const [isActive, setActive] = useState(false);
  // const [isGroupingActive, setGroupingActive] = useState(false);
  // const [isOrderingActive, setOrderingActive] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState("");
  // const [selectedOrdering, setSelectedOrdering] = useState("");
  const [selectedOrdering, setSelectedOrdering] = useState("priority");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupingSelection = (grouping) => {
    setSelectedGrouping(grouping);
    onSelectGrouping(grouping);
  };

  return (
    <div
      style={
        ({ height: "50px" },
        { backgroundColor: "wheat" },
        { margin: "0" },
        { padding: "0" })
      }
    >
      {/* <div>
        <AiOutlineMenuUnfold />
        <select>
          <option value="">Status</option>
          <option value="">User</option>
          <option value="">Priority</option>
        </select>
      </div> */}

      <div className="app">
        <button className="toggle-button" onClick={toggleDropdown}>
          <AiOutlineMenuUnfold /> Display
        </button>
        {isDropdownOpen && (
          <div className="dropdown-card">
            <span>
              Grouping &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;
              <select
                value={selectedGrouping}
                onChange={(e) => handleGroupingSelection(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </span>
            <span style={{ marginTop: "10px" }}>
              Ordering &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;
              {/* <select
                value={selectedOrdering}
                onChange={(e) => onSelectOrdering(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select> */}
              <select
                value={selectedOrdering}
                onChange={(e) => onSelectOrdering(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </span>
          </div>
        )}
      </div>

      {/* <div className="dropdown">
        <button className="dropdown-btn" onClick={(e) => setActive(!isActive)}>
          <AiOutlineMenuUnfold /> Display
        </button>
        {isActive && (
          <div className="dropdown-content">
            <div className="dropdown-item">
              <span>
                Grouping &nbsp;{" "}
                <button onClick={(e) => setGroupingActive(!isGroupingActive)}>
                  <div className="dropdown-item">Status</div>
                  {isGroupingActive && (
                    <div>
                      <div className="dropdown-item">User</div>
                      <div className="dropdown-item">Priority</div>
                    </div>
                  )}
                </button>
              </span>
            </div>
            <div className="dropdown-item">
              <span>
                Ordering &nbsp;
                <button onClick={(e) => setOrderingActive(!isOrderingActive)}>
                  <div className="dropdown-item">Priority</div>
                  {isOrderingActive && (
                    <div>
                      <div className="dropdown-item">Title</div>
                    </div>
                  )}
                </button>
              </span>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Navbar;
