import React from 'react'
import {useState, useEffect} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function AddNote({handleAddNote, handleAddNoteStatus, addNoteStatus}) {
    const [noteText, setNoteText] = useState('');

    const handleChange = (event, editor) =>{
        console.log(editor.getData());
        setNoteText(editor.getData());
    }

    const handleSaveClick = () => {
        handleAddNoteStatus(false);
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
        console.log(noteText); 
    }

    console.log(addNoteStatus);

    return (
        (addNoteStatus) ? (
            <div className='new m-auto' style={{maxWidth: '570px'}}>
                <CKEditor 
                    editor = {ClassicEditor}
                    onChange={handleChange}
                    config={{placeholder: "Type to add a note..."}}
                    data={noteText}
                />
                <div className="text-end">
                    <button className='save btn btn-dark mt-3' onClick={handleSaveClick}>Save</button>
                </div>
            </div>
        ) : ""    
    )
}

export default AddNote;
