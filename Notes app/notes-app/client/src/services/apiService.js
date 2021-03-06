export const APIService = {
	fetchNotes,
	handleResponse,
	fetchNotebooks,
	fetchWorkspace,
	addNewNotebook,
	deleteNotebookFromDb,
	renameNotebookInDb,
	addNewNote,
	deleteNoteFromDb,
	fetchRecentNotes,
	fetchBookmarkedNotes,
	getFullText,
	addBookmark,
	editNote,
	loginAccess,
	fetchTags,
	// setWorkspace,
	fetchAllTags,
	fetchTagCount,
	getTagNotes,
	addWorkspace,
	renameWorkspace,
	deleteWorkspace,
	getAllIcons,
	updateIcon,
};

const AT = localStorage.getItem('token');

//console.log(AT);

function loginAccess(userData) {
	// console.log(AT);
	const data = { userInfo: userData };
	const requestOptions = {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	return fetch('http://localhost:5000/api/login', requestOptions).then(
		handleResponse
	);
}

// function setWorkspace(userID) {
//   console.log("fetching workspace");
//   const requestOptions = {
//     method: "PATCH",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${AT}`,
//     },
//     body: JSON.stringify({ user_id: userID }),
//   };
//   return fetch("http://localhost:5000/api/set-workspace", requestOptions).then(
//     handleResponse
//   );
// }

function fetchNotes(id) {
	//console.log("fetch");
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ notebook_id: id }),
	};
	return fetch('http://localhost:5000/api/get-notes', requestOptions).then(
		handleResponse
	);
}

function fetchNotebooks(wsID) {
	//console.log("fetch");
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ ws_id: wsID }),
	};
	return fetch(
		'http://localhost:5000/api/get-notebooks',
		requestOptions
	).then(handleResponse);
}

function fetchWorkspace(userID) {
	//console.log("fetching workspace");

	//console.log(localStorage.getItem("token"));

	const requestOptions = {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ uID: userID }),
	};
	return fetch(
		'http://localhost:5000/api/get-workspace',
		requestOptions
	).then(handleResponse);
}

function addWorkspace(uID, name, icon) {
	const requestOptions = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({
			name: name,
			uID: uID,
			icon: icon,
		}),
	};
	return fetch('http://localhost:5000/api/add-workspace', requestOptions);
}

function renameWorkspace(name, id, icon) {
	const data = {
		wsID: id,
		name: name,
		icon: icon,
	};
	//console.log(data);
	return fetch('http://localhost:5000/api/rename-workspace', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify(data),
	});
}

function deleteWorkspace(wsID) {
	const data = {
		wsID: wsID,
	};
	return fetch('http://localhost:5000/api/delete-workspace', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify(data),
	});
}

function addNewNotebook(name, wsID) {
	const date = new Date();
	const newNotebook = {
		text: name,
		date: date,
		wsID: wsID,
	};

	const requestOptions = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({
			name: newNotebook.text,
			date: newNotebook.date,
			ws_id: newNotebook.wsID,
		}),
	};
	return fetch('http://localhost:5000/api/add-notebook', requestOptions);
}

function deleteNotebookFromDb(id) {
	const data = {
		nbID: id,
	};
	return fetch('http://localhost:5000/api/delete-notebook', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify(data),
	});
}

function renameNotebookInDb(id, name) {
	const data = {
		nbID: id,
		name: name,
	};
	return fetch('http://localhost:5000/api/rename-notebook', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify(data),
	});
}

function addNewNote(newNote) {
	//console.log(newNote);
	const requestOptions = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify(newNote),
	};
	return fetch('http://localhost:5000/api/add-notes', requestOptions);
}

function editNote(newNote) {
	//console.log(newNote);
	const requestOptions = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({
			noteID: newNote.noteID,
			title: newNote.title,
			note_content: newNote.text,
			update_date: newNote.date,
			tags: newNote.tags,
		}),
	};
	return fetch('http://localhost:5000/api/edit-note', requestOptions);
}

function deleteNoteFromDb(data) {
	return fetch('http://localhost:5000/api/delete-notes', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify(data),
	});
}

function fetchBookmarkedNotes(workspaceID) {
	const requestOptions = {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ wsID: workspaceID }),
	};
	return fetch('http://localhost:5000/api/get-bookmark', requestOptions).then(
		handleResponse
	);
}
function fetchRecentNotes(wsID) {
	const requestOptions = {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ wsID: wsID }),
	};
	return fetch('http://localhost:5000/api/get-recent', requestOptions).then(
		handleResponse
	);
}

function getFullText(id) {
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ note_id: id }),
	};
	return fetch(
		'http://localhost:5000/api/get-full-text',
		requestOptions
	).then(handleResponse);
}

function addBookmark(id, bookMarkStatus) {
	const markBookmark = {
		id: id,
		flag: bookMarkStatus,
	};
	setTimeout(() => {
		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				id: markBookmark.id,
				flag: markBookmark.flag,
			}),
		};
		fetch('http://localhost:5000/api/add-bookmark', requestOptions);
	}, 500);
}

function fetchTags(id) {
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ note_id: id }),
	};
	return fetch('http://localhost:5000/api/get-tags', requestOptions).then(
		handleResponse
	);
}

function fetchAllTags() {
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		// body: JSON.stringify({ note_id: id }),
	};
	return fetch('http://localhost:5000/api/get-all_tags', requestOptions).then(
		handleResponse
	);
}

function fetchTagCount(data) {
	const tags = {
		tagNames: data,
	};
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ tags: tags.tagNames }),
	};
	return fetch(
		'http://localhost:5000/api/get-tag_count',
		requestOptions
	).then(handleResponse);
}

function getTagNotes(nIDs) {
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ tags: nIDs }),
	};
	return fetch(
		'http://localhost:5000/api/get-tag_notes',
		requestOptions
	).then(handleResponse);
}

function updateIcon(wsID, icon) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ wsID: wsID, icon: icon }),
	};
	return fetch('http://localhost:5000/api/update-icon', requestOptions).then(
		handleResponse
	);
}

function getAllIcons() {
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			// Authorization: `Bearer ${AT}`,
		},
		// body: JSON.stringify({ tags: nIDs }),
	};
	return fetch('http://localhost:5000/api/get-icons', requestOptions).then(
		handleResponse
	);
}

function handleResponse(response) {
	//console.log(response);
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		// console.log(data);
		return data;
	});
}
