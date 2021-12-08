import React from "react";
import Input from "@mui/material/Input";
import { MdSearch } from "react-icons/md";
import FormControl from "@mui/material/FormControl";

function SearchBar({ handleSearchNote, tagStatus }) {
  return (
    <div className='small'>
      <FormControl
        variant='standard'
        sx={{
          width: 300,
        }}
      >
        <Input
          id='input-with-icon-adornment'
          placeholder={tagStatus ? "Search Tags" : "Search"}
          startAdornment={
            <MdSearch position='start' className='me-1' size='1.5rem' />
          }
          onChange={(event) =>
            handleSearchNote(event.target.value.toLowerCase())
          }
        />
      </FormControl>
    </div>
  );
}

export default SearchBar;
