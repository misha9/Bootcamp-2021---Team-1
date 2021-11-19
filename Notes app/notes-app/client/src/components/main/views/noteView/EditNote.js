import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import TextField from "@mui/material/TextField";
import { Scrollbars } from "react-custom-scrollbars";

function EditNote({
  handleEditNote,
  notebookID,
  workspaceID,
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
}) {
  const handleSaveClick = () => {
    setEditStatus(false);
    if (noteText.trim().length > 0) {
      handleEditNote(id, noteTitle, noteText, notebookID);
      //   setNoteText("");
      //   setNoteTitle("");
    }
    console.log(noteText);
    setSaveStatus(true);
    setFullTextStatus(true);
  };

  console.log(id, fullText, contentTitle);

  return editStatus ? (
    <div className='new m-auto' style={{ maxWidth: "600px" }}>
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
