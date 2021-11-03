import React from 'react'

import { useState, useEffect } from 'react';
import NotesList from './NotesList';
import ReactHtmlParser from 'react-html-parser';

import {APIService} from '../../../apiService';
import MenuBar from './MenuBar';
import RightContent from './RightContent';
import AddNote from './AddNote';
import SearchBar from './SearchBar';
import ToolBar from './ToolBar';


function Main() {

    const [notes, setNotes] = useState([]);
    const [noteID, setNoteID] = useState();
    const [addNoteStatus, setAddNoteStatus] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [deleteStatus, setDeleteStatus] = useState(false);

    const formatDate = (timestamp) => {
        var d = new Date(timestamp),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [day, month, year].join('/');
    };

    const getAllNotes = () =>{
        console.log("Loaded");
        const data = [];
        APIService.fetchNotes().then((res)=>{
        for (let i = 0; i < res.length; i++) {
            let newDate = formatDate(res[i].note_date);
            data.push({id: res[i].note_id, text: res[i].sub, date: newDate});
        }
        console.log(data);
        setNotes(data);
        })
    }

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
        text: text,
        date: date.toLocaleDateString()
        }

        const requestOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            },
            body: JSON.stringify({note_content: newNote.text, note_date: newNote.date})
        };
        fetch("http://localhost:5000/api/add-notes", requestOptions).then(getAllNotes);

        // const newNotes = [...notes, newNote];
        // setNotes(newNotes);
        
    }

    const deleteNote = (id) => {
        const data = {id:id};
        function deleteNoteFromDb(id){
        console.log('timestamp');
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
        console.log(status);
        setAddNoteStatus(status);
        console.log(addNoteStatus);
    }
    
    console.log(addNoteStatus);

    useEffect(() => {
        getAllNotes();
    },[]);

    return (
        <div className='main ms-4 me-4 d-flex justify-content-center'>
            <div className="menuBar col-md-2 pt-4">
                <MenuBar />
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
                    />
                </div>
                <AddNote 
                    handleAddNote={addNote}
                    handleAddNoteStatus={getAddNoteStatus}
                    addNoteStatus={addNoteStatus}
                    // handleAddNoteStatus={addNoteStatus}    
                />

            </div>
        </div>
    )
}

export default Main
