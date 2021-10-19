import React from 'react';
import {MdDeleteForever} from 'react-icons/md'

function Note({id, text, date}) {
    return (
        <div className='note mb-2'>
            <div className="card bg-primary text-white">
                <div class="card-body">
                    <h5 class="card-title text-start">Special title treatment</h5>
                    <p class="card-text text-start">{text}</p>
                    <div className="footer d-flex mt-5">
                        <p className='small'>{date}</p>
                        <MdDeleteForever className="ms-auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note;
