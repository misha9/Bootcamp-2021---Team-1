import './App.css';
import { useState } from 'react';
import {nanoid} from 'nanoid';
import NotesList from './components/NotesList';

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
