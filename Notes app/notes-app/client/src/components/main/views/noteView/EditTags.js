import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import TagOption from "./TagOption";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

function EditTags({ tags, setTags, tagNames, setTagNames, allTags }) {
  const [tagStatus, setTagStatus] = useState(false);
  const [tagExist, setTagExist] = useState("");
  const [tagExistStatus, setTagExistStatus] = useState(false);

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
    // console.log(e.target.value);
    const found = tagNames.some((el) => el.tagName === e.target.value);
    if (!found && e.target.value.trim().length > 0) {
      setTagNames([...tagNames, obj]);
      setTagStatus(false);
      setTagExist("");
    } else if (e.target.value.trim().length === 0) {
      setTagExist("");
    } else {
      setTagExistStatus(true);
      setTagExist("Tag already exists");
      setTagStatus(true);
    }
  };

  return (
    <div className='tag-area d-flex'>
      <div className='d-flex align-items-center mt-2 mb-2'>
        <LocalOfferOutlinedIcon
          className='me-2'
          fontSize='medium'
          sx={{ fontWeight: "500" }}
        />
        {tagNames.length > 0
          ? tagNames.map((tag, index) => (
              <div>
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
        <div className='absolute'>
          <Autocomplete
            sx={{
              position: "relative",
              top: "10px",
            }}
            // id="tags-standard"
            // id="clear-on-escape"
            disableClearable={true}
            // clearOnEscape
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
                // onKeyUp={(e) => (e.key === "Escape" ? setTagExist("") : null)}
                onChange={(e) => {
                  const found = tagNames.some(
                    (el) => el.tagName === e.target.value
                  );
                  if (!found) {
                    setTagExist("");
                    setTagExistStatus(false);
                  } else {
                    setTagExistStatus(true);
                    setTagExist("Tag already exists");
                  }
                }}
                // onSelects={(e) => {
                //   const found = tagNames.some(
                //     (el) => el.tagName === e.target.value
                //   );
                //   if (!found) {
                //     setTagExist("");
                //   } else {
                //     setTagExist("Tag already exist");
                //   }
                // }}
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
        <Chip
          className='mt-2 mb-2'
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
