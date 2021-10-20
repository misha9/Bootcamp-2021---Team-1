import React from 'react'
import {useState} from 'react'

function AddNote({handleAddNote}) {
    const [noteText, setNoteText] = useState('');

    const handleChange = (event) =>{
        setNoteText(event.target.value);
    }

    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('')
        } 
    }
    return (
        <div className='note new'>
            <div className="card">
                <div className="card-body">
                    <div class="bg-light">
                        <textarea class="form-control text-area border-0" onChange={handleChange} value={noteText} placeholder="Type to add a note..." id="floatingTextarea2" style={{height: '100px'}}></textarea>
                    </div>
                    <div className="note-footer">
                        <button className='save btn btn-primary mt-3' onClick={handleSaveClick}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNote;
