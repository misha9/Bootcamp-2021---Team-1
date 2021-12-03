import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Scrollbars } from "react-custom-scrollbars";
import Note from "./Note";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

function Tags({
  tagStatus,
  tagDetails,
  getTagNotes,
  notes,
  setLastSaved,
  selectedNoteId,
  setSelectedNoteId,
  getNoteID,
  setFeatureStatus,
  handleSearchNote,
}) {
  const [tagSelect, setTagSelect] = useState(false);
  const [tagName, setTagName] = useState("");
  return (
    <div>
      <h4
        className='mb-3'
        style={{
          fontWeight: "600",
          textTransform: "capitalize",
          color: "#161308",
          font: "normal normal bold 32px/43px Roboto",
          marginTop: "3rem",
        }}
      >
        Tags
      </h4>

      {tagSelect ? (
        <div>
          <Chip
            label={tagName}
            // onClick={handleClick}
            onDelete={() => {
              setTagSelect(false);
            }}
            deleteIcon={<CloseIcon />}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #AFAFAF",
              fontWeight: "500",
              color: "#FFAB45",
            }}
          />
          <Scrollbars
            style={{ height: "68vh", width: "360px", marginTop: "1rem" }}
          >
            <div className='notes-list'>
              {notes.map((note, ind) => (
                <Note
                  key={ind}
                  id={note.id}
                  title={note.title}
                  text={note.text}
                  date={note.date}
                  // handleDeleteNote={handleDeleteNote}
                  selected={selectedNoteId === note.id}
                  onSelect={(id) => {
                    setSelectedNoteId(id);
                    getNoteID(id);
                  }}
                  tags={note.tags}
                  setLastSaved={setLastSaved}
                />
              ))}
            </div>
          </Scrollbars>
        </div>
      ) : (
        <div>
          <SearchBar
            tagStatus={tagStatus}
            handleSearchNote={handleSearchNote}
          />
          <Scrollbars
            style={{ height: "65vh", width: "360px", marginTop: "1rem" }}
          >
            {tagDetails.map((tag) => (
              <div
                className='d-flex justify-content-between mb-3'
                style={{
                  backgroundColor: "#FBFBFB",
                  borderRadius: "20px",
                  maxWidth: "340px",
                  padding: "0.875rem 1.5rem",
                }}
                onClick={() => {
                  getTagNotes(tag.noteIDs);
                  setTagSelect(true);
                  setFeatureStatus(false);
                  setTagName(tag.tagName);
                }}
              >
                <p className='m-0 small'>{tag.tagName}</p>
                <p className='m-0 small'>{tag.noteIDs.length}</p>
              </div>
            ))}
          </Scrollbars>
        </div>
      )}
    </div>
  );
}

export default Tags;
