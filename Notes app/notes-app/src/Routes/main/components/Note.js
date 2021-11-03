import React from 'react';
import {MdDeleteForever} from 'react-icons/md';
import {useState} from 'react'
import ReactHtmlParser from 'react-html-parser';
import './Note.css';

import {APIService} from '../../../apiService';


function Note({id, text, date, handleDeleteNote, getNoteID}) {

    const [selectNoteID, setSelectNoteID] = useState(id);

    console.log(id)

    const selectNote = () =>{
        getNoteID(id)
        setSelectNoteID(id);
        console.log(selectNoteID)
    }
    

    return (
        <div className='note mb-2'>
            <div className="card" onMouseEnter={()=>{selectNote()}} onMouseLeave={()=>console.log("mouse left")}>
                <div className="card-body pb-2">
                    <p className="card-text text-start" >{ReactHtmlParser(text)}</p>
                </div>
                <div className="footer d-flex justify-content-between ps-3 pe-3">
                    <p className='small'>{date}</p>
                    <MdDeleteForever onClick={()=> handleDeleteNote(id)} className="delete-icon" size='1.3rem' />
                </div>
            </div>
        </div>
    )
}

export default Note;

