import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import TextField from "@mui/material/TextField";
import { Scrollbars } from "react-custom-scrollbars";

function EditNote({
  handleEditNote,
  notebookID,
  setSaveStatus,
  noteText,
  setNoteText,
  editStatus,
  fullText,
  setNoteTitle,
  noteTitle,
  setEditStatus,
  id,
  contentTitle,
  setFullTextStatus,
  setContentTitle,
  setFullText,
  fullScreenStatus,
}) {
  const handleSaveClick = () => {
    setEditStatus(false);
    console.log(noteTitle.trim().length);
    console.log(fullText.trim().length);
    // handleEditNote(id, noteTitle, noteText, notebookID);
    if (fullText.trim().length > 0) {
      handleEditNote(id, noteTitle, fullText, notebookID);
    }
    // else if (noteTitle.trim().length > 0) {
    //   handleEditNote(id, noteTitle, noteText, notebookID);
    // }
    console.log(noteText);
    setSaveStatus(true);
    setFullTextStatus(true);
  };

  console.log(id, fullText, contentTitle);
  console.log(id, noteTitle, fullText, notebookID);

  return editStatus ? (
    <div
      className='new m-auto'
      style={fullScreenStatus ? { width: "100%" } : { maxWidth: "600px" }}
    >
      <EditorToolbar toolbarId={"t1"} />

      <div className='form-group mb-3 mt-3'>
        <TextField
          id='standard-textarea'
          placeholder='Enter a title for the note'
          multiline
          variant='standard'
          fullWidth
          defaultValue={contentTitle}
          onChange={(e) => {
            setNoteTitle(e.target.value);
            setContentTitle(e.target.value);
          }}
        />
      </div>
      <Scrollbars style={{ minHeight: "40vh" }}>
        <ReactQuill
          placeholder={"Type content here..."}
          onChange={(e) => {
            setNoteText(e);
            setFullText(e);
          }}
          modules={modules("t1")}
          formats={formats}
          style={{ border: "none" }}
          defaultValue={fullText}
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

export default EditNote;
