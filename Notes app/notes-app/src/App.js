import './App.css';
import { useState, useEffect } from 'react';
import {nanoid} from 'nanoid';
import NotesList from './components/NotesList';


import {APIService} from './apiService';


function App() {

  const [notes, setNotes] = useState();

  const formatDate = (timestamp) => {
    var d = new Date(timestamp),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [day, month, year].join('/');
  };

  let data = [];

  const getAllNotes = () =>{
    console.log("Loaded");
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
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }

    function insertIntoDb(){
      return fetch('http://localhost:5000/api/add-notes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({note_id: newNote.id, note_content: newNote.text, note_date: newNote.date})
      });
    }
    insertIntoDb(); 

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
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
    // getAllNotes();
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }

  useEffect(() => {
    getAllNotes();
  },[]);

  return (
    <div className="App mt-3">
        <div className="container">
          <h1 className='mb-4 text-secondary'>Notes</h1>
        </div>
        {console.log(notes)}
        {notes && (<NotesList
          notes={notes} 
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />)}
        
    </div>
  );
}

export default App;
