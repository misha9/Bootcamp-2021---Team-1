import React from 'react'
import {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function AddNote({handleAddNote, handleAddNoteStatus, addNoteStatus, notebookID, workspaceID, setSaveStatus}) {

    const [noteText, setNoteText] = useState('');

    const handleChange = (value) =>{
        setNoteText(value);
        console.log(value);
    }

    const handleSaveClick = () => {
        handleAddNoteStatus(false);
        if (noteText.trim().length > 0) {
            handleAddNote(noteText, notebookID, workspaceID);
            setNoteText('');
        }
        console.log(noteText);
        setSaveStatus(true);
    }

    console.log(addNoteStatus);

    return (
        (addNoteStatus) ? (
            <div className='new m-auto' style={{maxWidth: '570px'}}>
                <ReactQuill 
                    placeholder={"Type to add a note..."}
                    onChange={handleChange}
                    modules={
                        {
                            toolbar: [
                              [{ 'header': [1, 2, false] }],
                              ['bold', 'italic', 'underline','strike', 'blockquote'],
                              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                              ['link', 'image'],
                              ['clean']
                            ],
                          }
                    }
                    formats={
                        [
                            'header',
                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                            'list', 'bullet', 'indent',
                            'link', 'image'
                          ]
                    }
                />
                <div className="text-end">
                    <button className='save btn btn-dark mt-3' onClick={handleSaveClick}>Save</button>
                </div>
            </div>
        ) : ""    
    )
}

export default AddNote;
