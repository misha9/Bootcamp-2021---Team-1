import React from 'react';

import '../../../styles/NotesList.css';

import Note from './noteList/Note';
import SearchBar from './noteList/SearchBar';
import { Scrollbars } from 'react-custom-scrollbars';
import { IoIosAdd } from 'react-icons/io';
import Tags from './noteList/Tags';

const NotesList = ({
	notes,
	handleDeleteNote,
	getNoteID,
	handleAddNoteStatus,
	nbName,
	nbSelect,
	handleSearchNote,
	featureStatus,
	selectedNoteId,
	setSelectedNoteId,
	setFullTextStatus,
	setLastSaved,
	tagNames,
	starredStatus,
	recentStatus,
	tagStatus,
	tagDetails,
	getTagNotes,
	setFeatureStatus,
	setNoteTitle,
	setNoteText,
}) => {
	//console.log(tagNames);

	// useEffect(() => {
	//   if (notes.length > 0) {
	//     setSelectedNoteId(notes[0].id);
	//     getNoteID(notes[0].id);
	//     // setSelectedNoteId(notes[0].id);
	//   }
	// }, [notes]);

	return (
		<div
			className='col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-3 m-auto'
			style={{ height: '100vh', maxWidth: '365px' }}
		>
			<SearchBar handleSearchNote={handleSearchNote} />
			{tagStatus ? (
				<Tags
					tagStatus={tagStatus}
					tagDetails={tagDetails}
					getTagNotes={getTagNotes}
					notes={notes}
					selectedNoteId={selectedNoteId}
					setSelectedNoteId={setSelectedNoteId}
					getNoteID={getNoteID}
					handleSearchNote={handleSearchNote}
					setFeatureStatus={setFeatureStatus}
					setLastSaved={setLastSaved}
				/>
			) : (
				''
			)}
			{featureStatus ? (
				<div>
					<h4
						className='notebook'
						style={{
							fontWeight: '600',
							textTransform: 'capitalize',
							color: '#161308',
							font: 'normal normal bold 32px/43px Roboto',
							marginTop: '3rem',
						}}
					>
						{starredStatus ? 'Starred' : 'Recent'}
					</h4>
					<Scrollbars
						style={{
							height: '75vh',
							width: '360px',
							marginTop: '1rem',
						}}
					>
						<div className='notes-list'>
							{notes.map((note, ind) => (
								<Note
									key={ind}
									id={note.id}
									title={note.title}
									text={note.text}
									date={note.date}
									handleDeleteNote={handleDeleteNote}
									selected={selectedNoteId === note.id}
									onSelect={(id) => {
										setSelectedNoteId(id);
										getNoteID(id);
									}}
									tags={note.tags}
									setLastSaved={setLastSaved}
								/>
							))}
						</div>
					</Scrollbars>
				</div>
			) : (
				''
			)}
			{nbSelect ? (
				<div className='noteList'>
					<div className='mb-2'>
						<div className='add-section mt-5'>
							<div className='d-flex justify-content-between align-items-center'>
								<h4
									className='notebook'
									style={{
										fontWeight: '600',
										textTransform: 'capitalize',
										color: '#161308',
										font: 'normal normal bold 32px/43px Roboto',
									}}
								>
									{nbName}
								</h4>
								<IoIosAdd
									className='mb-2 add-icon'
									onClick={() => {
										handleAddNoteStatus(true);
										setFullTextStatus(false);
										setNoteTitle('');
										setNoteText('');
									}}
									src='./add-icon.svg'
									alt='add-icon'
									size='1.5rem'
								/>
							</div>
						</div>
					</div>
					<Scrollbars style={{ height: '76.5vh', width: '360px' }}>
						<div className='notes-list'>
							{notes.map((note, ind) => (
								<Note
									key={ind}
									id={note.id}
									title={note.title}
									text={note.text}
									date={note.date}
									handleDeleteNote={handleDeleteNote}
									// getNoteID={getNoteID}
									selected={selectedNoteId === note.id}
									onSelect={(id) => {
										setSelectedNoteId(id);
										getNoteID(id);
									}}
									tags={note.tags}
									setLastSaved={setLastSaved}
								/>
							))}
						</div>
					</Scrollbars>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default NotesList;
