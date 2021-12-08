import React, { useState, useEffect } from "react";
import "../../../../styles/Tags.css";
import SearchBar from "./SearchBar";
import { Scrollbars } from "react-custom-scrollbars";
import Note from "./Note";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
  allTags,
}) {
  console.log(tagDetails);
  const [tagSelect, setTagSelect] = useState(false);
  const [tagName, setTagName] = useState("");
  const [expand, setExpand] = useState(false);
  const [selected, setSelected] = useState();

  return (
    <div className='tags'>
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

      <div>
        <SearchBar tagStatus={tagStatus} handleSearchNote={handleSearchNote} />
        <div className='card mt-3' style={{ borderRadius: "20px" }}>
          <div
            className='card-body small d-flex flex-wrap'
            style={{
              height: expand ? "auto" : "140px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tagDetails.map((tag, index) => (
              <div
                className='me-1 tag-name p-1 ps-2 pe-2'
                style={{
                  borderRadius: "20px",
                  cursor: "pointer",
                  color: selected === index ? "white" : "black",
                  backgroundColor: selected === index ? "#ffab45" : "white",
                }}
                onClick={() => {
                  getTagNotes(tag.noteIDs);
                  setTagSelect(true);
                  setFeatureStatus(false);
                  setTagName(tag.tagName);
                  setSelected(index);
                }}
              >
                #{tag.tagName}
              </div>
            ))}
          </div>
          <div
            className='d-flex align-items-center justify-content-end p-2 ps-3 pe-3 small'
            style={{ borderTop: "1px solid rgba(0,0,0,.125)" }}
            onClick={() => setExpand(!expand)}
          >
            <div
              className='text-muted'
              style={{ fontWeight: "500", fontSize: "0.75rem" }}
            >
              {expand ? "Close" : "Show more"}
            </div>
            <div>
              {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>
        </div>
        {tagSelect ? (
          <Scrollbars
            style={{
              height: expand ? "30vh" : "39.8vh",
              width: "360px",
              marginTop: "1rem",
            }}
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Tags;
