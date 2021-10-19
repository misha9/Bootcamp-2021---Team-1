import React from 'react'
import {useState} from 'react'

function AddNote() {
    const [noteText, setNoteText] = useState('');

    const handleChange = (event) =>{
        console.log(event.target.value);
    }
    return (
        <div className='note new'>
            <div className="card">
                <div className="card-body">
                    <div class="bg-light">
                        <textarea class="form-control text-area border-0" onChange={handleChange} placeholder="Type to add a note..." id="floatingTextarea2" style={{height: '100px'}}></textarea>
                    </div>
                    <div className="note-footer">
                        <button className='save btn btn-primary mt-3'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNote;
