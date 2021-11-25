import React from "react";
import ReactDOM from "react";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import { APIService } from "../../../../services/apiService";

const TagsInput = ({ selectedTags, setTags, tags, tagName, setTagName }) => {
  //   const [tags, setTags] = useState(tags);
  //   const [tagName, setTagName] = useState("");
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const insertTag = (name) => {};
  const addTags = (event) => {
    // setTagName(event.target.value);
    // setTagName(event.target.value);
    // setTimeout(() => {
    //   console.log(tagName);
    // }, 500);

    if (event.target.value !== "") {
      insertTag();
      setTagName(event.target.value);
      setTags([...tags, event.target.value]);
      selectedTags([...tags, event.target.value]);
      event.target.value = "";
      //   console.log(tagName);
    }
  };
  console.log(tagName);

  return (
    <div className='tags-input'>
      {/* <ul id='tags'>
        {tags.map((tag, index) => (
          <Chip
            className='me-1'
            size='small'
            label={tag}
            onDelete={() => removeTags(index)}
          />
        ))}
      </ul> */}
      <Input
        className='mb-4'
        fullWidth
        type='text'
        size='small'
        variant='standard'
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder='Type to add tags'
        startAdornment={
          <span id='tags'>
            {tags.map((tag, index) => (
              <Chip
                className='me-1 mb-2'
                size='small'
                label={tag}
                onDelete={() => removeTags(index)}
              />
            ))}
          </span>
        }
      />
    </div>
  );
};

export default TagsInput;
