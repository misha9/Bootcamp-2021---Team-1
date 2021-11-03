import React from 'react'
import Input from '@mui/material/Input';
import { MdSearch } from "react-icons/md";
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';


function SearchBar({handleSearchNote}) {
    return (
        <div>
            <FormControl 
                variant="standard" 
                sx={{
                        width: 300
                    }}>
                <Input
                    id="input-with-icon-adornment"
                    placeholder="Search Notes"
                    startAdornment={
                        <MdSearch 
                            position="start" 
                            className='me-1' 
                            size='1.5rem'
                        />
                    }
                    onChange={(event)=> handleSearchNote(event.target.value)}
                />
            </FormControl>
            
            {/* <div className="input-group rounded">
                <span className="input-group-text border-0 p-0 bg-transparent" id="search-addon">
                    <MdSearch className="opacity-50" size='1.3rem'/>
                </span>
                <input 
                    type="search" 
                    onChange={(event)=> handleSearchNote(event.target.value)} 
                    className="form-control rounded bg-transparent border-0" 
                    placeholder="Search" 
                    aria-label="Search"
                    aria-describedby="search-addon" />
            </div>
            <hr className="mt-0"/> */}
        </div>
    )
}

export default SearchBar
