import React from "react";
import NotesMenu from "../views/NotesMenu";
import NotesList from "../views/NotesList";
import NoteView from "../views/NoteView";
import CreateNotebook from "../views/CreateNotebook";
import DeleteNotebook from "../views/DeleteNotebook";
import RenameNotebook from "../views/RenameNotebook";

import { useState } from "react";
import { APIService } from "../../../services/apiService";

const MainContainer = () => {
  const [notes, setNotes] = useState([]);
  const [noteID, setNoteID] = useState();
  const [addNoteStatus, setAddNoteStatus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [notebookStatus, setNotebookStatus] = useState(false);
  const [notebooks, setNotebooks] = useState([]);
  const [notebookTitle, setNotebookTitle] = useState("");
  const [notebookID, setNotebookID] = useState("");
  const [nbSelect, setNbSelect] = useState(false);
  const [workspaceID, setWorkspaceID] = useState("");
  const [saveStatus, setSaveStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [nbDeleteStatus, setNbDeleteStatus] = useState(false);
  const [nbRenameStatus, setNbRenameStatus] = useState(false);
  const [renameNb, setRenameNb] = useState("");
  const [nbName, setNbName] = useState("");
  const [nbID, setNbID] = useState("");

  const formatDate = (timestamp) => {
    var d = new Date(timestamp),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  const getAllNotebooks = (wsID) => {
    console.log("Loaded notebook");
    const data = [];
    APIService.fetchNotebooks(wsID).then((res) => {
      for (let i = 0; i < res.length; i++) {
        data.push({ id: res[i].nb_id, name: res[i].name });
      }
      console.log(data);
      setNotebooks(data);
    });
  };

  console.log(notebooks);

  const addNotebook = (name, wsID) => {
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
    fetch("http://localhost:5000/api/add-notebook", requestOptions).then(
      getAllNotebooks(wsID)
    );
    // const newNotes = [...notes, newNote];
    // setNotes(newNotes);
  };

  const deleteNotebook = (id) => {
    const data = {
      nbID: id,
    };
    function deleteNoteFromDb() {
      return fetch("http://localhost:5000/api/delete-notebook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    deleteNoteFromDb();
    const newNotebooks = notebooks.filter((notebook) => notebook.id !== id);
    setNotebooks(newNotebooks);
  };

  const renameNotebook = (id, name, ws_id) => {
    console.log("renaming at main", ws_id);
    const data = {
      nbID: id,
      name: name,
    };
    function renameNotebookInDb(nbID, name, ws_id) {
      return fetch("http://localhost:5000/api/rename-notebook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(getAllNotebooks(ws_id));
    }
    renameNotebookInDb(id, name, ws_id);
    // const newNotebooks = notebooks.filter((notebook) => notebook.id !== id);
    // setNotebooks(newNotebooks);
  };

  const getAllNotes = (id) => {
    console.log("Loaded", id);
    const data = [];
    APIService.fetchNotes(id).then((res) => {
      for (let i = 0; i < res.length; i++) {
        let newDate = formatDate(res[i].note_date);

        data.push({ id: res[i].n_id, text: res[i].sub, date: newDate });
      }
      setNotes(data);
    });
  };

  const addNote = (text, nbID, wsID) => {
    const date = new Date();
    const newNote = {
      text: text,
      date: date.toLocaleDateString(),
      nbID: nbID,
      wsID: wsID,
    };

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
    fetch("http://localhost:5000/api/add-notes", requestOptions).then(
      getAllNotes(nbID)
    );
  };

  const deleteNote = (id) => {
    const data = {
      id: id,
    };
    function deleteNoteFromDb(id, nbID) {
      return fetch("http://localhost:5000/api/delete-notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    deleteNoteFromDb();
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    setDeleteStatus(true);
  };

  const getNoteID = (id) => {
    setNoteID(id);
    setAddNoteStatus(false);
  };

  const getAddNoteStatus = (status) => {
    setAddNoteStatus(status);
  };

  const getNotebookStatus = (status) => {
    setNotebookStatus(status);
  };

  const getNotebookContent = (title, id) => {
    setNotebookTitle(title);
    setNotebookID(id);
  };

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
        <NotesMenu
          handleNotebookStatus={getNotebookStatus}
          notebooks={notebooks}
          notebookContent={getNotebookContent}
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
        />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleDeleteNote={deleteNote}
          handleAddNoteStatus={getAddNoteStatus}
          getNoteID={getNoteID}
          nbName={nbName}
          notebookID={notebookID}
          setNbDeleteStatus={setNbDeleteStatus}
          nbSelect={nbSelect}
          setNbRenameStatus={setNbRenameStatus}
          handleSearchNote={setSearchText}
        />
        <NoteView
          id={noteID}
          addNoteStatus={addNoteStatus}
          handleDeleteStatus={deleteStatus}
          notebookID={notebookID}
          nbSelect={nbSelect}
          deleteStatus={deleteStatus}
          handleAddNote={addNote}
          setSaveStatus={setSaveStatus}
          workspaceID={workspaceID}
          handleAddNoteStatus={getAddNoteStatus}
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
          notebookID={notebookID}
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
        />
      </div>
    </div>
  );
};

export default MainContainer;
