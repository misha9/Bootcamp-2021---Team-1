import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import '../../../styles/RenameWorkspace.css';
import Icon from '@mui/material/Icon';
import { Scrollbars } from 'react-custom-scrollbars';

import SearchIcon from './SearchIcon';

function RenameWorkspace({
	wsRenameStatus,
	setWsRenameStatus,
	handleRenameWorkspace,
	wsName,
	workspaceID,
	icons,
	setIcons,
	wsIcon,
	setWsIcon,
	handleSearchIcon,
	getAllIcons,
	setWsName,
}) {
	// const [renameWs, setRenameWs] = useState("");
	const handleRename = () => {
		//console.log("Rename workspace");
		handleRenameWorkspace(wsName, workspaceID, wsIcon);
		setWsRenameStatus(false);
	};
	return wsRenameStatus ? (
		<div
			className='rename-ws position-fixed'
			style={{
				width: '100%',
				height: '100vh',
				zIndex: '999',
				backgroundColor: 'rgba(0, 0, 0, 0.3)',
				right: '0px',
			}}
		>
			<div className='rename-workspace d-flex justify-content-center mt-5'>
				<div
					class='card position-related'
					style={{ minWidth: '444px' }}
				>
					<img
						src='./close-icon.svg'
						className='position-absolute close-icon'
						alt='close-icon'
						width='24px'
						style={{ top: '1.375rem', right: '1.5rem' }}
						onClick={() => setWsRenameStatus(false)}
					/>
					<div className='card-body' style={{ padding: '1.375rem' }}>
						<h5
							className='card-title mb-3'
							style={{ fontSize: '1.25rem', fontWeight: '600' }}
						>
							Rename Workspace title
						</h5>
						<div className='d-flex'>
							<div className='btn-group'>
								<button
									type='button'
									className='btn shadow-none mt-3 ps-0'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									<Icon onClick={getAllIcons}>{wsIcon}</Icon>
								</button>
								<ul
									className='dropdown-menu p-0 mt-1'
									style={{ minWidth: '250px' }}
								>
									<li className='p-2'>
										<SearchIcon
											handleSearchIcon={handleSearchIcon}
											icons={icons}
											setIcons={setIcons}
										/>
									</li>
									<Scrollbars style={{ height: '50vh' }}>
										<li className='p-2 d-flex flex-wrap'>
											{icons.map((icon) => (
												<div
													className='m-3'
													style={{
														cursor: 'pointer',
													}}
													onClick={() => {
														setWsIcon(icon);
														setIcons([]);
													}}
												>
													<Icon>{icon}</Icon>
												</div>
											))}
										</li>
									</Scrollbars>
								</ul>
							</div>
							<TextField
								required
								id='standard-basic'
								label='Enter workspace title here'
								variant='standard'
								// placeholder=""
								defaultValue={wsName}
								fullWidth
								onChange={(event) => {
									setWsName(event.target.value);
								}}
							/>
						</div>
					</div>
					<div className='d-flex justify-content-end me-3 mb-4'>
						<button
							type='button'
							className='btn btn-primary border-0'
							onClick={() => handleRename()}
						>
							Rename
						</button>
					</div>
				</div>
			</div>
		</div>
	) : (
		''
	);
}

export default RenameWorkspace;
