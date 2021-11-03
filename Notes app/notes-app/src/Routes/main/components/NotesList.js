import React from 'react'
import Note from './Note';
import AddNote from './AddNote';
import './NotesList.css';


function NotesList({notes, handleDeleteNote, getNoteID, handleAddNoteStatus}) {
    return (
        <div className="noteList" style={{width: '340px'}}>
            <div className="fix position-fixed bg-white" style={{zIndex: "1", width: '340px'}}>
                <div className='add-section'>
                    <div className="d-flex justify-content-between align-items-center" style={{paddingTop: '7rem'}}>
                        <h4 className='notebook' style={{fontWeight: '600'}}>Notebook 1</h4>
                        <img className="mb-2 add-icon" onClick={()=>handleAddNoteStatus(true)} src="./add-icon.svg" alt="add-icon" />    
                    </div>
                </div>
            </div>
            <div className='notes-list' style={{paddingTop: '10.5rem'}}>
                {notes.map((note, ind)=>(
                    <Note  
                        key={ind}
                        id={note.id} 
                        text={note.text} 
                        date={note.date}
                        handleDeleteNote={handleDeleteNote}
                        getNoteID={getNoteID}
                    />
                ))}
                {/* <AddNote handleAddNote={handleAddNote}/> */}
            </div>
        </div>
    )
}

export default NotesList;
