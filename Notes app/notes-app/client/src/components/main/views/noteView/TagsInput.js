import React from "react";
import ReactDOM from "react";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";

const TagsInput = (props) => {
  const [tags, setTags] = React.useState(props.tags);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
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
