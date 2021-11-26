import React from "react";
import Input from "@mui/material/Input";
import { MdSearch } from "react-icons/md";
import FormControl from "@mui/material/FormControl";

function SearchBar({ handleSearchNote }) {
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
          placeholder='Search Notes'
          startAdornment={
            <MdSearch position='start' className='me-1' size='1.5rem' />
          }
          onChange={(event) => handleSearchNote(event.target.value)}
        />
      </FormControl>
    </div>
  );
}

export default SearchBar;
