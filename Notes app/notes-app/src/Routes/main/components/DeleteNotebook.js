import React from 'react'
import './CreateNotebook.css'
import {useState} from 'react'

import TextField from '@mui/material/TextField';

function DeleteNotebook({nbDeleteStatus, setNbDeleteStatus, notebookID, handleDeleteNotebook}) {

    // const [notebookName, setNotebookName] = useState('')
    console.log(nbDeleteStatus);

    const handleDelete = () =>{
        console.log("Delete notebook");
        setNbDeleteStatus(false);
        handleDeleteNotebook(notebookID);
        // handleAddNotebook(notebookName, workspaceID);
        // handleNotebookStatus(false);
        // setCreateStatus(true);
    }

    return (
        (nbDeleteStatus) ? (
            <div className='position-fixed' style={{width: '100%', height:'100vh', zIndex: '999', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            <div className="notebook d-flex justify-content-center mt-5">
                <div class="card position-related" style={{minWidth:'444px'}}>
                    <img src="./close-icon.svg" 
                        className="position-absolute close-icon"  
                        alt="close-icon" 
                        width='24px' 
                        style={{top: '1.375rem', right:'1.5rem'}}
                        onClick={()=>setNbDeleteStatus(false)}
                    />
                    <div class="card-body pb-2" style={{padding: '1.375rem'}}>
                        <h5 class="card-title mb-4" style={{fontSize:'1.25rem', fontWeight:'600'}}>Are you sure ?</h5>
                        <p className='mb-2'>All the notes in this notebook will be deleted.</p> 
                        <p className='mb-0'>You want to delete the notebook ?</p>    
                    </div>
                    <div className='d-flex justify-content-end me-3 mb-4'>
                        <button 
                            type="button" 
                            className="btn btn-primary border-0"
                            onClick={()=> handleDelete()}
                        >Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
        ) : ""
    )
}

export default DeleteNotebook
