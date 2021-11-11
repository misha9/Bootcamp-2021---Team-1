import React from 'react'
import { useState, useEffect } from 'react';

import NotesList from './NotesList';
import MenuBar from './MenuBar';
import RightContent from './RightContent';
import AddNote from './AddNote';
import SearchBar from './SearchBar';
import ToolBar from './ToolBar';
import CreateNotebook from './CreateNotebook'

import {APIService} from '../../../apiService';
import DeleteNotebook from './DeleteNotebook';


function Main() {

    const [notes, setNotes] = useState([]);
    const [noteID, setNoteID] = useState();
    const [addNoteStatus, setAddNoteStatus] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [notebookStatus, setNotebookStatus] = useState(false);
    const [notebooks, setNotebooks] = useState([]);
    const [notebookTitle, setNotebookTitle] = useState('');
    const [notebookID, setNotebookID] = useState('');
    const [nbSelect, setNbSelect] = useState(false);
    // const [workspace, setWorkspace] = useState([]);
    const [workspaceID, setWorkspaceID] = useState('');
    const [saveStatus, setSaveStatus] = useState(false);
    const [createStatus, setCreateStatus] = useState(false);
    const [nbDeleteStatus, setNbDeleteStatus] = useState(false);


    const formatDate = (timestamp) => {
        var d = new Date(timestamp),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [day, month, year].join('/');
    };

    const getAllNotebooks = (wsID) =>{
        console.log("Loaded notebook");
        const data = [];
        APIService.fetchNotebooks(wsID).then((res)=>{
        for (let i = 0; i < res.length; i++) {
            data.push({id: res[i].nb_id, name: res[i].name});
        }
        console.log(data);
        setNotebooks(data);
        })
    }

    console.log(notebooks);


    const addNotebook = (name, wsID) => {
        const newNotebook = {
        text: name,
        wsID: wsID
        }

        const requestOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            },
            body: JSON.stringify({name: newNotebook.text, ws_id: newNotebook.wsID})
        };
        fetch("http://localhost:5000/api/add-notebook", requestOptions).then(getAllNotebooks(wsID));

        // const newNotes = [...notes, newNote];
        // setNotes(newNotes);  
    }

    const deleteNotebook = (id) => {
        const data = {
            nbID: id
        };
        function deleteNoteFromDb(id, nbID){
        // console.log('timestamp');
        return fetch('http://localhost:5000/api/delete-notebook', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        }
        deleteNoteFromDb();  
        const newNotebooks = notebooks.filter((notebook)=> notebook.id !== id);
        setNotebooks(newNotebooks);
    }

    const getAllNotes = (id) =>{
        console.log("Loaded", id);
        const data = [];
        APIService.fetchNotes(id).then((res)=>{
        for (let i = 0; i < res.length; i++) {
            let newDate = formatDate(res[i].note_date);

            data.push({id: res[i].n_id, text: res[i].sub, date: newDate});
        }
        // console.log(data);
        setNotes(data);
        })
    }

    const addNote = (text, nbID, wsID) => {
        // console.log(notebookID);
        const date = new Date();
        const newNote = {
        text: text,
        date: date.toLocaleDateString(),
        nbID: nbID,
        wsID: wsID
        }

        const requestOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            },
            body: JSON.stringify({
                note_content: newNote.text, 
                note_date: newNote.date, 
                nb_id: newNote.nbID, ws_id: newNote.wsID
            })
        };
        fetch("http://localhost:5000/api/add-notes", requestOptions).then(getAllNotes(nbID));

        // const newNotes = [...notes, newNote];
        // setNotes(newNotes);  
    }


    const deleteNote = (id) => {
        const data = {
            id: id
        };
        function deleteNoteFromDb(id, nbID){
        // console.log('timestamp');
        return fetch('http://localhost:5000/api/delete-notes', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        }
        deleteNoteFromDb();  
        const newNotes = notes.filter((note)=> note.id !== id);
        setNotes(newNotes);
        setDeleteStatus(true);
    }

    const getNoteID = (id) =>{
        setNoteID(id);
        setAddNoteStatus(false);
    }

    const getAddNoteStatus = (status) =>{
        // console.log(status);
        setAddNoteStatus(status);
        // console.log(addNoteStatus);
    }

    const getNotebookStatus = (status) =>{
        setNotebookStatus(status);
    }
    
    const getNotebookContent = (title, id) =>{
        setNotebookTitle(title);
        setNotebookID(id);
    }


    return (
        <div className='main ms-4 me-4 d-flex justify-content-center'>
            <div className="menuBar col-md-2 pt-4">
                <MenuBar 
                    handleNotebookStatus={getNotebookStatus}
                    notebooks={notebooks}
                    notebookContent={getNotebookContent}
                    getNotes={getAllNotes}
                    setNbSelect={setNbSelect}
                    // workspace={workspace}
                    getNotebooks={getAllNotebooks}
                    setWorkspaceID={setWorkspaceID}
                    workspaceID={workspaceID}
                    createStatus={createStatus}
                    setCreateStatus={setCreateStatus}
                    saveStatus={saveStatus}
                    setSaveStatus={setSaveStatus}
                    // notes={notes}
                />
            </div>
            {console.log(notes)}
            <div className="col-md-3">
                <div className="search-bar position-fixed pt-4" style={{zIndex: "2"}}>
                    <SearchBar 
                        handleSearchNote = {setSearchText}
                    />
                </div>
                <div className="note-list">
                    <NotesList
                        notes={notes.filter((note)=>
                            note.text.toLowerCase().includes(searchText)    
                        )} 
                        handleDeleteNote={deleteNote}
                        handleAddNoteStatus={getAddNoteStatus}
                        getNoteID={getNoteID}
                        notebookTitle={notebookTitle}
                        notebookID={notebookID}
                        setNbDeleteStatus={setNbDeleteStatus}
                        nbSelect={nbSelect}
                    />
                </div>
            </div>
            <div className="col-md-7 pt-4">
                <ToolBar/>
                <div className="full-content d-flex justify-content-center">
                    <RightContent 
                        id={noteID}
                        addNoteStatus={addNoteStatus}
                        handleDeleteStatus={deleteStatus}
                        notebookID={notebookID}
                        nbSelect={nbSelect}
                    />
                </div>
                <AddNote 
                    handleAddNote={addNote}
                    handleAddNoteStatus={getAddNoteStatus}
                    addNoteStatus={addNoteStatus}
                    notebookID={notebookID}
                    workspaceID={workspaceID}
                    setSaveStatus={setSaveStatus}
                    // saveStatus={saveStatus}   
                />
            </div>
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
        </div>
    )
}

export default Main
