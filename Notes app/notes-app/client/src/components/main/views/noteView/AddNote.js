import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import TextField from "@mui/material/TextField";
import { Scrollbars } from "react-custom-scrollbars";
import TagsInput from "./TagsInput";

function AddNote({
  handleAddNote,
  handleAddNoteStatus,
  addNoteStatus,
  notebookID,
  workspaceID,
  setSaveStatus,
  noteText,
  setNoteText,
  setNoteTitle,
  noteTitle,
  fullScreenStatus,
  tagName,
  setTagName,
}) {
  console.log(addNoteStatus);

  const handleChange = (value) => {
    setNoteText(value);
    console.log(value);
  };

  const handleSaveClick = () => {
    handleAddNoteStatus(false);
    if (noteText.trim().length > 0) {
      handleAddNote(noteTitle, noteText, notebookID, workspaceID);
    }
    console.log(noteText);
    setSaveStatus(true);
  };

  const selectedTags = (tags) => {
    console.log(tags);
  };

  console.log(addNoteStatus);

  return addNoteStatus ? (
    <div
      className='new m-auto p-2'
      style={fullScreenStatus ? { width: "auto" } : { maxWidth: "600px" }}
    >
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
      <TagsInput
        selectedTags={selectedTags}
        tags={[]}
        // tags={tags}
        // setTags={setTags}
        tagName={tagName}
        setTagName={setTagName}
      />
      <Scrollbars style={{ minHeight: "33vh" }}>
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
