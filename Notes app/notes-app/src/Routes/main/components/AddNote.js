import React from 'react'
import {useState, useEffect} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';


function AddNote({handleAddNote, handleAddNoteStatus, addNoteStatus}) {

    // const [body,  setBody] = useState('');

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
                {/* <ReactQuill 
                    placeholder={"Type to add a note..."}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                    value={noteText}
                /> */}
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
