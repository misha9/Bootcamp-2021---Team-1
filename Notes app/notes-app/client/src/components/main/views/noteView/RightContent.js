import React, { useState, useEffect } from "react";
import { APIService } from "../../../../services/apiService";
import ReactHtmlParser from "react-html-parser";
import { Scrollbars } from "react-custom-scrollbars";
import { MdEditNote } from "react-icons/md";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function RightContent({
  id,
  addNoteStatus,
  handleDeleteStatus,
  notebookID,
  nbSelect,
  deleteStatus,
  getAllBookmark,
  setBookmarkStatus,
  bookmarkStatus,
  fullText,
  setFullText,
  fullTextStatus,
  setFullTextStatus,
  getFullContent,
  contentTitle,
  // starStatus,
  starredStatus,
  setContentTitle,
  fullScreenStatus,
  getTagName,
  tagNames,
  setTagNames,
  workspaceID,
  setEditStatus,
  handleDeleteNote,
}) {
  const bookmarkChangeHandler = () => {
    setBookmarkStatus(!bookmarkStatus);
  };

  useEffect(() => {
    if (addNoteStatus === true) {
      setFullText("");
      setFullTextStatus(false);
    }
  }, [addNoteStatus, id]);

  useEffect(() => {
    if (handleDeleteStatus === true) {
      setFullText("");
    }
  }, [handleDeleteStatus]);

  useEffect(() => {
    setFullText("");
    setFullTextStatus(false);
  }, [notebookID]);

  useEffect(() => {
    if (nbSelect === false) {
      setFullText("");
      setFullTextStatus(false);
    }
  }, [nbSelect]);

  useEffect(() => {
    if (deleteStatus === true) {
      setFullText("");
    }
  }, [nbSelect]);

  useEffect(() => {
    if (id) {
      getFullContent(id);
      getTagName(id);
      setFullTextStatus(true);
    }
  }, [id]);

  useEffect(() => {
    if (addNoteStatus === true) {
      setFullTextStatus(false);
    }
  }, []);

  useEffect(() => {
    APIService.addBookmark(id, bookmarkStatus);
    if (starredStatus === true) {
      setTimeout(() => {
        setFullTextStatus(false);
        getAllBookmark(workspaceID);
        // setFullText("");
        // setContentTitle("");
      }, 100);
    }
  }, [bookmarkStatus]);

  console.log(fullTextStatus, fullText, contentTitle);

  return fullTextStatus ? (
    <div className='right-content'>
      <div className='d-flex justify-content-end'>
        <div className='d-flex align-items-center'>
          <DeleteOutlinedIcon
            className='m-2'
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDeleteNote(id);
            }}
          />
          <MdEditNote
            className='m-2'
            style={{ cursor: "pointer" }}
            size='1.8rem'
            onClick={() => {
              setFullTextStatus(false);
              setEditStatus(true);
            }}
          />
          <i
            className={`icon m-2 ${
              bookmarkStatus != true ? " far fa-star" : " fas fa-star"
            }`}
            style={{ cursor: "pointer" }}
            onClick={bookmarkChangeHandler}
          ></i>
        </div>
      </div>
      <h2
        className={fullScreenStatus ? "ps-1" : "ps-5"}
        style={{
          color: "#161308",
          fontWeight: "600",
        }}
      >
        {contentTitle}
      </h2>
      <div
        className={fullScreenStatus ? "ps-2" : "ps-5"}
        style={{ color: "#FFAB45", fontSize: "0.75rem", fontWeight: "500" }}
      >
        {tagNames.map((tag) => (
          <span className='me-2'>#{tag.tagName}</span>
        ))}
      </div>
      <Scrollbars style={{ minHeight: "60vh" }}>
        <div className={fullScreenStatus ? "ps-2" : "mt-2 ps-5"}>
          <p
            className='mt-3 pe-3 small'
            style={
              fullScreenStatus
                ? { width: "auto", color: "#B5B5B5" }
                : { maxWidth: "605px", color: "#B5B5B5" }
            }
          >
            {ReactHtmlParser(fullText)}
          </p>
        </div>
      </Scrollbars>
    </div>
  ) : (
    ""
  );
}

export default RightContent;
