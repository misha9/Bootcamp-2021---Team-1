import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import TextField from "@mui/material/TextField";
import { Scrollbars } from "react-custom-scrollbars";

function AddNote({
  handleAddNote,
  handleAddNoteStatus,
  addNoteStatus,
  notebookID,
  workspaceID,
  setSaveStatus,
  noteText,
  setNoteText,
  fullText,
  setNoteTitle,
  noteTitle,
}) {
  console.log(addNoteStatus);

  let currentText = fullText;

  const handleChange = (value) => {
    setNoteText(value);
    console.log(value);
  };

  // function handleNoteTitle(e) {
  //   console.log(e.target.value);
  //   setNoteTitle(e.target.value);
  //   // console.log(noteTitle);
  // }

  const handleSaveClick = () => {
    handleAddNoteStatus(false);
    if (noteText.trim().length > 0) {
      handleAddNote(noteTitle, noteText, notebookID, workspaceID);
      // setNoteText("");
      // setNoteTitle("");
    }
    console.log(noteText);
    setSaveStatus(true);
  };

  console.log(addNoteStatus);

  return addNoteStatus ? (
    <div className='new m-auto' style={{ maxWidth: "600px" }}>
      <EditorToolbar toolbarId={"t1"} />

      <div className='form-group mb-3 mt-3'>
        <TextField
          id='standard-textarea'
          label='Enter a title'
          placeholder='Enter a title for the note'
          multiline
          variant='standard'
          fullWidth
          onChange={(e) => setNoteTitle(e.target.value)}
        />
      </div>
      <Scrollbars style={{ minHeight: "40vh" }}>
        <ReactQuill
          placeholder={"Type content here..."}
          onChange={handleChange}
          modules={modules("t1")}
          formats={formats}
          style={{ border: "none" }}
        />
      </Scrollbars>

      <div className='text-end'>
        <button className='save btn btn-dark mt-3' onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddNote;
