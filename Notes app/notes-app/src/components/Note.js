import React from 'react';
import {MdDeleteForever} from 'react-icons/md'

function Note({id, text, date, handleDeleteNote}) {
    return (
        <div className='mb-2'>
            <div className="card note bg-primary text-white">
                <div class="card-body pb-2">
                    <p class="card-text text-start">{text}</p>
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
