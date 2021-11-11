import React from 'react';
import {MdDeleteForever} from 'react-icons/md';
import {useState, useEffect} from 'react'
import ReactHtmlParser from 'react-html-parser';
import './Note.css';

import {APIService} from '../../../apiService';
import { bgcolor } from '@mui/system';


function Note({id, text, date, handleDeleteNote, selected, onSelect}) {

    console.log(id)


    return (
        <div className='note mb-2' onMouseEnter={()=>{onSelect(id)}}>
            <div className="card" style={{backgroundColor: selected ? '#ffab45' : '#FBFBFB', color: selected ? '#ffffff' : '#000000'}}>
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

