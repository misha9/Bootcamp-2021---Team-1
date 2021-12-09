import React from "react";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
// import * as Icons from "@mui/icons-material";
// import {
//   WorkOutlineOutlinedIcon,
//   HomeOutlinedIcon,
//   PersonOutlineOutlinedIcon,
// } from "@mui/icons-material";
// import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import SearchBar from "./noteList/SearchBar";

const icons = ["HomeOutlinedIcon", "PersonOutlineOutlinedIcon"];

// const icons = [
//   {
//     path: "@mui/icons-material/WorkOutlineOutlined",
//     name: "WorkOutlineOutlinedIcon",
//   },
//   {
//     path: "@mui/icons-material/HomeOutlined",
//     name: "HomeOutlinedIcon",
//   },
//   {
//     path: "@mui/icons-material/PersonOutlineOutlined",
//     name: "PersonOutlineOutlinedIcon",
//   },
// ];
// icons.map((icon) => {
//   return "import ${icon.name} from (icon.path)";
// });

function CreateWorkspace({
  addWorkspaceStatus,
  setAddWorkspaceStatus,
  userID,
  addWorkspace,
}) {
  const [workspaceName, setWorkspaceName] = useState("");

  // const icons = ["MdAccountBalance", "MdAssignmentReturned", "MdCardTravel"];
  // console.log(Icons);
  return addWorkspaceStatus ? (
    <div
      className='position-fixed'
      style={{
        width: "100%",
        height: "100vh",
        zIndex: "999",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        right: "0px",
      }}
    >
      <div className='notebook d-flex justify-content-center mt-5'>
        <div class='card position-related' style={{ minWidth: "444px" }}>
          <img
            src='./close-icon.svg'
            className='position-absolute close-icon'
            alt='close-icon'
            width='24px'
            style={{ top: "1.375rem", right: "1.5rem" }}
            onClick={() => setAddWorkspaceStatus(false)}
          />
          <div class='card-body' style={{ padding: "1.375rem" }}>
            <h5
              class='card-title mb-3'
              style={{ fontSize: "1.25rem", fontWeight: "600" }}
            >
              Create Workspace
            </h5>
            <div className='d-flex'>
              <div className='btn-group'>
                <button
                  type='button'
                  className='btn shadow-none p-0 pt-3 me-2'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                  // onMouseEnter={() => setLogoutStatus(false)}
                >
                  <WorkOutlineOutlinedIcon />
                </button>
                <ul className='dropdown-menu p-0 mt-1'>
                  <li className='p-2'>
                    <SearchBar />
                  </li>
                  <li className='p-2'>
                    <span>{/* <MdCardTravel /> */}</span>
                  </li>
                </ul>
              </div>
              <TextField
                id='standard-basic'
                label='Enter workspace title here'
                variant='standard'
                fullWidth
                onChange={(event) => setWorkspaceName(event.target.value)}
              />
            </div>
          </div>
          <div className='d-flex justify-content-end me-3 mb-4'>
            <button
              type='button'
              className='btn btn-primary border-0'
              onClick={() => {
                addWorkspace(userID, workspaceName);
                setAddWorkspaceStatus(false);
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default CreateWorkspace;
