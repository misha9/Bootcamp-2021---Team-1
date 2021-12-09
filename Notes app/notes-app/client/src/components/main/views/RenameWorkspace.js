import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "../../../styles/RenameWorkspace.css";

function RenameWorkspace({
  wsRenameStatus,
  setWsRenameStatus,
  handleRenameWorkspace,
  wsName,
  workspaceID,
}) {
  const [renameWs, setRenameWs] = useState("");
  const handleRename = () => {
    console.log("Rename workspace");
    handleRenameWorkspace(renameWs, workspaceID);
    setWsRenameStatus(false);
  };
  return wsRenameStatus ? (
    <div
      className='rename-ws position-fixed'
      style={{
        width: "100%",
        height: "100vh",
        zIndex: "999",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        right: "0px",
      }}
    >
      <div className='rename-workspace d-flex justify-content-center mt-5'>
        <div class='card position-related' style={{ minWidth: "444px" }}>
          <img
            src='./close-icon.svg'
            className='position-absolute close-icon'
            alt='close-icon'
            width='24px'
            style={{ top: "1.375rem", right: "1.5rem" }}
            onClick={() => setWsRenameStatus(false)}
          />
          <div className='card-body' style={{ padding: "1.375rem" }}>
            <h5
              className='card-title mb-3'
              style={{ fontSize: "1.25rem", fontWeight: "600" }}
            >
              Rename Workspace title
            </h5>
            <TextField
              id='standard-basic'
              label='Enter workspace title here'
              variant='standard'
              // placeholder=""
              defaultValue={wsName}
              fullWidth
              onChange={(event) => {
                setRenameWs(event.target.value);
              }}
            />
          </div>
          <div className='d-flex justify-content-end me-3 mb-4'>
            <button
              type='button'
              className='btn btn-primary border-0'
              onClick={() => handleRename()}
            >
              Rename
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default RenameWorkspace;
