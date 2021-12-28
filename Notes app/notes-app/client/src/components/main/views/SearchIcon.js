import React from 'react';
import Input from '@mui/material/Input';
import { MdSearch } from 'react-icons/md';
import FormControl from '@mui/material/FormControl';

function SearchIcon({ handleSearchIcon, icons, setIcons }) {
	const handleIconSearch = (iconName) => {
		setIcons([
			...icons.filter((icon) => icon.toLowerCase().includes(iconName)),
		]);
	};
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
					startAdornment={
						<MdSearch
							position='start'
							className='me-1'
							size='1.5rem'
						/>
					}
					onChange={(event) => {
						handleIconSearch(event.target.value);
					}}
				/>
			</FormControl>
		</div>
	);
}

export default SearchIcon;
