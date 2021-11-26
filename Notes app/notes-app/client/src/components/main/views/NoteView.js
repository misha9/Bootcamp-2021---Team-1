import React, { useState } from "react";

import ToolBar from "./noteView/ToolBar";
import RightContent from "./noteView/RightContent";
import AddNote from "./noteView/AddNote";
import EditNote from "./noteView/EditNote";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { GoogleLogout } from "react-google-login";

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
  clientId,
  onSignOutSuccess,
  tagName,
  setTagName,
  dp,
  userName,
  mail,
}) => {
  const [logoutStatus, setLogoutStatus] = useState(false);
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
      {fullScreenStatus ? (
        ""
      ) : (
        <div className='sign-out text-end mb-3'>
          <div className='btn-group'>
            <button
              type='button'
              className='btn shadow-none p-0'
              // style={{ borderRadius: "100px", borderColor: "black" }}
              data-bs-toggle='dropdown'
              aria-expanded='false'
              onMouseEnter={() => setLogoutStatus(false)}
            >
              <img
                className='rounded-circle m-0'
                style={{ maxWidth: "32px", height: "auto" }}
                src={dp}
                alt=''
              />
            </button>
            <ul className='dropdown-menu p-0 mt-1'>
              <li className='p-2'>
                <div className='p-3 text-center'>
                  <div className='p-2'>
                    <img src={dp} className='rounded-circle m-0' alt='' />
                  </div>
                  <div>{userName}</div>
                  <div className='small text-secondary p'>{mail}</div>
                  <div className='pt-3'>
                    <GoogleLogout
                      className='google-logout dropdown-item'
                      clientId={clientId}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          onMouseEnter={() => {
                            setLogoutStatus(true);
                          }}
                          onMouseLeave={() => setLogoutStatus(false)}
                          style={{
                            width: "100%",
                            // border: "none",
                            padding: "0.375rem 0",
                            border: "1px solid #545151",
                            borderRadius: "10px",
                            color: logoutStatus ? "white" : "black",
                            backgroundColor: logoutStatus
                              ? "#545151"
                              : "transparent",
                          }}
                        >
                          Sign Out
                        </button>
                      )}
                      buttonText='Sign Out'
                      onLogoutSuccess={() => {
                        onSignOutSuccess();
                      }}
                    ></GoogleLogout>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
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
        tagName={tagName}
        setTagName={setTagName}
        // tags={tags}
        // setTags={setTags}
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
