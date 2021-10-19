import './App.css';
import { useState, useEffect } from 'react';
import {nanoid} from 'nanoid';
import NotesList from './components/NotesList';

import {APIService} from './apiService';

const formatDate = (timestamp) => {
	var d = new Date(timestamp),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('/');
};

let data = [];

const getAllNotes = () =>{
  console.log("Loaded");
	APIService.fetchNotes().then((res)=>{
    for (let i = 0; i < res.length; i++) {
      let newDate = formatDate(res[i].note_date);
      data[i] = {id: res[i].note_id, text: res[i].note_content, date: newDate}
    }
    console.log(data);
    
    // let data = {id: res.note_id, text: res.note_content, date: res.note_date}
    // console.log(data);
    // const {id, text, date} = res.
		// const { results } = res;
    // for (let i = 0; i < results.length; i++) {
    //   const rlet data = [];esult = results[i];
    //   console.log(result);
    // }
    
  })
}

function App() {

  const [notes, setNotes] = useState(data);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    // const addIntoDb = function(content, date){
    //   const content = newNote.text;
    //   const date = newNote.date;
    //   return fetch("http://localhost:5000/api/add-notes?note_content=${content}&note_date=${date}");
    // }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }

  useEffect(() => {
    getAllNotes();
  });

  return (
    <div className="App mt-3">
        <NotesList 
          notes={notes} 
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
    </div>
  );
}

export default App;
