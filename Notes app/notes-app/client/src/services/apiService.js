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
  // setWorkspace,
};

const AT = localStorage.getItem("token");

function loginAccess(userData) {
  console.log(AT);
  const data = { userInfo: userData };
  const requestOptions = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch("http://localhost:5000/api/login", requestOptions).then(
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
  console.log("fetch");
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({ notebook_id: id }),
  };
  return fetch("http://localhost:5000/api/get-notes", requestOptions).then(
    handleResponse
  );
}

function fetchNotebooks(sWId, wsID) {
  console.log("fetch");
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({ ws_id: wsID, s_wsID: sWId }),
  };
  return fetch("http://localhost:5000/api/get-notebooks", requestOptions).then(
    handleResponse
  );
}

function fetchWorkspace(userID) {
  console.log("fetching workspace");
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({ user_id: userID }),
  };
  return fetch("http://localhost:5000/api/get-workspace", requestOptions).then(
    handleResponse
  );
}

function addNewNotebook(name, wsID) {
  const date = new Date();
  const newNotebook = {
    text: name,
    date: date,
    wsID: wsID,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({
      name: newNotebook.text,
      date: newNotebook.date,
      ws_id: newNotebook.wsID,
    }),
  };
  return fetch("http://localhost:5000/api/add-notebook", requestOptions);
}

function deleteNotebookFromDb(id) {
  const data = {
    nbID: id,
  };
  return fetch("http://localhost:5000/api/delete-notebook", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify(data),
  });
}

function renameNotebookInDb(id, name) {
  const data = {
    nbID: id,
    name: name,
  };
  return fetch("http://localhost:5000/api/rename-notebook", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify(data),
  });
}

function addNewNote(newNote) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({
      title: newNote.title,
      note_content: newNote.text,
      note_date: newNote.date,
      nb_id: newNote.nbID,
      ws_id: newNote.wsID,
    }),
  };
  return fetch("http://localhost:5000/api/add-notes", requestOptions);
}

function editNote(newNote) {
  console.log(newNote);
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({
      noteID: newNote.noteID,
      title: newNote.title,
      note_content: newNote.text,
      update_date: newNote.date,
    }),
  };
  return fetch("http://localhost:5000/api/edit-note", requestOptions);
}

function deleteNoteFromDb(data) {
  return fetch("http://localhost:5000/api/delete-notes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify(data),
  });
}

function fetchBookmarkedNotes(workspaceID) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({ wsID: workspaceID }),
  };
  return fetch("http://localhost:5000/api/get-bookmark", requestOptions).then(
    handleResponse
  );
}
function fetchRecentNotes(wsID) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({ wsID: wsID }),
  };
  return fetch("http://localhost:5000/api/get-recent", requestOptions).then(
    handleResponse
  );
}

function getFullText(id) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({ note_id: id }),
  };
  return fetch("http://localhost:5000/api/get-full-text", requestOptions).then(
    handleResponse
  );
}

function addBookmark(id, bookMarkStatus) {
  const markBookmark = {
    id: id,
    flag: bookMarkStatus,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${AT}`,
    },
    body: JSON.stringify({ id: markBookmark.id, flag: markBookmark.flag }),
  };
  fetch("http://localhost:5000/api/add-bookmark", requestOptions);
}

function handleResponse(response) {
  console.log(response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    console.log(data);
    return data;
  });
}
