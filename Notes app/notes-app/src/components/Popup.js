import React from 'react'
import './Popup.css'

function Popup(props) {
    return (
        (props.trigger) ? (
        <div className='popup bg-light'>
            <div className="popup-content bg-primary">
               <button className='close-btn btn btn-outline-light' onClick={()=> props.setTrigger(false)}>Close</button>
               {props.children} 
            </div>
        </div>
        ) : ""   
    )
}

export default Popup
