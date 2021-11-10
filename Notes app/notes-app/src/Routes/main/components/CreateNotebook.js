import React from 'react'
import './CreateNotebook.css'
import {useState} from 'react'

import TextField from '@mui/material/TextField';

function CreateNotebook({displayNotebookStatus, handleNotebookStatus, handleAddNotebook, workspaceID, setCreateStatus}) {

    const [notebookName, setNotebookName] = useState('')

    const handleCreate = () =>{
        console.log(workspaceID);
        handleAddNotebook(notebookName, workspaceID);
        handleNotebookStatus(false);
        setCreateStatus(true);
    }

    return (
        (displayNotebookStatus) ? (
            <div className='position-fixed' style={{width: '100%', height:'100vh', zIndex: '999', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            <div className="notebook d-flex justify-content-center mt-5">
                <div class="card position-related" style={{minWidth:'444px'}}>
                    <img src="./close-icon.svg" 
                        className="position-absolute close-icon"  
                        alt="close-icon" 
                        width='24px' 
                        style={{top: '1.375rem', right:'1.5rem'}}
                        onClick={()=>handleNotebookStatus(false)}
                    />
                    <div class="card-body" style={{padding: '1.375rem'}}>
                        <h5 class="card-title mb-3" style={{fontSize:'1.25rem', fontWeight:'600'}}>Create Notebook</h5>
                        <TextField 
                            id="standard-basic" 
                            label="Enter notebook title here" 
                            variant="standard" 
                            fullWidth
                            onChange={(event)=> setNotebookName(event.target.value)}
                        />     
                    </div>
                    <div className='d-flex justify-content-end me-3 mb-4'>
                        <button 
                            type="button" 
                            className="btn btn-primary border-0"
                            onClick={()=> handleCreate()}
                        >Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
        ) : ""
    )
}

export default CreateNotebook
