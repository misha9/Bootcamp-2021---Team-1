import React, { useState, useEffect } from "react";
import { APIService } from "../../../../services/apiService";
import ReactHtmlParser from "react-html-parser";

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
}) {
  // const [fullText, setFullText] = useState("");
  // const [fullTextStatus, setFullTextStatus] = useState(false);

  const bookmarkChangeHandler = () => {
    // console.log(bookmarkStatus);
    setBookmarkStatus(!bookmarkStatus);
    // console.log(bookmarkStatus);
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
  }, [bookmarkStatus]);

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
      <p className='mt-5 ps-5' style={{ maxWidth: "605px" }}>
        {ReactHtmlParser(fullText)}
      </p>
    </div>
  ) : (
    ""
  );
}

export default RightContent;
