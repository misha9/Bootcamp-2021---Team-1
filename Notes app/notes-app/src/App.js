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
  return (
    <div className="App mt-3">
        <NotesList notes={notes}/>
    </div>
  );
}

export default App;
