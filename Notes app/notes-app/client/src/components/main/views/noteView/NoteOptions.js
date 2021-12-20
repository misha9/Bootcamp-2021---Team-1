import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const ITEM_HEIGHT = 48;

const options = [
	{ icon: <DeleteOutlinedIcon />, option: 'Delete note' },
	{ icon: <LockOutlinedIcon />, option: 'Lock page' },
];

function NoteOptions({ id, handleDeleteNote }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	function handleToolbar(option, id) {
		if (option === 'Delete note') {
			handleDeleteNote(id);
			handleClose();
		}
	}

	return (
		<div>
			<IconButton
				size='small'
				color='inherit'
				aria-label='more'
				id='long-button'
				aria-controls='long-menu'
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup='true'
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id='long-menu'
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
					},
				}}
			>
				{options.map((option) => (
					<MenuItem
						key={option.option}
						selected={option.option === 'Pyxis'}
						// onClick={handleClose}
						onClick={() => handleToolbar(option.option, id)}
					>
						<div className='me-2'>{option.icon}</div>
						{option.option}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}

export default NoteOptions;
