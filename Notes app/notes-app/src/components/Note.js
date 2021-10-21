import React from 'react';
import {MdDeleteForever} from 'react-icons/md';
import Popup from './Popup';
import {useState} from 'react'
import ReactHtmlParser from 'react-html-parser';
import './Note.css';

import {APIService} from '../apiService';


function Note({id, text, date, handleDeleteNote}) {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [fullText, setFullText] = useState('');
    

    function getFullText(){
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
              },
            body: JSON.stringify({note_id: id})
          };
        return fetch("http://localhost:5000/api/get-full-text",requestOptions)
            .then(APIService.handleResponse);
        };


    function getFullContent(){
        getFullText(id).then((res)=>{
            console.log("tracking")
            setFullText(res[0].note_content);
        })
    }

    return (
        <div className='mb-2'>
            <div className="card note text-white bg-primary">
                <div class="card-body pb-2" onClick={getFullContent}>
                    <p class="card-text text-start" onClick={() => setButtonPopup(true)}>{ReactHtmlParser(text)}</p>
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <p className='mt-5'>{ReactHtmlParser(fullText)}</p>
                    </Popup>
                    <div className="footer d-flex justify-content-between mt-4">
                        <p className='small'>{date}</p>
                        <MdDeleteForever onClick={()=> handleDeleteNote(id)} className="delete-icon" size='1.3rem' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note;
