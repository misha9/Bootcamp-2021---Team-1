import React from 'react'
import './MenuBar.css'
import { BiUser } from "react-icons/bi";
import { MdOutlineHome, MdWorkOutline, MdEventNote, MdStarBorder, MdAddCircle } from "react-icons/md";
import { CgHashtag } from "react-icons/cg";
import { GiBackwardTime } from "react-icons/gi";
import { VscNote } from "react-icons/vsc";
import AddCircleIcon from '@mui/icons-material/AddCircle';


function MenuBar() {
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
                        <li>
                            <a href="" className='text-decoration-none text-dark d-flex align-items-center'><MdWorkOutline className='me-3' size='1.3rem'/>Work</a>
                        </li>
                        <li>
                            <a href="" className='text-decoration-none text-dark d-flex align-items-center'><BiUser className='me-3' size='1.3rem'/>Personal</a>
                        </li>
                        <li>
                            <a href="" className='text-decoration-none text-dark d-flex align-items-center'><MdOutlineHome className='me-3' size='1.3rem'/> Home</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className='text-uppercase small mt-4'>notebook</p>
                    <ul className='list-unstyled'>
                        <li><a href="" className='text-decoration-none text-dark d-flex align-items-center'><VscNote className='me-3' size='1.3rem'/>Notebook 1</a></li>
                    </ul>
                </div>
                <div className="special">
                    <ul className='list-unstyled'>
                        <li className="mt-4">
                            <a href="" className='text-decoration-none text-dark d-flex align-items-center'><CgHashtag className='me-3' size='1.3rem'/>Tags</a>
                        </li>
                        <li>
                            <a href="" className='text-decoration-none text-dark d-flex align-items-center'><MdStarBorder className='me-3' size='1.3rem'/>Starred</a>
                        </li>
                        <li>
                            <a href="" className='text-decoration-none text-dark d-flex align-items-center'><GiBackwardTime className='me-3' size='1.3rem'/>Recent</a>
                        </li>
                    </ul>
                </div>
                <div className="add-notebook d-flex align-items-center mt-4">
                    <p><MdAddCircle size='1.7rem' className='me-2' /></p>
                    <p className=''>New Notebook</p>
                </div>
            </div>
        </div>
    )
}

export default MenuBar
