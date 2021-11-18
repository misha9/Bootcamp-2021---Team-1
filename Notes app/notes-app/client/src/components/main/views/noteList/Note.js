import React from "react";
import "../../../../styles/Note.css";

import { MdDeleteForever } from "react-icons/md";
import ReactHtmlParser from "react-html-parser";

function Note({ id, title, text, date, handleDeleteNote, selected, onSelect }) {
  return (
    <div
      className='note mb-2'
      onMouseEnter={() => {
        onSelect(id);
      }}
    >
      <div
        className='card'
        style={{
          backgroundColor: selected ? "#ffab45" : "#FBFBFB",
          color: selected ? "#ffffff" : "#000000",
        }}
      >
        <div className='card-body pb-2'>
          <h5 className='mb-3'>{title}</h5>
          <p className='card-text text-start small'>{ReactHtmlParser(text)}</p>
        </div>
        <div className='footer d-flex justify-content-between ps-3 pe-3'>
          <p className='small'>{date}</p>
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className='delete-icon'
            size='1.3rem'
          />
        </div>
      </div>
    </div>
  );
}

export default Note;
