import React from 'react'
import Note from './Note';
import AddNote from './AddNote';

function NotesList({notes, handleAddNote, handleDeleteNote}) {
    return (
        <div className="container">
            <div className='notes-list d-grid'>
                {notes.map((note, ind)=>(
                    <Note  
                        key={ind}
                        id={note.id} 
                        text={note.text} 
                        date={note.date}
                        handleDeleteNote={handleDeleteNote}
                    />
                ))}
                <AddNote handleAddNote={handleAddNote}/>
            </div>
        </div>
    )
}

export default NotesList;
