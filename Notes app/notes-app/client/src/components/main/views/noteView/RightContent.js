import React, { useState, useEffect } from "react";
import { APIService } from "../../../../services/apiService";
import ReactHtmlParser from "react-html-parser";
import { Scrollbars } from "react-custom-scrollbars";

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
  starStatus,
  setContentTitle,
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
      setFullTextStatus(true);
    }
  }, [id]);

  useEffect(() => {
    APIService.addBookmark(id, bookmarkStatus);
    if (starStatus === true) {
      setTimeout(() => {
        getAllBookmark();
        setFullText("");
        setContentTitle("");
      }, 250);
    }
  }, [bookmarkStatus]);

  console.log(fullTextStatus, fullText, contentTitle);

  return fullTextStatus ? (
    <div className='right-content'>
      <div className='text-end'>
        <i
          className={`icon me-2 ${
            bookmarkStatus != true ? " far fa-star" : " fas fa-star"
          }`}
          onClick={bookmarkChangeHandler}
        ></i>
      </div>
      <Scrollbars style={{ minHeight: "78vh" }}>
        <div className='mt-2 ps-5'>
          <h2>{contentTitle}</h2>
          <p className='mt-3 pe-3' style={{ maxWidth: "605px" }}>
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
