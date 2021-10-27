import React from 'react'
import {useState} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function AddNote({handleAddNote}) {
    const [noteText, setNoteText] = useState('');

    const handleChange = (event, editor) =>{
        console.log(editor.getData());
        setNoteText(editor.getData());
    }

    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
        console.log(noteText); 
    }


    return (
        <div className='note new' >
            <div className="card bg-light" style={{borderRadius: "10px"}}>
                <div className="card-body">
                    <CKEditor 
                        editor = {ClassicEditor}
                        onChange={handleChange}
                        config={{placeholder: "Type to add a note..."}}
                        data={noteText}
                    />
                    <div className="note-footer text-end">
                         <button className='save btn btn-dark mt-3' onClick={handleSaveClick}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNote;
