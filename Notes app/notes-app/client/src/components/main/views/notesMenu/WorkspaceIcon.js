import React from "react";
import Icon from "@mui/material/Icon";
import { Scrollbars } from "react-custom-scrollbars";

import SearchIcon from "../SearchIcon";

function WorkspaceIcon({
  wsIcon,
  setWsIcon,
  getAllIcons,
  icons,
  setIcons,
  handleSearchIcon,
  workspaceIcon,
  updateIcon,
  wsID,
}) {
  return (
    <div>
      <div className='d-flex'>
        <div className='btn-group'>
          <button
            type='button'
            className='btn shadow-none p-0'
            data-bs-toggle='dropdown'
            aria-expanded='false'
            // onMouseEnter={() => setLogoutStatus(false)}
          >
            <Icon onClick={getAllIcons}>{workspaceIcon}</Icon>
          </button>
          <ul
            className='dropdown-menu p-0'
            style={{
              maxWidth: "170px",
              maxHeight: "200px",
              overflow: "hidden",
            }}
          >
            <li className='p-1 pb-0 mb-2'>
              <SearchIcon handleSearchIcon={handleSearchIcon} />
            </li>
            <Scrollbars style={{ height: "50vh" }}>
              <li className='p-1 d-flex flex-wrap'>
                {icons.map((icon) => (
                  <div
                    className='m-2'
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // setWsIcon(icon);
                      updateIcon(wsID, icon);
                      setIcons([]);
                    }}
                  >
                    <Icon fontSize='small'>{icon}</Icon>
                  </div>
                ))}
              </li>
            </Scrollbars>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceIcon;
