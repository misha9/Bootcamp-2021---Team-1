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
    }
    return (
        <div className='note new' >
            <div className="card">
                <div className="card-body">
                    <CKEditor 
                        editor = {ClassicEditor}
                        onChange={handleChange}
                        config={{placeholder: "Type to add a note..."}}
                    />
                    <div className="note-footer text-end">
                         <button className='save btn btn-primary mt-3' onClick={handleSaveClick}>Save</button>
                    </div>
                </div>
            </div>
        </div>
        // <div className='note new'>
        //     <div className="card">
        //         <div className="card-body">
        //             <div class="bg-light">
        //                 <CKEditor 
        //                     editor = {ClassicEditor}
        //                 />
        //                 <textarea class="form-control text-area border-0" onChange={handleChange} value={noteText} placeholder="Type to add a note..." id="floatingTextarea2" style={{height: '100px'}}></textarea>
        //             </div>
        //             <div className="note-footer text-end">
        //                 <button className='save btn btn-primary mt-3' onClick={handleSaveClick}>Save</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default AddNote;
