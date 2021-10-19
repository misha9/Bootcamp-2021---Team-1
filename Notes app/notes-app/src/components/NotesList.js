import React from 'react'
import Note from './Note';
import AddNote from './AddNote';

function NotesList({notes}) {
    return (
        <div className="container">
            <div className='notes-list d-grid'>
                {notes.map((note)=>(<Note id={note.id} text={note.text} date={note.date}/>))}
                <AddNote />
            </div>
        </div>
    )
}

export default NotesList;
