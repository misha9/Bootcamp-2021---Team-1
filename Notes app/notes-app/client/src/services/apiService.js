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
  fetchBookmarkedNotes
};

function fetchNotes(id) {
  console.log("fetch");
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ notebook_id: id }),
  };
  return fetch("http://localhost:5000/api/get-notes", requestOptions).then(
    handleResponse
  );
}

function fetchNotebooks(wsID) {
  console.log("fetch");
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ ws_id: wsID }),
  };
  return fetch("http://localhost:5000/api/get-notebooks", requestOptions).then(
    handleResponse
  );
}

function fetchWorkspace() {
  console.log("fetching notebooks");
  return fetch("http://localhost:5000/api/get-workspace").then(handleResponse);
}

function addNewNotebook(name, wsID) {
  const newNotebook = {
    text: name,
    wsID: wsID,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name: newNotebook.text, ws_id: newNotebook.wsID }),
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
    },
    body: JSON.stringify({
      note_content: newNote.text,
      note_date: newNote.date,
      nb_id: newNote.nbID,
      ws_id: newNote.wsID,
    }),
  };
  return fetch("http://localhost:5000/api/add-notes", requestOptions);
}

function deleteNoteFromDb(data) {
  return fetch("http://localhost:5000/api/delete-notes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}


function fetchBookmarkedNotes(){
  const requestOptions = {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        },
        // body: JSON.stringify({id:bookMark.id })
    };
  return fetch("http://localhost:5000/api/get-bookmark",requestOptions)
      .then(handleResponse);
}
function fetchRecentNotes(){
  const requestOptions = {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        },
        // body: JSON.stringify({id:bookMark.id })
    };
  return fetch("http://localhost:5000/api/get-recent",requestOptions)
      .then(handleResponse);
}

function handleResponse(response) {
  console.log(response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    console.log(data);
    return data;
  });
}
