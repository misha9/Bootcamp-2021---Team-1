import React from "react";
import "../../../styles/DeleteNotebook.css";

function DeleteNotebook({
  nbDeleteStatus,
  setNbDeleteStatus,
  notebookID,
  handleDeleteNotebook,
  setNbSelect,
}) {
  console.log(nbDeleteStatus);

  const handleDelete = () => {
    console.log("Delete notebook");
    setNbDeleteStatus(false);
    handleDeleteNotebook(notebookID);
    setNbSelect(false);
  };

  return nbDeleteStatus ? (
    <div
      className='delete-nb position-fixed'
      style={{
        width: "100%",
        height: "100vh",
        zIndex: "999",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        right: "0px",
      }}
    >
      <div className='delete-notebook d-flex justify-content-center mt-5'>
        <div class='card position-related' style={{ minWidth: "444px" }}>
          <img
            src='./close-icon.svg'
            className='position-absolute close-icon'
            alt='close-icon'
            width='24px'
            style={{ top: "1.375rem", right: "1.5rem" }}
            onClick={() => setNbDeleteStatus(false)}
          />
          <div class='card-body pb-2' style={{ padding: "1.375rem" }}>
            <h5
              class='card-title mb-4'
              style={{ fontSize: "1.25rem", fontWeight: "600" }}
            >
              Delete ?
            </h5>
            <p className='mb-2'>
              All the notes in this notebook also get deleted.
            </p>
            <p className='mb-0'>You want to delete the notebook ?</p>
          </div>
          <div className='button d-flex justify-content-end me-3 mb-4'>
            <button
              type='button'
              className='btn btn-secondary border-0 pe-3 ps-3 me-2 btn-sm'
              onClick={() => setNbDeleteStatus(false)}
            >
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-danger border-0 pe-3 ps-3 btn-sm'
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeleteNotebook;
