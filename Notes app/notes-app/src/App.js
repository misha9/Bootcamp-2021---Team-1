import './App.css';
import { useState } from 'react';
import {nanoid} from 'nanoid';
import NotesList from './components/NotesList';

import {APIService} from './apiService';

function getAllNotes(){
  console.log("get");
	APIService.fetchUsers().then((res)=>{
		console.log("hy")
		const { result } = res;
    console.log(result);
  })
}

function App() {

  const [notes, setNotes] = useState([
    {
    id: nanoid(),
    text: "First note",
    date: "15/10/2021"
    },
    {
    id: nanoid(),
    text: "Second note",
    date: "15/10/2021"
    },
    {
    id: nanoid(),
    text: "Third note",
    date: "15/10/2021"
    }
  ]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className="App mt-3"  onLoad={getAllNotes}>
        <NotesList 
          notes={notes} 
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
    </div>
  );
}

export default App;
