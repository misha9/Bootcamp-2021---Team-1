import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "../../../../styles/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import TextField from "@mui/material/TextField";
import { Scrollbars } from "react-custom-scrollbars";
import TagInput from "./TagInput";

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
  tags,
  setTags,
  allTags,
  setAllTags,
}) {
  const handleChange = (value) => {
    setNoteText(value);
    console.log(value);
  };

  const handleSaveClick = () => {
    handleAddNoteStatus(false);
    if (noteText.trim().length > 0 || noteTitle.trim().length > 0) {
      console.log("clicking save");
      handleAddNote(noteTitle, noteText, notebookID, workspaceID, tags);
    }
    console.log(noteText);
    setSaveStatus(true);
  };

  // const selectedTags = (tags) => {
  //   console.log(tags);
  // };

  console.log(addNoteStatus);

  // useEffect(() => {
  //   if (addNoteStatus) {
  //     if (noteText.trim().length > 0) {
  //       handleAddNote(noteTitle, noteText, notebookID, workspaceID);
  //     }
  //     setSaveStatus(true);
  //   }
  // }, []);

  return addNoteStatus ? (
    <div
      className='new m-auto p-2 ps-3 mt-5'
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
      {/* <TagsInput
        selectedTags={selectedTags}
        tags={[]}
        // tags={tags}
        // setTags={setTags}
        tagName={tagName}
        setTagName={setTagName}
      /> */}
      <Scrollbars style={{ minHeight: "45vh" }}>
        <ReactQuill
          placeholder={"Type content here..."}
          onChange={handleChange}
          modules={modules("t1")}
          formats={formats}
          style={{ border: "none" }}
        />
      </Scrollbars>
      <TagInput
        tags={tags}
        setTags={setTags}
        allTags={allTags}
        setAllTags={setAllTags}
      />

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
