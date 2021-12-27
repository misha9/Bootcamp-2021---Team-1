import React, { useState, useEffect } from 'react';
import { APIService } from '../../../../services/apiService';
import ReactHtmlParser from 'react-html-parser';
import { Scrollbars } from 'react-custom-scrollbars';
import { MdEditNote } from 'react-icons/md';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { CgMaximize } from 'react-icons/cg';
import NoteOptions from './NoteOptions';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

import '../../../../styles/RightContent.css';

function RightContent({
	id,
	addNoteStatus,
	handleDeleteStatus,
	notebookID,
	nbSelect,
	deleteStatus,
	getAllBookmark,
	setBookmarkStatus,
	bookmarkStatus,
	fullText,
	setFullText,
	fullTextStatus,
	setFullTextStatus,
	getFullContent,
	contentTitle,
	// starStatus,
	starredStatus,
	setContentTitle,
	fullScreenStatus,
	getTagName,
	tagNames,
	setTagNames,
	workspaceID,
	setEditStatus,
	handleDeleteNote,
	setFullScreenStatus,
}) {
	const bookmarkChangeHandler = () => {
		setBookmarkStatus(!bookmarkStatus);
	};

	useEffect(() => {
		if (addNoteStatus === true) {
			setFullText('');
			setFullTextStatus(false);
		}
	}, [addNoteStatus, id]);

	useEffect(() => {
		if (handleDeleteStatus === true) {
			setFullText('');
		}
	}, [handleDeleteStatus]);

	useEffect(() => {
		setFullText('');
		setFullTextStatus(false);
	}, [notebookID]);

	useEffect(() => {
		if (nbSelect === false) {
			setFullText('');
			setFullTextStatus(false);
		}
	}, [nbSelect]);

	useEffect(() => {
		if (deleteStatus === true) {
			setFullText('');
		}
	}, [nbSelect]);

	useEffect(() => {
		if (id) {
			getFullContent(id);
			getTagName(id);
			setFullTextStatus(true);
		}
	}, [id]);

	useEffect(() => {
		if (addNoteStatus === true) {
			setFullTextStatus(false);
		}
	}, []);

	useEffect(() => {
		APIService.addBookmark(id, bookmarkStatus);
		if (starredStatus === true) {
			setTimeout(() => {
				setFullTextStatus(false);
				getAllBookmark(workspaceID);
				// setFullText("");
				// setContentTitle("");
			}, 100);
		}
	}, [bookmarkStatus]);

	//console.log(fullTextStatus, fullText, contentTitle);

	return fullTextStatus ? (
		<div className='right-content'>
			<div className='d-flex justify-content-end'>
				<div className='d-flex align-items-center'>
					{/* <IconButton className='p-0' color='inherit'>
            <MdEditNote
              className='m-1'
              // color='inherit'
              style={{ cursor: "pointer" }}
              size='1.8rem'
              onClick={() => {
                setFullTextStatus(false);
                setEditStatus(true);
              }}
            />
          </IconButton> */}
					<IconButton className='p-2' color='inherit' size='1.2rem'>
						{bookmarkStatus != true ? (
							<StarOutlineIcon
								style={{ cursor: 'pointer' }}
								onClick={bookmarkChangeHandler}
							/>
						) : (
							<StarIcon
								style={{ cursor: 'pointer' }}
								onClick={bookmarkChangeHandler}
							/>
						)}
					</IconButton>
					{fullScreenStatus ? (
						''
					) : (
						<IconButton
							size='small'
							color='inherit'
							onClick={() => setFullScreenStatus(true)}
						>
							<CgMaximize size='1.2rem' className='m-1' />
						</IconButton>
					)}
					<NoteOptions id={id} handleDeleteNote={handleDeleteNote} />
				</div>
			</div>
			<h2
				className={fullScreenStatus ? 'ps-1' : 'ps-5'}
				style={{
					color: '#161308',
					fontWeight: '600',
				}}
				onClick={() => {
					setFullTextStatus(false);
					setEditStatus(true);
				}}
			>
				{contentTitle}
			</h2>
			<div
				className={fullScreenStatus ? 'ps-2' : 'ps-5'}
				style={{
					color: '#FFAB45',
					fontSize: '0.75rem',
					fontWeight: '500',
				}}
			>
				{tagNames.map((tag) => (
					<span className='me-2'>#{tag.tagName}</span>
				))}
			</div>
			<Scrollbars style={{ minHeight: '65vh' }}>
				<div className={fullScreenStatus ? 'ps-2' : 'mt-2 ps-5'}>
					<p
						className='mt-3 pe-3 small full-content'
						style={
							fullScreenStatus
								? { width: 'auto', color: '#B5B5B5' }
								: { maxWidth: '605px', color: '#B5B5B5' }
						}
						onClick={() => {
							setFullTextStatus(false);
							setEditStatus(true);
						}}
					>
						{ReactHtmlParser(fullText)}
					</p>
				</div>
			</Scrollbars>
		</div>
	) : (
		''
	);
}

export default RightContent;
