import React from "react";
import "../../../styles/RenameNotebook.css";

import TextField from "@mui/material/TextField";

function RenameNotebook({
  nbRenameStatus,
  setNbRenameStatus,
  nbName,
  nbID,
  setRenameNb,
  renameNb,
  handleRenameNotebook,
  workspaceID,
  setFeatureStatus,
}) {
  const handleRename = () => {
    console.log("Rename notebook");
    setNbRenameStatus(false);
    setFeatureStatus(false);
    handleRenameNotebook(nbID, renameNb, workspaceID);
  };

  return nbRenameStatus ? (
    <div
      className='rename-nb position-fixed'
      style={{
        width: "100%",
        height: "100vh",
        zIndex: "999",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className='rename-notebook d-flex justify-content-center mt-5'>
        <div class='card position-related' style={{ minWidth: "444px" }}>
          <img
            src='./close-icon.svg'
            className='position-absolute close-icon'
            alt='close-icon'
            width='24px'
            style={{ top: "1.375rem", right: "1.5rem" }}
            onClick={() => setNbRenameStatus(false)}
          />
          <div class='card-body' style={{ padding: "1.375rem" }}>
            <h5
              class='card-title mb-3'
              style={{ fontSize: "1.25rem", fontWeight: "600" }}
            >
              Rename Notebook title
            </h5>
            <TextField
              id='standard-basic'
              label='Enter notebook title here'
              variant='standard'
              // placeholder=""
              defaultValue={nbName}
              fullWidth
              onChange={(event) => {
                setRenameNb(event.target.value);
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

export default RenameNotebook;
