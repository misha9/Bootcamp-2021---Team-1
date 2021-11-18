import React from "react";

import ToolBar from "./noteView/ToolBar";
import RightContent from "./noteView/RightContent";
import AddNote from "./noteView/AddNote";

const NoteView = ({
  id,
  addNoteStatus,
  handleDeleteStatus,
  notebookID,
  nbSelect,
  deleteStatus,
  handleAddNote,
  setSaveStatus,
  handleAddNoteStatus,
  workspaceID,
  getAllBookmark,
  setBookmarkStatus,
  bookmarkStatus,
  fullText,
  setFullText,
  fullTextStatus,
  setFullTextStatus,
  getFullContent,
  noteText,
  setNoteText,
  setEditStatus,
  editStatus,
  setNoteTitle,
  noteTitle,
  contentTitle,
}) => {
  return (
    <div
      className='col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 pt-3'
      style={{ height: "100vh" }}
    >
      <ToolBar
        id={id}
        handleAddNoteStatus={handleAddNoteStatus}
        fullText={fullText}
        setEditStatus={setEditStatus}
      />
      <RightContent
        id={id}
        addNoteStatus={addNoteStatus}
        handleDeleteStatus={handleDeleteStatus}
        notebookID={notebookID}
        nbSelect={nbSelect}
        deleteStatus={deleteStatus}
        getAllBookmark={getAllBookmark}
        setBookmarkStatus={setBookmarkStatus}
        bookmarkStatus={bookmarkStatus}
        fullText={fullText}
        setFullText={setFullText}
        fullTextStatus={fullTextStatus}
        setFullTextStatus={setFullTextStatus}
        getFullContent={getFullContent}
        contentTitle={contentTitle}
      />
      <AddNote
        addNoteStatus={addNoteStatus}
        notebookID={notebookID}
        nbSelect={nbSelect}
        workspaceID={workspaceID}
        handleAddNoteStatus={handleAddNoteStatus}
        handleAddNote={handleAddNote}
        setSaveStatus={setSaveStatus}
        noteText={noteText}
        setNoteText={setNoteText}
        editStatus={editStatus}
        fullText={fullText}
        setNoteTitle={setNoteTitle}
        noteTitle={noteTitle}
      />
    </div>
  );
};

export default NoteView;
