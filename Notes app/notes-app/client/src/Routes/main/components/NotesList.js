import React from 'react'
import {useState} from 'react'
import './NotesList.css';

import Note from './Note';

import { IoIosAdd } from "react-icons/io";
import {MdDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";


function NotesList({notes, handleDeleteNote, getNoteID, handleAddNoteStatus, notebookTitle, notebookID, setNbDeleteStatus, nbSelect}) {
    console.log(notebookID);

    const [selectedNoteId, setSelectedNoteId] = useState(-1);

    return (
        (nbSelect) ? (
            <div className="noteList" style={{width: '340px'}}>
                <div className="fix position-fixed bg-white" style={{zIndex: "1", width: '340px'}}>
                    <div className='add-section'>
                        <div className="d-flex justify-content-between align-items-center" style={{paddingTop: '7rem'}}>
                            <h4 className='notebook' style={{fontWeight: '600'}}>{notebookTitle}</h4>
                            <IoIosAdd 
                                className="mb-2 add-icon" 
                                onClick={()=>handleAddNoteStatus(true)} 
                                src="./add-icon.svg" 
                                alt="add-icon" 
                                size='1.5rem'
                            />    
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
                            // getNoteID={getNoteID}
                            selected={selectedNoteId===note.id}
                            onSelect={(id)=>{setSelectedNoteId(id);getNoteID(id);}}
                        />
                    ))}
                </div>
                <div className="notebook-option text-end mb-3 mt-2">
                    <button type="button" className="ps-3 pe-3 me-3 btn btn-secondary btn-sm align-items-center">
                        <MdOutlineModeEditOutline className='me-2'/>Rename
                    </button>
                    <button type="button" className="ps-3 pe-3 btn btn-sm btn-danger" onClick={()=>setNbDeleteStatus(true)}>
                        <MdDeleteForever className='me-2'/>Delete
                    </button>
                </div>
            </div>
        ) : ""
    )
}

export default NotesList;
