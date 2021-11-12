import React from 'react'
import {useState, useEffect} from 'react'
import './MenuBar.css'

import { BiUser } from "react-icons/bi";
import { MdOutlineHome, MdWorkOutline, MdEventNote, MdStarBorder } from "react-icons/md";
import { CgHashtag } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import { GiBackwardTime } from "react-icons/gi";
import { VscNote } from "react-icons/vsc";


function MenuBar({handleNotebookStatus, notebooks, notebookContent, getNotes, getNotebooks, setWorkspaceID, workspaceID, saveStatus, setSaveStatus, createStatus, setCreateStatus, setNbSelect}) {
    
    const [nbName, setNbName] = useState('');
    const [nbID, setNbID] = useState('');
    const [wsID, setWsID] = useState('');
    
    
    console.log("notebooks in menubar", notebooks);
    // setNbID(notebooks[0].id)


    const handleSelectNotebook = (name, id) =>{
        // console.log(name, id);
        notebookContent(name,id);
        getNotes(id);
        setNbName(name);
        setNbID(id);
        setNbSelect(true);
    }

    const handleGetNotebooks = (i) =>{
        getNotebooks(i);
        setWorkspaceID(i);
        setWsID(i);
        setNbSelect(false)
    }

    // useEffect(() => {
    //     if (createStatus===true) {
    //         handleGetNotebooks(workspaceID)
    //         setCreateStatus(false);
    //     }
    // }, [createStatus])

    useEffect(() => {
        if (createStatus===true) {
            handleGetNotebooks(wsID);
        }
        setCreateStatus(false);
    }, [createStatus])

    console.log(saveStatus);
    useEffect(() => {
        if (saveStatus===true) {
            handleSelectNotebook(nbName, nbID)
        }
        setSaveStatus(false);
    },[saveStatus]);

    useEffect(() => {
        handleGetNotebooks(1);
        // handleSelectNotebook(nbName, nbID);
        // getNotes(notebooks[0].id)
    }, [])

    // s


    return (
        <div className='menuBar position-fixed'>
            <div className="logo mb-5">
                <div className='d-flex align-items-center'>
                    <MdEventNote className='me-1' size='1x' style={{width: '13%'}}/> 
                    <span><h3>Notes</h3></span>
                </div>
            </div>
            <div>
                <div className='workspace'>
                    <p className='text-uppercase small'>workspace</p>
                    <ul className='list-unstyled'>
                        <li className='d-flex align-items-center'>
                            <MdWorkOutline className='me-3' size='1.3rem'/>
                            <button
                                type="button"
                                className='text-decoration-none text-dark p-0 border-0 bg-transparent'
                                onClick={()=>handleGetNotebooks(1)}
                                style={{fontWeight: (wsID===1) ? '600' : '400'}}
                            >Work
                            </button>
                        </li>
                        <li className='d-flex align-items-center'>
                            <BiUser className='me-3' size='1.3rem'/>
                            <div onClick={()=>handleGetNotebooks(2)}>
                                <button
                                    type="button" 
                                    className='text-decoration-none text-dark p-0 border-0 bg-transparent'
                                    style={{fontWeight: (wsID===2) ? '600' : '400'}}
                                >Personal
                                </button>
                            </div>
                        </li>
                        <li className='d-flex align-items-center'>
                            <MdOutlineHome className='me-3' size='1.3rem'/>
                            <button
                                type="button" 
                                className='text-decoration-none text-dark p-0 border-0 bg-transparent'
                                onClick={()=>handleGetNotebooks(3)}
                                style={{fontWeight: (wsID===3) ? '600' : '400'}}
                            > Home
                            </button>
                        </li>
                    </ul>
                </div>
                <div className='notebook'>
                    <p className='text-uppercase small mt-4'>notebook</p>
                    <ul className='list-unstyled'>
                        {notebooks.map((notebook) =>(
                            <li 
                                className='d-flex align-items-center'>
                                <VscNote 
                                    className='me-3' 
                                    size='1.3rem'/>
                                <a 
                                    className='text-decoration-none' 
                                    // style={{fontFamily: selected ? '600' : '400'}}
                                    onMouseEnter={()=>handleSelectNotebook(notebook.name, notebook.id)}
                                    style={{fontWeight: (notebook.id===nbID) ? '600' : '400'}}
                                >{notebook.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="special">
                    <ul className='list-unstyled'>
                        <li className="mt-4 d-flex align-items-center">
                            <CgHashtag className='me-3' size='1.3rem'/><a href="" className='text-decoration-none text-dark'>Tags</a>
                        </li>
                        <li className='d-flex align-items-center'>
                            <MdStarBorder className='me-3' size='1.3rem'/><a href="" className='text-decoration-none text-dark'>Starred</a>
                        </li>
                        <li className='d-flex align-items-center'>
                            <GiBackwardTime className='me-3' size='1.3rem'/><a href="" className='text-decoration-none text-dark'>Recent</a>
                        </li>
                    </ul>
                </div>
                <div className="add-notebook d-flex align-items-center mt-4">
                    <p>
                        <IoIosAddCircle 
                            size='1.7rem' 
                            className='me-2 add-icon'
                            onClick={()=>handleNotebookStatus(true)}
                        />
                    </p>
                    <p className=''>New Notebook</p>
                </div>
            </div>
        </div>
    )
}

export default MenuBar
