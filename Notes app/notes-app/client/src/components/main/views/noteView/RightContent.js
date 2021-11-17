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

  const [fullTextStatus,setfullTextStatus]=useState(false);
  //bookmark status
  const [bookMarkStatus,setBookmarkStatus]=useState();

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

  const bookmarkChangeHandler = () => {
    console.log(bookMarkStatus);
    setBookmarkStatus(!bookMarkStatus);
    console.log(bookMarkStatus);
    
    }
    
    useEffect(() => {
       addBookmark();
    }, [bookMarkStatus])

    const addBookmark = () => {
      // console.log(bookMarkStatus);
      // setBookmarkStatus(!bookMarkStatus);
      // console.log(bookMarkStatus);
      const markBookmark = {
      id: id,
      flag: bookMarkStatus
      
      }

      const requestOptions = {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          },
          body: JSON.stringify({id:markBookmark.id, flag:markBookmark.flag})
      };
      fetch("http://localhost:5000/api/add-bookmark", requestOptions); 
  }


  function getFullContent() {
    getFullText(id).then((res) => {
      // console.log("tracking")
      setFullText(res[0].note_content);
      setBookmarkStatus(res[0].bookmark);

      // console.log(res[0].note_content);
    });
  }

  useEffect(() => {
    if (addNoteStatus === true) {
      setFullText("");
      setfullTextStatus(false);
    }
  }, [addNoteStatus, id]);

  useEffect(() => {
    if (handleDeleteStatus === true) {
      setFullText("");
    }
  }, [handleDeleteStatus]);

  useEffect(() => {
    setFullText("");
    setfullTextStatus(false);
  }, [notebookID]);

  useEffect(() => {
    if (nbSelect === false) {
      setFullText("");
      setfullTextStatus(false);

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
      setfullTextStatus(true)

    }
  }, [id]);

  return (
    <div className='right-content position-fixed'>
      {(fullTextStatus)? (
                    <div className='text-end mx-5 px-5'>
                         <i className={`icon ${ bookMarkStatus != true ? ' far fa-star' : ' fas fa-star'}`} onClick={bookmarkChangeHandler}></i>
                    </div>
                ):''}
      <p className='mt-5 ps-5' style={{ maxWidth: "605px" }}>
        {ReactHtmlParser(fullText)}
      </p>
    </div>
  );
}

export default RightContent;
