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
  fullScreenStatus,
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
    if (addNoteStatus === true) {
      setFullTextStatus(false);
    }
  }, []);

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
      <Scrollbars style={{ minHeight: "75vh" }}>
        <div className={fullScreenStatus ? "ps-2" : "mt-2 ps-5"}>
          <div className='d-flex justify-content-between'>
            <h2>{contentTitle}</h2>
            <div>
              <i
                className={`icon m-2 ${
                  bookmarkStatus != true ? " far fa-star" : " fas fa-star"
                }`}
                onClick={bookmarkChangeHandler}
              ></i>
            </div>
          </div>
          <p
            className='mt-3 pe-2'
            style={fullScreenStatus ? { width: "auto" } : { maxWidth: "605px" }}
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
