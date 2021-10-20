import React from 'react';
import {MdDeleteForever} from 'react-icons/md';
import Popup from './Popup';
import {useState} from 'react'
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';






function Note({id, text, date, handleDeleteNote}) {
    const [buttonPopup, setButtonPopup] = useState(false);
    // const PopupExample = () => (
    //     <Popup trigger={<a>View all</a>} position="top left">
    //       {close => (
    //         <div>
    //           {text}
    //           <a className="close" onClick={close}>
    //             &times;
    //           </a>
    //         </div>
    //       )}
    //     </Popup>
    //   );
    return (
        <div className='mb-2'>
            <div className="card note bg-primary text-white">
                <div class="card-body pb-2">
                    <p class="card-text text-start" onClick={() => setButtonPopup(true)}>{text}</p>
                    {/* <button className='btn btn-link text-white-50 text-decoration-none' >View all</button> */}
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <p className='mt-5'>{text}</p>
                    </Popup>
                    {/* <PopupExample /> */}
                    <div className="footer d-flex justify-content-between mt-4">
                        <p className='small'>{date}</p>
                        <MdDeleteForever onClick={()=> handleDeleteNote(id)} className="delete-icon" size='1.3rem' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note;
