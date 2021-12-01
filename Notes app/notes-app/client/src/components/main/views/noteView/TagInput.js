import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import TagOption from "./TagOption";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

function TagInput({ tags, setTags }) {
  const [tagStatus, setTagStatus] = useState(false);
  //   const [tags, setTags] = useState([]);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  // const tag = [...tags, tags];
  const handleTag = (e) => {
    let obj = { id: Date.now(), name: e.target.value };
    // let tmp = [];
    // tmp.push(obj);
    // console.log(tmp);
    // setTags(tmp);
    // console.log(typeof obj);
    // console.log(tags);
    // let arr = tags.push({ id: 2, name: "name" });
    // console.log(arr);
    // setTags([...tags, JSON.stringify(obj)]);
    setTags([...tags, obj]);
    // setTags(obj);
    // console.log(tags);
    // handleAddTag(tagName);
    setTagStatus(false);
  };
  console.log(tags);
  //   let arr;

  //   useEffect(() => {
  //     if (tags.length > 0) {
  //       const words = tags[0].split(",");
  //       console.log(words);
  //       const sp = words[0].split(":");
  //       console.log(sp);
  //       console.log(sp[1]);
  //     }
  //     //   handleAddTag(tagName);
  //   }, [tags]);
  //   useEffect(() => {
  //     handleAddTag(tags);
  //   }, [handleTag]);
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
                {/* {arr.push(JSON.parse(tag))} */}
                <Chip
                  className='me-2'
                  size='medium'
                  label={tag.name}
                  onDelete={() => console.log(index)}
                  deleteIcon={
                    <TagOption removeTags={() => removeTags(index)} />
                  }
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
          // onKeyPress={(e) => console.log(e.target.value)}
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
          // variant={String}
        />
      )}
    </div>
  );
}

export default TagInput;
