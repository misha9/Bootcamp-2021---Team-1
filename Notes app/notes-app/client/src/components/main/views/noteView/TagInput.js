import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import TagOption from "./TagOption";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

function TagInput({ tags, setTags }) {
  const [tagStatus, setTagStatus] = useState(false);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const handleTag = (e) => {
    let obj = { id: Date.now(), name: e.target.value };
    setTags([...tags, obj]);
    setTagStatus(false);
  };
  console.log(tags);
  return (
    <div className='tag-area d-flex align-items-center'>
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
        <input
          className='form-control form-control-sm'
          type='text'
          placeholder='Type to add...'
          style={{ maxWidth: "124px" }}
          onKeyUp={(e) => (e.key === "Enter" ? handleTag(e) : null)}
        />
      ) : (
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