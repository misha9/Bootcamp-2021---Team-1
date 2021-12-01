import React from "react";
import "../../../../styles/Note.css";

import { MdDeleteForever } from "react-icons/md";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

function Note({
  notes,
  id,
  title,
  text,
  date,
  handleDeleteNote,
  selected,
  onSelect,
  tagNames,
}) {
  // let newDate = moment(date).local().format("DD/MM/YYYY HH:mm:ss");
  console.log(tagNames);

  return (
    <div
      className='note mb-3'
      onMouseEnter={() => {
        onSelect(id);
      }}
    >
      <div
        className='card'
        style={{
          backgroundColor: selected ? "#ffab45" : "#FBFBFB",
          // color: selected ? "#ffffff" : "#000000",
        }}
      >
        <div className='card-body pb-2'>
          <h5
            className='mb-3'
            style={{ color: selected ? "#ffffff" : "#161308" }}
          >
            {title}
          </h5>
          <div
            className='card-text text-start'
            style={{
              height: "60px",
              fontSize: "0.875rem",
              color: selected ? "#ffffff" : "#BEBEBE",
            }}
          >
            {ReactHtmlParser(text)}
          </div>
        </div>
        <div className='footer d-flex justify-content-between ps-3 pe-3'>
          {/* <p className='small'>{newDate.substring(0, 11)}</p> */}
          <p
            style={{
              color: selected ? "#ffffff" : "#BEBEBE",
              fontSize: "0.75rem",
              fontWeight: "500",
            }}
          >
            {moment.utc(date).local().startOf("seconds").fromNow().slice(0, -3)}
          </p>
          {/* <p
            style={{
              color: selected ? "#ffffff" : "#BEBEBE",
              fontSize: "0.75rem",
              fontWeight: "500",
            }}
          >
            {tagNames.map((tag) => (
              <span>{tag.tagName}</span>
            ))}
          </p> */}
          {/* <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className='delete-icon'
            size='1.3rem'
            style={{ color: selected ? "#ffffff" : "#BEBEBE" }}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Note;
