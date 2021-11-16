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
}) {
  const [fullText, setFullText] = useState("");

  function getFullText() {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ note_id: id }),
    };
    return fetch(
      "http://localhost:5000/api/get-full-text",
      requestOptions
    ).then(APIService.handleResponse);
  }

  function getFullContent() {
    getFullText(id).then((res) => {
      // console.log("tracking")
      setFullText(res[0].note_content);
      // console.log(res[0].note_content);
    });
  }

  useEffect(() => {
    if (addNoteStatus === true) {
      setFullText("");
    }
  }, [addNoteStatus, id]);

  useEffect(() => {
    if (handleDeleteStatus === true) {
      setFullText("");
    }
  }, [handleDeleteStatus]);

  useEffect(() => {
    setFullText("");
  }, [notebookID]);

  useEffect(() => {
    if (nbSelect === false) {
      setFullText("");
    }
  }, [nbSelect]);

  useEffect(() => {
    if (deleteStatus === true) {
      setFullText("");
    }
  }, [nbSelect]);

  useEffect(() => {
    if (id) {
      getFullContent();
    }
  }, [id]);

  return (
    <div className='right-content position-fixed'>
      <p className='mt-5' style={{ maxWidth: "605px" }}>
        {ReactHtmlParser(fullText)}
      </p>
    </div>
  );
}

export default RightContent;
