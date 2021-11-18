import React from "react";

import { useState } from "react";
import "../../../styles/NotesList.css";

import Note from "./noteList/Note";
import SearchBar from "./noteList/SearchBar";
import { Scrollbars } from "react-custom-scrollbars";

import { IoIosAdd } from "react-icons/io";
import { MdDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";

const NotesList = ({
  notes,
  handleDeleteNote,
  getNoteID,
  handleAddNoteStatus,
  nbName,
  notebookID,
  setNbDeleteStatus,
  nbSelect,
  handleSearchNote,
  setNbRenameStatus,
  featureStatus,
  selectedNoteId,
  setSelectedNoteId,
}) => {
  // const [selectedNoteId, setSelectedNoteId] = useState(-1);

  return (
    <div
      className='col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-3'
      style={{ height: "100vh", maxWidth: "365px" }}
    >
      <SearchBar handleSearchNote={handleSearchNote} />
      {featureStatus ? (
        <Scrollbars
          style={{ height: "80vh", width: "360px", marginTop: "3.5rem" }}
        >
          <div className='notes-list'>
            {notes.map((note, ind) => (
              <Note
                key={ind}
                id={note.id}
                text={note.text}
                date={note.date}
                handleDeleteNote={handleDeleteNote}
                // getNoteID={getNoteID}
                selected={selectedNoteId === note.id}
                onSelect={(id) => {
                  setSelectedNoteId(id);
                  getNoteID(id);
                }}
              />
            ))}
          </div>
        </Scrollbars>
      ) : (
        ""
      )}
      {nbSelect ? (
        <div className='noteList'>
          <div className='mb-2'>
            <div className='add-section mt-5'>
              <div className='d-flex justify-content-between align-items-center'>
                <h4 className='notebook' style={{ fontWeight: "600" }}>
                  {nbName}
                </h4>
                <IoIosAdd
                  className='mb-2 add-icon'
                  onClick={() => handleAddNoteStatus(true)}
                  src='./add-icon.svg'
                  alt='add-icon'
                  size='1.5rem'
                />
              </div>
            </div>
          </div>
          <Scrollbars style={{ height: "70vh", width: "360px" }}>
            <div className='notes-list'>
              {notes.map((note, ind) => (
                <Note
                  key={ind}
                  id={note.id}
                  text={note.text}
                  date={note.date}
                  handleDeleteNote={handleDeleteNote}
                  // getNoteID={getNoteID}
                  selected={selectedNoteId === note.id}
                  onSelect={(id) => {
                    setSelectedNoteId(id);
                    getNoteID(id);
                  }}
                />
              ))}
            </div>
          </Scrollbars>
          <div className='notebook-option text-end mb-3 mt-2'>
            <button
              type='button'
              className='ps-3 pe-3 me-3 btn btn-secondary btn-sm align-items-center'
              onClick={() => setNbRenameStatus(true)}
            >
              <MdOutlineModeEditOutline className='me-2' />
              Rename
            </button>
            <button
              type='button'
              className='ps-3 pe-3 btn btn-sm btn-danger'
              onClick={() => setNbDeleteStatus(true)}
            >
              <MdDeleteForever className='me-2' />
              Delete
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NotesList;
