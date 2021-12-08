import React, { useState } from "react";

import ToolBar from "./noteView/ToolBar";
import RightContent from "./noteView/RightContent";
import AddNote from "./noteView/AddNote";
import EditNote from "./noteView/EditNote";

import SignOut from "./noteView/SignOut";

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
  // starStatus,
  starredStatus,
  setContentTitle,
  handleEditNote,
  setFullScreenStatus,
  fullScreenStatus,
  clientId,
  onSignOutSuccess,
  lastSaved,
  dp,
  userName,
  mail,
  handleDeleteNote,
  handleAddTag,
  tags,
  setTags,
  getTagName,
  tagNames,
  setTagNames,
  allTags,
  setAllTags,
}) => {
  return (
    <div
      className={
        fullScreenStatus
          ? "col-sm-12 col-md-12 bg-white position-absolute"
          : "col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 pt-3"
      }
      style={
        fullScreenStatus
          ? {
              height: "100vh",
              paddingLeft: "10rem",
              paddingRight: "10rem",
            }
          : { height: "100vh" }
      }
    >
      {/* {fullScreenStatus ? (
        ""
      ) : (
        <SignOut
          clientId={clientId}
          onSignOutSuccess={onSignOutSuccess}
          dp={dp}
          userName={userName}
          mail={mail}
        />
      )} */}
      <ToolBar
        id={id}
        fullText={fullText}
        setEditStatus={setEditStatus}
        setFullTextStatus={setFullTextStatus}
        setFullScreenStatus={setFullScreenStatus}
        fullScreenStatus={fullScreenStatus}
        handleDeleteNote={handleDeleteNote}
        getTagName={getTagName}
        setTags={setTags}
        tagNames={tagNames}
        addNoteStatus={addNoteStatus}
        editStatus={editStatus}
        setAddNoteStatus={handleAddNoteStatus}
        clientId={clientId}
        onSignOutSuccess={onSignOutSuccess}
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
        // starStatus={starStatus}
        starredStatus={starredStatus}
        setContentTitle={setContentTitle}
        fullScreenStatus={fullScreenStatus}
        getTagName={getTagName}
        tagNames={tagNames}
        setTagNames={setTagNames}
        workspaceID={workspaceID}
        handleDeleteNote={handleDeleteNote}
        setEditStatus={setEditStatus}
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
        handleAddTag={handleAddTag}
        tags={tags}
        setTags={setTags}
        allTags={allTags}
        setAllTags={setAllTags}
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
        lastSaved={lastSaved}
        tags={tags}
        setTags={setTags}
        tagNames={tagNames}
        setTagNames={setTagNames}
        allTags={allTags}
      />
    </div>
  );
};

export default NoteView;
