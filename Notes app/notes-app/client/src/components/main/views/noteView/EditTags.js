import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import TagOption from "./TagOption";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

function EditTags({ tags, setTags, tagNames, setTagNames, allTags }) {
  const [tagStatus, setTagStatus] = useState(false);

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

  const removeTags = (indexToRemove) => {
    setTagNames([...tagNames.filter((_, index) => index !== indexToRemove)]);
  };
  console.log(tagNames);
  const handleTag = (e) => {
    let obj = { tagName: e.target.value.replace(/ +/g, "") };
    console.log(e.target.value);
    setTagNames([...tagNames, obj]);
    setTagStatus(false);
  };
  //   console.log(tags);
  return (
    <div className='tag-area d-flex'>
      <div className='d-flex align-items-center'>
        <LocalOfferOutlinedIcon
          className='me-2'
          fontSize='medium'
          sx={{ fontWeight: "500" }}
        />
        {tagNames.length > 0
          ? tagNames.map((tag, index) => (
              <div>
                {/* {arr.push(JSON.parse(tag))} */}
                <Chip
                  className='me-2 mb-2'
                  size='medium'
                  label={tag.tagName}
                  onDelete={() => removeTags(index)}
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

export default EditTags;
