import React from "react";
import "../../../../styles/Note.css";

import ReactHtmlParser from "react-html-parser";
import moment from "moment";

function Note({
  id,
  title,
  text,
  date,
  selected,
  onSelect,
  tags,
  setLastSaved,
}) {
  // let newDate = moment(date).local().format("DD/MM/YYYY HH:mm:ss");
  let lastSave = moment.utc(date).local().startOf("seconds").fromNow();

  return (
    <div
      className='note mb-3'
      onMouseEnter={() => {
        onSelect(id);
        setLastSaved(lastSave);
      }}
    >
      <div
        className='card'
        style={{
          backgroundColor: selected ? "#ffab45" : "#FBFBFB",
        }}
      >
        <div className='card-body pb-2'>
          <h5
            className='mb-3'
            style={{
              color: selected ? "#ffffff" : "#161308",
            }}
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
          <p
            style={{
              color: selected ? "#ffffff" : "#FFAB45",
              fontSize: "0.75rem",
              fontWeight: "500",
              whiteSpace: "nowrap",
              maxWidth: "75px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tags.map((tag) => (
              <span className='me-2'>#{tag}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Note;
