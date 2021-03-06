import React from 'react';
import ReactQuill from 'react-quill';
import '../../../../styles/quill.snow.css';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import TextField from '@mui/material/TextField';
import { Scrollbars } from 'react-custom-scrollbars';
import EditTags from './EditTags';
import IconButton from '@mui/material/IconButton';
import { CgMaximize } from 'react-icons/cg';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditNote({
	handleEditNote,
	notebookID,
	setSaveStatus,
	noteText,
	setNoteText,
	editStatus,
	fullText,
	setNoteTitle,
	noteTitle,
	setEditStatus,
	id,
	contentTitle,
	setFullTextStatus,
	setContentTitle,
	setFullText,
	fullScreenStatus,
	lastSaved,
	tags,
	setTags,
	tagNames,
	setTagNames,
	allTags,
	setFullScreenStatus,
	handleAddNoteStatus,
}) {
	const handleSaveClick = () => {
		setEditStatus(false);
		// console.log(noteTitle.trim().length);
		// console.log(fullText.trim().length);
		// handleEditNote(id, noteTitle, noteText, notebookID);
		if (fullText.trim().length > 0 || contentTitle.trim().length > 0) {
			handleEditNote(id, contentTitle, fullText, notebookID, tagNames);
		}
		// else if (noteTitle.trim().length > 0) {
		//   handleEditNote(id, noteTitle, noteText, notebookID);
		// }
		console.log(noteText);
		setSaveStatus(true);
		setFullTextStatus(true);
	};

	//console.log(id, fullText, contentTitle);
	//console.log(id, noteTitle, fullText, notebookID);

	return editStatus ? (
		<div
			className='new m-auto ps-3 mt-1'
			style={fullScreenStatus ? { width: '100%' } : { maxWidth: '640px' }}
		>
			<div className='d-flex align-items-center justify-content-between mb-4 mt-4'>
				<div
					className='bg-light p-2  text-center'
					style={{
						maxWidth: '182px',
						fontSize: '12px',
						borderRadius: '50px',
						color: '#9B9B9B',
					}}
				>
					Last saved {lastSaved}
				</div>
				{fullScreenStatus ? (
					''
				) : (
					<IconButton
						size='small'
						className=''
						color='inherit'
						onClick={() => setFullScreenStatus(true)}
					>
						<CgMaximize size='1.2rem' className='m-1 p-0' />
					</IconButton>
				)}
			</div>
			<EditorToolbar toolbarId={'t1'} />

			<div className='form-group mb-3 mt-3'>
				<TextField
					id='standard-textarea'
					placeholder='Enter a title for the note'
					multiline
					variant='standard'
					fullWidth
					defaultValue={contentTitle}
					onChange={(e) => {
						setNoteTitle(e.target.value);
						setContentTitle(e.target.value);
					}}
				/>
			</div>
			<Scrollbars style={{ minHeight: '45vh' }}>
				<ReactQuill
					placeholder={'Type content here...'}
					onChange={(e) => {
						setNoteText(e);
						setFullText(e);
					}}
					modules={modules('t1')}
					formats={formats}
					style={{ border: 'none' }}
					defaultValue={fullText}
				/>
			</Scrollbars>
			<EditTags
				tags={tags}
				setTags={setTags}
				editStatus={editStatus}
				tagNames={tagNames}
				setTagNames={setTagNames}
				allTags={allTags}
			/>
			<div className='text-end'>
				<button
					className='save btn btn-dark mt-3'
					onClick={handleSaveClick}
				>
					Save
				</button>
			</div>
		</div>
	) : (
		''
	);
}

export default EditNote;
