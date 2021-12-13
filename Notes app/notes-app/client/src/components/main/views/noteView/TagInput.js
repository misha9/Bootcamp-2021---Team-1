import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

function TagInput({ tags, setTags, allTags, setAllTags }) {
  const [tagStatus, setTagStatus] = useState(false);
  const [tagExist, setTagExist] = useState("");
  const [tagExistStatus, setTagExistStatus] = useState(false);
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
    const found = tags.some((el) => el.name === e.target.value);
    // console.log(e.target.value.trim().length);
    if (!found && e.target.value.trim().length > 0) {
      setTags([...tags, obj]);
      setTagStatus(false);
    } else if (e.target.value.trim().length === 0) {
      setTagExist("");
    } else {
      setTagExistStatus(true);
      setTagExist("Tag already exists");
      setTagStatus(true);
    }
  };

  console.log(tags);
  return (
    <div className='tag-area d-flex align-items-center mt-3'>
      <div className='d-flex align-items-center mt-2 mb-3'>
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
                  sx={{ borderRadius: "5px" }}
                />
              </div>
            ))
          : ""}
      </div>

      {tagStatus ? (
        <div className='absolute'>
          <Autocomplete
            // id="tags-standard"
            // id="clear-on-escape"
            sx={{
              position: "relative",
              top: tagExistStatus ? "10px" : "-1px",
            }}
            // id="tags-standard"
            // id="clear-on-escape"
            disableClearable={true}
            options={allTags}
            getOptionLabel={(option) => option.name}
            // defaultValue={[options]}
            renderInput={(params) => (
              <TextField
                error={tagExistStatus}
                classes={{ root: classes.customTextField }}
                {...params}
                className='form-control form-control-sm'
                variant='standard'
                placeholder='Type to add...'
                style={{ width: "125px" }}
                // inputProps={{ style: { fontSize: "14px" } }}
                onKeyUp={(e) => (e.key === "Enter" ? handleTag(e) : null)}
                onChange={(e) => {
                  console.log(e.target.value.trim().length);
                  const found = tags.some((el) => el.name === e.target.value);

                  if (!found) {
                    setTagExist("");
                    setTagExistStatus(false);
                  } else if (e.target.value.trim().length === 0) {
                    setTagExist("");
                    setTagExistStatus(false);
                  } else if (found) {
                    setTagExistStatus(true);
                    setTagExist("Tag already exists");
                  }
                }}
                helperText={tagExist}
              />
            )}
          />
        </div>
      ) : (
        // <input
        //   className='form-control form-control-sm'
        //   type='text'
        //   placeholder='Type to add...'
        //   style={{ maxWidth: "124px" }}
        //   onKeyUp={(e) => (e.key === "Enter" ? handleTag(e) : null)}
        // />
        <div className='mt-2 mb-3'>
          <Chip
            label='Add Tags'
            sx={{
              fontWeight: "500",
              background: "transparent",
              borderRadius: "5px",
            }}
            onClick={() => setTagStatus(true)}
          />
        </div>
      )}
    </div>
  );
}

export default TagInput;
