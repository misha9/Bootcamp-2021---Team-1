import React from 'react';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import { Scrollbars } from 'react-custom-scrollbars';

import SearchIcon from './SearchIcon';

function CreateWorkspace({
	addWorkspaceStatus,
	setAddWorkspaceStatus,
	userID,
	addWorkspace,
	setOpenWsIcons,
	setWsIcon,
	wsIcon,
	getAllIcons,
	icons,
	setIcons,
	handleSearchIcon,
}) {
	const [workspaceName, setWorkspaceName] = useState('');
	return addWorkspaceStatus ? (
		<div
			className='position-fixed'
			style={{
				width: '100%',
				height: '100vh',
				zIndex: '999',
				backgroundColor: 'rgba(0, 0, 0, 0.3)',
				right: '0px',
			}}
		>
			<div className='notebook d-flex justify-content-center mt-5'>
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
						onClick={() => setAddWorkspaceStatus(false)}
					/>
					<div class='card-body' style={{ padding: '1.375rem' }}>
						<h5
							class='card-title mb-3'
							style={{ fontSize: '1.25rem', fontWeight: '600' }}
						>
							Create Workspace
						</h5>
						<div className='d-flex'>
							<div className='btn-group'>
								<button
									type='button'
									className='btn shadow-none mt-3 ps-0'
									data-bs-toggle='dropdown'
									aria-expanded='false'
									// onMouseEnter={() => setLogoutStatus(false)}
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
														// setTagString(icon.tagString);
														// console.log(wsIcon);
														// console.log(tagString);
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
								id='standard-basic'
								label='Enter workspace title here'
								variant='standard'
								fullWidth
								onChange={(event) =>
									setWorkspaceName(event.target.value)
								}
							/>
						</div>
					</div>
					<div className='d-flex justify-content-end me-3 mb-4'>
						<button
							type='button'
							className='btn btn-primary border-0'
							onClick={() => {
								addWorkspace(userID, workspaceName, wsIcon);
								setAddWorkspaceStatus(false);
								setOpenWsIcons(false);
							}}
						>
							Create
						</button>
					</div>
				</div>
			</div>
		</div>
	) : (
		''
	);
}

export default CreateWorkspace;
