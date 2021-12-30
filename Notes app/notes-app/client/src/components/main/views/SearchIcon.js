import React, { useEffect } from 'react';
import Input from '@mui/material/Input';
import { MdSearch } from 'react-icons/md';
import FormControl from '@mui/material/FormControl';

function SearchIcon({ handleSearchIcon }) {
	return (
		<div className='small'>
			<FormControl
				variant='standard'
				sx={{
					width: 'auto',
				}}
			>
				<Input
					id='input-with-icon-adornment'
					placeholder='Search icons'
					autoComplete='off'
					startAdornment={
						<MdSearch
							position='start'
							className='me-1'
							size='1.5rem'
						/>
					}
					onChange={(event) => {
						handleSearchIcon(event.target.value);
					}}
				/>
			</FormControl>
		</div>
	);
}

export default SearchIcon;
