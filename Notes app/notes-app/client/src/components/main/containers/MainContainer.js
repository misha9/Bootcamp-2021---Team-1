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
    APIService.addNewNotebook(name, wsID).then(getAllNotebooks(wsID));
  };

  const deleteNotebook = (id) => {
    APIService.deleteNotebookFromDb(id);
    const newNotebooks = notebooks.filter((notebook) => notebook.id !== id);
    setNotebooks(newNotebooks);
  };

  const renameNotebook = (id, name, ws_id) => {
    console.log("renaming at main", ws_id);

    APIService.renameNotebookInDb(id, name).then(getAllNotebooks(ws_id));
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
    APIService.addNewNote(newNote).then(getAllNotes(nbID));
  };

  const deleteNote = (id) => {
    const data = {
      id: id,
    };
    APIService.deleteNoteFromDb(data);
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

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
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
          fDate={formatDate}
          setBnotes={setNotes}
        />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleDeleteNote={deleteNote}
          handleAddNoteStatus={getAddNoteStatus}
          getNoteID={getNoteID}
          nbName={nbName}
          notebookID={nbID}
          setNbDeleteStatus={setNbDeleteStatus}
          nbSelect={nbSelect}
          setNbRenameStatus={setNbRenameStatus}
          handleSearchNote={setSearchText}
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
        />
      </div>
    </div>
  );
};

export default MainContainer;
