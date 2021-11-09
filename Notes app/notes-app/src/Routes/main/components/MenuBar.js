import React from 'react'
import './MenuBar.css'
import { BiUser } from "react-icons/bi";
import { MdOutlineHome, MdWorkOutline, MdEventNote, MdStarBorder, MdAddCircle } from "react-icons/md";
import { CgHashtag } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import { GiBackwardTime } from "react-icons/gi";
import { VscNote } from "react-icons/vsc";
import AddCircleIcon from '@mui/icons-material/AddCircle';


function MenuBar({handleNotebookStatus, notebooks}) {
    console.log("notebooks in menubar", notebooks);
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
                            <MdWorkOutline className='me-3' size='1.3rem'/><a href="" className='text-decoration-none text-dark'>Work</a>
                        </li>
                        <li className='d-flex align-items-center'>
                            <BiUser className='me-3' size='1.3rem'/><a href="" className='text-decoration-none text-dark'>Personal</a>
                        </li>
                        <li className='d-flex align-items-center'>
                            <MdOutlineHome className='me-3' size='1.3rem'/><a href="" className='text-decoration-none text-dark'> Home</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className='text-uppercase small mt-4'>notebook</p>
                    <ul className='list-unstyled'>
                        {notebooks.map((notebook) =>(
                            <li 
                                className='d-flex align-items-center'>
                                <VscNote 
                                    className='me-3' 
                                    size='1.3rem'/>
                                <a href="" className='text-decoration-none text-dark'>{notebook.name}</a>
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
