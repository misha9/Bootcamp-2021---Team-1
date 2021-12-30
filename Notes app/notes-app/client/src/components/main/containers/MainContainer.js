import React from 'react';
import NotesMenu from '../views/NotesMenu';
import NotesList from '../views/NotesList';
import NoteView from '../views/NoteView';
import CreateWorkspace from '../views/CreateWorkspace';
import RenameWorkspace from '../views/RenameWorkspace';
import DeleteWorkspace from '../views/DeleteWorkspace';
import CreateNotebook from '../views/CreateNotebook';
import DeleteNotebook from '../views/DeleteNotebook';
import RenameNotebook from '../views/RenameNotebook';
import DeleteNote from '../views/noteView/DeleteNote';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { APIService } from '../../../services/apiService';
import { BiUser } from 'react-icons/bi';
import { MdOutlineHome, MdWorkOutline } from 'react-icons/md';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { useNavigate } from 'react-router-dom';

const MainContainer = ({ setAuth }) => {
	const [notes, setNotes] = useState([]);
	const [noteID, setNoteID] = useState();
	const [addNoteStatus, setAddNoteStatus] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [deleteStatus, setDeleteStatus] = useState(false);
	const [notebookStatus, setNotebookStatus] = useState(false);
	const [notebooks, setNotebooks] = useState([]);
	const [nbSelect, setNbSelect] = useState(false);
	const [workspaceID, setWorkspaceID] = useState('');
	const [saveStatus, setSaveStatus] = useState(false);
	const [createStatus, setCreateStatus] = useState(false);
	const [nbDeleteStatus, setNbDeleteStatus] = useState(false);
	const [nbRenameStatus, setNbRenameStatus] = useState(false);
	const [renameNb, setRenameNb] = useState('');
	const [nbName, setNbName] = useState('');
	const [nbID, setNbID] = useState('');
	const [featureStatus, setFeatureStatus] = useState(false);
	const [bookmarkStatus, setBookmarkStatus] = useState();
	const [fullText, setFullText] = useState('');
	const [fullTextStatus, setFullTextStatus] = useState(false);
	const [selectedNoteId, setSelectedNoteId] = useState(-1);
	const [noteText, setNoteText] = useState('');
	const [editStatus, setEditStatus] = useState(false);
	const [noteTitle, setNoteTitle] = useState();
	const [contentTitle, setContentTitle] = useState('');
	const [starStatus, setStarStatus] = useState(false);
	const [fullScreenStatus, setFullScreenStatus] = useState(false);
	const [workspace, setWorkspace] = useState([]);
	const [defaultWsID, setDefaultWsID] = useState('');
	const [lastSaved, setLastSaved] = useState('');
	const [tags, setTags] = useState([]);
	const [tagNames, setTagNames] = useState([]);
	const [starredStatus, setStarredStatus] = useState(false);
	const [recentStatus, setRecentStatus] = useState(false);
	const [tagStatus, setTagStatus] = useState(false);
	const [tagDetails, setTagDetails] = useState([]);
	const [addWorkspaceStatus, setAddWorkspaceStatus] = useState(false);
	const [wsRenameStatus, setWsRenameStatus] = useState(false);
	const [wsDeleteStatus, setWsDeleteStatus] = useState(false);
	const [wsName, setWsName] = useState('');
	const [allTags, setAllTags] = useState([]);
	const [openWsIcons, setOpenWsIcons] = useState(false);
	const [icons, setIcons] = useState([]);
	const [wsIcon, setWsIcon] = useState('work_outline');
	const [searchIcon, setSearchIcon] = useState('');
	const [deleteNoteStatus, setDeleteNoteStatus] = useState(false);

	const navigate = useNavigate();

	const formatDate = (timestamp) => {
		return moment(timestamp).local().format('YYYY-MM-DD HH:mm:ss');
	};

	const clientId =
		'866133952316-a8r10cdbhjlsjroke88n2qrm5ul0jgfj.apps.googleusercontent.com';

	const userID = localStorage.getItem('uID');
	const AT = localStorage.getItem('token');
	const dp = localStorage.getItem('profilePic');
	const userName = localStorage.getItem('userName');
	const mail = localStorage.getItem('userMail');

	const getAllWorkspace = (userID) => {
		const data = [];
		APIService.fetchWorkspace(userID).then((res) => {
			for (let i = 0; i < res.length; i++) {
				data.push({
					wsID: res[i].ws_id,
					wsName: res[i].name,
					icon: res[i].icon,
				});
			}
			setWorkspace(data);
		});
	};

	const addWorkspace = (uID, name, icon) => {
		APIService.addWorkspace(uID, name, icon).then(
			setTimeout(() => {
				getAllWorkspace(uID);
			}, 150)
		);
	};

	const renameWorkspace = (name, wsID, wsIcon) => {
		APIService.renameWorkspace(name, wsID, wsIcon).then(
			setTimeout(() => {
				getAllWorkspace(userID);
			}, 250)
		);
	};

	const deleteWorkspace = (wsID) => {
		APIService.deleteWorkspace(wsID).then(
			setTimeout(() => {
				getAllWorkspace(userID);
			}, 250)
		);
	};

	const getAllNotebooks = (wsID) => {
		const data = [];
		APIService.fetchNotebooks(wsID).then((res) => {
			for (let i = 0; i < res.length; i++) {
				data.push({ id: res[i].nb_id, name: res[i].name });
			}
			setNotebooks(data);
		});
	};

	const addNotebook = (name, wsID) => {
		APIService.addNewNotebook(name, wsID).then(
			setTimeout(() => {
				getAllNotebooks(wsID);
			}, 150)
		);
	};

	const deleteNotebook = (id) => {
		APIService.deleteNotebookFromDb(id);
		const newNotebooks = notebooks.filter((notebook) => notebook.id !== id);
		setNotebooks(newNotebooks);
	};

	const renameNotebook = (id, name, ws_id) => {
		setNbName(name);
		APIService.renameNotebookInDb(id, name).then(
			setTimeout(() => {
				getAllNotebooks(ws_id);
			}, 250)
		);
	};

	const getAllNotes = (id) => {
		const data = [];
		APIService.fetchNotes(id).then((res) => {
			for (let i = 0; i < res.length; i++) {
				let newDate = formatDate(res[i].updated_date);

				data.push({
					id: res[i].n_id,
					title: res[i].title,
					text: res[i].sub,
					date: newDate,
					tags: res[i].t_name,
				});
			}
			setNotes(data);
		});
	};

	const addNote = (title, text, nbID, wsID, tags) => {
		const date = new Date();
		const newNote = {
			title: title,
			text: text,
			date: moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),
			nbID: nbID,
			wsID: wsID,
			tags: tags,
		};
		APIService.addNewNote(newNote).then(
			setTimeout(() => {
				getAllNotes(nbID);
				setTags('');
				getAllTags();
			}, 150)
		);
	};

	const deleteNote = (id) => {
		const data = {
			id: id,
		};
		APIService.deleteNoteFromDb(data);
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
		setDeleteStatus(true);
		setFullTextStatus(false);
	};

	const editNote = (id, title, text, nbID, tags) => {
		const date = new Date();
		const newNote = {
			noteID: id,
			title: title,
			text: text,
			date: moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),
			tags: tags,
		};
		APIService.editNote(newNote).then(
			setTimeout(() => {
				getAllNotes(nbID);
				getAllTags();
			}, 150)
		);
	};

	function getFullContent(id) {
		APIService.getFullText(id).then((res) => {
			setFullText(res[0].note_content);
			setContentTitle(res[0].title);
			setBookmarkStatus(res[0].bookmark);
		});
	}

	function getAllBookmark(workspaceID) {
		const data = [];
		APIService.fetchBookmarkedNotes(workspaceID).then((res) => {
			for (let i = 0; i < res.length; i++) {
				let newDate = formatDate(res[i].updated_date);
				data.push({
					id: res[i].n_id,
					title: res[i].title,
					text: res[i].sub,
					date: newDate,
					tags: res[i].t_name,
				});
			}
			setNotes(data);
		});
	}

	function getAllRecentNotes(wsID) {
		const data = [];
		APIService.fetchRecentNotes(wsID).then((res) => {
			for (let j = 0; j < res.length; j++) {
				let newDate = formatDate(res[j].updated_date);
				data.push({
					id: res[j].n_id,
					title: res[j].title,
					text: res[j].sub,
					date: newDate,
					tags: res[j].t_name,
				});
			}
			setNotes(data);
			setNbSelect(false);
			setFeatureStatus(true);
			setStarStatus(false);
		});
	}

	const getTagName = (id) => {
		const data = [];
		APIService.fetchTags(id).then((res) => {
			for (let i = 0; i < res[0].t_name.length; i++) {
				data.push({ tagName: res[0].t_name[i] });
			}
			setTagNames(data);
		});
	};

	const getAllTags = () => {
		const data = [];
		const tags = [];
		APIService.fetchAllTags().then((res) => {
			for (let i = 0; i < res.length; i++) {
				for (let j = 0; j < res[i].t_name.length; j++) {
					if (!data.includes(res[i].t_name[j])) {
						data.push(res[i].t_name[j]);
						tags.push({ name: res[i].t_name[j] });
					}
				}
			}
		});
		setAllTags(tags);
		setTimeout(() => {
			APIService.fetchTagCount(data).then((res) => {
				setTagDetails(res);
			});
		}, 250);
	};

	const getTagNotes = (nIDs) => {
		const data = [];
		APIService.getTagNotes(nIDs).then((res) => {
			for (let i = 0; i < res.length; i++) {
				let newDate = formatDate(res[i][0].updated_date);
				data.push({
					id: res[i][0].n_id,
					title: res[i][0].title,
					text: res[i][0].sub,
					date: newDate,
					tags: res[i][0].t_name,
				});
			}
			setNotes(data);
		});
	};

	const updateIcon = (wsID, icon, uID) => {
		APIService.updateIcon(wsID, icon).then(
			setTimeout(() => {
				getAllWorkspace(userID);
			}, 150)
		);
	};

	const getNoteID = (id) => {
		setNoteID(id);
		setAddNoteStatus(false);
		setEditStatus(false);
	};

	const getAddNoteStatus = (status) => {
		setAddNoteStatus(status);
	};

	const getNotebookStatus = (status) => {
		setNotebookStatus(status);
	};

	const getAllIcons = () => {
		APIService.getAllIcons().then((res) => {
			// for (let i = 0; i < res[0].icon_names.length; i++) {
			//   data.push({ iconName: res[0].icon_names[i] });
			// }
			setIcons([...res[0].icon_names]);
		});
	};

	const onSignOutSuccess = () => {
		setAuth(false);
		localStorage.removeItem('token');
		localStorage.setItem('loginStatus', false);
	};

	useEffect(() => {
		getAllWorkspace(userID);
		getAllTags();
	}, [userID]);

	return (
		<div className='me-4'>
			<div
				className={
					fullScreenStatus ? 'row justify-content-center' : 'row'
				}
			>
				<NotesMenu
					handleNotebookStatus={getNotebookStatus}
					notebooks={notebooks}
					getNotes={getAllNotes}
					setNbSelect={setNbSelect}
					getNotebooks={getAllNotebooks}
					setWorkspaceID={setWorkspaceID}
					workspaceID={workspaceID}
					createStatus={createStatus}
					setCreateStatus={setCreateStatus}
					saveStatus={saveStatus}
					setSaveStatus={setSaveStatus}
					setNbName={setNbName}
					setNbID={setNbID}
					nbName={nbName}
					nbID={nbID}
					setNotes={setNotes}
					setFeatureStatus={setFeatureStatus}
					getAllBookmark={getAllBookmark}
					getAllRecentNotes={getAllRecentNotes}
					setStarStatus={setStarStatus}
					setRenameNbStatus={setNbRenameStatus}
					setDeleteNbStatus={setNbDeleteStatus}
					workspace={workspace}
					setDefaultWsID={setDefaultWsID}
					defaultWsID={defaultWsID}
					setSelectedNoteId={setSelectedNoteId}
					notes={notes}
					getNoteID={getNoteID}
					starredStatus={starredStatus}
					setStarredStatus={setStarredStatus}
					recentStatus={recentStatus}
					setRecentStatus={setRecentStatus}
					tagStatus={tagStatus}
					setTagStatus={setTagStatus}
					setAddWorkspaceStatus={setAddWorkspaceStatus}
					setWsRenameStatus={setWsRenameStatus}
					setWsName={setWsName}
					setWsDeleteStatus={setWsDeleteStatus}
					setOpenWsIcons={setOpenWsIcons}
					wsIcon={wsIcon}
					setWsIcon={setWsIcon}
					getAllIcons={getAllIcons}
					icons={icons.filter((icon) =>
						icon.toLowerCase().includes(searchIcon)
					)}
					handleSearchIcon={setSearchIcon}
					updateIcon={updateIcon}
					setIcons={setIcons}
				/>
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleDeleteNote={deleteNote}
					handleAddNoteStatus={getAddNoteStatus}
					getNoteID={getNoteID}
					nbName={nbName}
					nbSelect={nbSelect}
					handleSearchNote={setSearchText}
					featureStatus={featureStatus}
					selectedNoteId={selectedNoteId}
					setSelectedNoteId={setSelectedNoteId}
					setFullTextStatus={setFullTextStatus}
					setLastSaved={setLastSaved}
					tagNames={tagNames}
					getTagName={getTagName}
					starredStatus={starredStatus}
					recentStatus={recentStatus}
					tagStatus={tagStatus}
					tagDetails={tagDetails.filter((tagDetails) =>
						tagDetails.tagName.toLowerCase().includes(searchText)
					)}
					getTagNotes={getTagNotes}
					setFeatureStatus={setFeatureStatus}
					setNoteTitle={setNoteTitle}
					setNoteText={setNoteText}
				/>
				<NoteView
					id={noteID}
					addNoteStatus={addNoteStatus}
					handleDeleteStatus={deleteStatus}
					notebookID={nbID}
					nbSelect={nbSelect}
					deleteStatus={deleteStatus}
					handleAddNote={addNote}
					setSaveStatus={setSaveStatus}
					workspaceID={workspaceID}
					handleAddNoteStatus={getAddNoteStatus}
					getAllBookmark={getAllBookmark}
					setBookmarkStatus={setBookmarkStatus}
					bookmarkStatus={bookmarkStatus}
					fullText={fullText}
					setFullText={setFullText}
					fullTextStatus={fullTextStatus}
					setFullTextStatus={setFullTextStatus}
					getFullContent={getFullContent}
					noteText={noteText}
					setNoteText={setNoteText}
					setEditStatus={setEditStatus}
					editStatus={editStatus}
					setNoteTitle={setNoteTitle}
					noteTitle={noteTitle}
					contentTitle={contentTitle}
					starredStatus={starredStatus}
					setContentTitle={setContentTitle}
					handleEditNote={editNote}
					setFullScreenStatus={setFullScreenStatus}
					fullScreenStatus={fullScreenStatus}
					clientId={clientId}
					onSignOutSuccess={onSignOutSuccess}
					lastSaved={lastSaved}
					handleDeleteNote={deleteNote}
					dp={dp}
					userName={userName}
					mail={mail}
					tags={tags}
					setTags={setTags}
					getTagName={getTagName}
					tagNames={tagNames}
					setTagNames={setTagNames}
					allTags={allTags}
					setAllTags={setAllTags}
					setDeleteNoteStatus={setDeleteNoteStatus}
				/>
				<CreateWorkspace
					addWorkspaceStatus={addWorkspaceStatus}
					setAddWorkspaceStatus={setAddWorkspaceStatus}
					userID={userID}
					addWorkspace={addWorkspace}
					setOpenWsIcons={setOpenWsIcons}
					setWsIcon={setWsIcon}
					wsIcon={wsIcon}
					getAllIcons={getAllIcons}
					icons={icons.filter((icon) =>
						icon.toLowerCase().includes(searchIcon)
					)}
					// {tagDetails.filter((tagDetails) =>
					//   tagDetails.tagName.toLowerCase().includes(searchText)
					// )}
					setIcons={setIcons}
					handleSearchIcon={setSearchIcon}
				/>
				<RenameWorkspace
					handleRenameWorkspace={renameWorkspace}
					wsRenameStatus={wsRenameStatus}
					setWsRenameStatus={setWsRenameStatus}
					wsName={wsName}
					setWsName={setWsName}
					workspaceID={workspaceID}
					setWsIcon={setWsIcon}
					wsIcon={wsIcon}
					getAllIcons={getAllIcons}
					icons={icons.filter((icon) =>
						icon.toLowerCase().includes(searchIcon)
					)}
					// {tagDetails.filter((tagDetails) =>
					//   tagDetails.tagName.toLowerCase().includes(searchText)
					// )}
					setIcons={setIcons}
					handleSearchIcon={setSearchIcon}
				/>
				<DeleteWorkspace
					wsDeleteStatus={wsDeleteStatus}
					setWsDeleteStatus={setWsDeleteStatus}
					workspaceID={workspaceID}
					handleDeleteWorkspace={deleteWorkspace}
				/>
				<CreateNotebook
					displayNotebookStatus={notebookStatus}
					handleNotebookStatus={getNotebookStatus}
					handleAddNotebook={addNotebook}
					workspaceID={workspaceID}
					setCreateStatus={setCreateStatus}
				/>
				<DeleteNotebook
					nbDeleteStatus={nbDeleteStatus}
					setNbDeleteStatus={setNbDeleteStatus}
					notebookID={nbID}
					handleDeleteNotebook={deleteNotebook}
					setNbSelect={setNbSelect}
				/>
				<RenameNotebook
					nbRenameStatus={nbRenameStatus}
					setNbRenameStatus={setNbRenameStatus}
					nbName={nbName}
					nbID={nbID}
					setRenameNb={setRenameNb}
					renameNb={renameNb}
					handleRenameNotebook={renameNotebook}
					workspaceID={workspaceID}
					setFeatureStatus={setFeatureStatus}
				/>
				<DeleteNote
					setDeleteNoteStatus={setDeleteNoteStatus}
					handleDeleteNote={deleteNote}
					id={noteID}
					deleteNoteStatus={deleteNoteStatus}
				/>
			</div>
		</div>
	);
};

export default MainContainer;
