import React from "react";

import ToolBar from "./noteView/ToolBar";
import RightContent from "./noteView/RightContent";
import AddNote from "./noteView/AddNote";
import EditNote from "./noteView/EditNote";

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
  starStatus,
  setContentTitle,
  handleEditNote,
  setFullScreenStatus,
  fullScreenStatus,
}) => {
  return (
    <div
      className={
        fullScreenStatus
          ? "col-sm-12 col-md-10 bg-white position-absolute"
          : "col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 pt-3"
      }
      style={
        fullScreenStatus
          ? {
              height: "100vh",
              width: "100%",
              paddingLeft: "10rem",
              paddingRight: "10rem",
            }
          : { height: "100vh" }
      }
    >
      <ToolBar
        id={id}
        fullText={fullText}
        setEditStatus={setEditStatus}
        setFullTextStatus={setFullTextStatus}
        setFullScreenStatus={setFullScreenStatus}
        fullScreenStatus={fullScreenStatus}
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
        starStatus={starStatus}
        setContentTitle={setContentTitle}
        fullScreenStatus={fullScreenStatus}
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
        fullText={fullText}
        setNoteTitle={setNoteTitle}
        noteTitle={noteTitle}
        fullScreenStatus={fullScreenStatus}
      />
      <EditNote
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
        setEditStatus={setEditStatus}
        id={id}
        contentTitle={contentTitle}
        handleEditNote={handleEditNote}
        setFullTextStatus={setFullTextStatus}
        setContentTitle={setContentTitle}
        setFullText={setFullText}
        fullScreenStatus={fullScreenStatus}
      />
    </div>
  );
};

export default NoteView;
