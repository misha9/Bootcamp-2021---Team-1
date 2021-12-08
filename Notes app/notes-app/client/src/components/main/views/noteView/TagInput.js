import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import TagOption from "./TagOption";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

function TagInput({ tags, setTags, allTags, setAllTags }) {
  const [tagStatus, setTagStatus] = useState(false);
  const [tagName, setTagName] = useState("");
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const useStyles = makeStyles({
    customTextField: {
      "& input::placeholder": {
        fontSize: "14px",
      },
      "& input": {
        fontSize: "14px",
      },
      "& input::label": {
        fontSize: "14px",
      },
    },
  });
  const classes = useStyles();

  const handleTag = (e) => {
    let obj = { id: Date.now(), name: e.target.value };
    setTags([...tags, obj]);
    setTagStatus(false);
  };

  // const options = [
  //   { id: 0, name: "Idea" },
  //   { id: 1, name: "Project" },
  // ];
  console.log(tags);
  return (
    <div className='tag-area d-flex align-items-center mt-3'>
      <div className='d-flex align-items-center'>
        <LocalOfferOutlinedIcon
          className='me-2'
          fontSize='medium'
          sx={{ fontWeight: "500" }}
        />
        {tags.length > 0
          ? tags.map((tag, index) => (
              <div>
                <Chip
                  className='me-2'
                  size='medium'
                  label={tag.name}
                  onDelete={() => removeTags(index)}
                  // variant='outlined'
                  // deleteIcon={
                  //   <TagOption removeTags={() => removeTags(index)} />
                  // }
                  sx={{ borderRadius: "5px" }}
                />
              </div>
            ))
          : ""}
      </div>

      {tagStatus ? (
        <Autocomplete
          // id="tags-standard"
          // id="clear-on-escape"
          clearOnEscape
          options={allTags}
          getOptionLabel={(option) => option.name}
          // defaultValue={[options]}
          renderInput={(params) => (
            <TextField
              classes={{ root: classes.customTextField }}
              {...params}
              className='form-control form-control-sm'
              variant='standard'
              placeholder='Type to add...'
              style={{ width: "125px" }}
              // inputProps={{ style: { fontSize: "14px" } }}
              onKeyUp={(e) => (e.key === "Enter" ? handleTag(e) : null)}
            />
          )}
        />
      ) : (
        // <input
        //   className='form-control form-control-sm'
        //   type='text'
        //   placeholder='Type to add...'
        //   style={{ maxWidth: "124px" }}
        //   onKeyUp={(e) => (e.key === "Enter" ? handleTag(e) : null)}
        // />
        <Chip
          label='Add Tags'
          sx={{
            fontWeight: "500",
            background: "transparent",
            borderRadius: "5px",
          }}
          onClick={() => setTagStatus(true)}
        />
      )}
    </div>
  );
}

export default TagInput;
