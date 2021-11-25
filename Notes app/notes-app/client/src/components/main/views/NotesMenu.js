import React from "react";

import { useState, useEffect } from "react";
import "../../../styles/MenuBar.css";

import { Scrollbars } from "react-custom-scrollbars";

import { BiUser } from "react-icons/bi";
import {
  MdOutlineHome,
  MdWorkOutline,
  MdEventNote,
  MdStarBorder,
} from "react-icons/md";
import { CgHashtag } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import { GiBackwardTime } from "react-icons/gi";
import { VscNote } from "react-icons/vsc";
import NotebookOption from "./notesMenu/NotebookOption";

const NotesMenu = ({
  handleNotebookStatus,
  notebooks,
  getNotes,
  getNotebooks,
  setWorkspaceID,
  workspaceID,
  saveStatus,
  setSaveStatus,
  createStatus,
  setCreateStatus,
  setNbSelect,
  setNbName,
  setNbID,
  nbName,
  nbID,
  setFeatureStatus,
  getAllBookmark,
  getAllRecentNotes,
  setStarStatus,
  setRenameNbStatus,
  setDeleteNbStatus,
  workspace,
  setDefaultWsID,
  defaultWsID,
}) => {
  const [starredStatus, setStarredStatus] = useState(false);
  const [recentStatus, setRecentStatus] = useState(false);
  const handleSelectNotebook = (name, id) => {
    getNotes(id);
    setNbName(name);
    setNbID(id);
    setNbSelect(true);
    setFeatureStatus(false);
    setStarStatus(false);
  };

  // const wsName = ['Work', 'Personal', 'Home']
  // const icon = [MdWorkOutline, BiUser, MdOutlineHome]
  console.log(notebooks);

  const handleGetNotebooks = (sWID, wID) => {
    getNotebooks(sWID, wID);
    setWorkspaceID(wID);
    setDefaultWsID(sWID);
    setNbSelect(false);
    setFeatureStatus(false);
    setStarStatus(false);
    setStarredStatus(false);
    setRecentStatus(false);
  };
  console.log(workspaceID);

  const getBookmarkNotes = (workspaceID) => {
    getAllBookmark(workspaceID);
    setNbSelect(false);
    setFeatureStatus(true);
    setStarStatus(true);
  };

  useEffect(() => {
    if (createStatus === true) {
      handleGetNotebooks(defaultWsID, workspaceID);
    }
    setCreateStatus(false);
  }, [createStatus]);

  useEffect(() => {
    if (saveStatus === true) {
      handleSelectNotebook(nbName, nbID);
    }
    setSaveStatus(false);
  }, [saveStatus]);

  useEffect(() => {
    if (workspace.length === 3) {
      handleGetNotebooks(1, workspace[0].wsID);
    }
  }, [workspace]);

  return (
    <div
      className='col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2 pt-3'
      style={{ height: "100vh" }}
    >
      <div className='menuBar'>
        <div className='logo mb-5'>
          <div className='d-flex align-items-center'>
            <MdEventNote className='me-1' size='1x' style={{ width: "18%" }} />
            <span>
              <h3 style={{ margin: "auto 0" }}>Notes</h3>
            </span>
          </div>
        </div>
        <div className='menu ms-1'>
          <Scrollbars style={{ height: "75vh" }}>
            <div className='workspace'>
              <p className='text-uppercase small'>workspace</p>
              <ul className='list-unstyled'>
                {workspace.map((ws) => (
                  <li className='d-flex align-items-center'>
                    {ws.icon}
                    <button
                      type='button'
                      className='text-decoration-none text-dark p-0 border-0 bg-transparent'
                      onClick={() => handleGetNotebooks(ws.wsId_s, ws.wsID)}
                      style={{ fontWeight: workspaceID === 1 ? "600" : "400" }}
                    >
                      {ws.name}
                    </button>
                  </li>
                ))}
                {/* <li className='d-flex align-items-center'>
                  <MdWorkOutline className='me-3' size='1.3rem' />
                  <button
                    type='button'
                    className='text-decoration-none text-dark p-0 border-0 bg-transparent'
                    onClick={() => handleGetNotebooks(1)}
                    style={{ fontWeight: workspaceID === 1 ? "600" : "400" }}
                  >
                    Work
                  </button>
                </li>
                <li className='d-flex align-items-center'>
                  <BiUser className='me-3' size='1.3rem' />
                  <div onClick={() => handleGetNotebooks(2)}>
                    <button
                      type='button'
                      className='text-decoration-none text-dark p-0 border-0 bg-transparent'
                      style={{ fontWeight: workspaceID === 2 ? "600" : "400" }}
                    >
                      Personal
                    </button>
                  </div>
                </li>
                <li className='d-flex align-items-center'>
                  <MdOutlineHome className='me-3' size='1.3rem' />
                  <button
                    type='button'
                    className='text-decoration-none text-dark p-0 border-0 bg-transparent'
                    onClick={() => handleGetNotebooks(3)}
                    style={{ fontWeight: workspaceID === 3 ? "600" : "400" }}
                  >
                    Home
                  </button>
                </li> */}
              </ul>
            </div>
            <div className='notebook'>
              <p className='text-uppercase small mt-4'>notebook</p>
              <ul className='list-unstyled'>
                {notebooks.map((notebook) => (
                  <li className='d-flex align-items-center position-relative'>
                    <VscNote className='me-3' size='1.5rem' />
                    <div className='notebook-area d-flex align-items-center'>
                      <a
                        className='text-decoration-none'
                        onMouseEnter={() => {
                          handleSelectNotebook(notebook.name, notebook.id);
                          setStarredStatus(false);
                          setRecentStatus(false);
                        }}
                        style={{
                          fontWeight: notebook.id === nbID ? "600" : "400",
                          position: "absolute",
                          bottom: "0.5px",
                          textTransform: "capitalize",
                        }}
                      >
                        {notebook.name}
                      </a>
                      {notebook.id === nbID ? (
                        <div
                          style={{
                            position: "absolute",
                            right: "1rem",
                            bottom: "1px",
                          }}
                        >
                          <NotebookOption
                            setRenameNbStatus={setRenameNbStatus}
                            setDeleteNbStatus={setDeleteNbStatus}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='special'>
              <ul className='list-unstyled'>
                <li className='mt-4 d-flex align-items-center'>
                  <CgHashtag className='me-3' size='1.3rem' />
                  <a className='text-decoration-none text-dark'>Tags</a>
                </li>
                <li className='d-flex align-items-center'>
                  <MdStarBorder className='me-3' size='1.3rem' />
                  <button
                    className='text-decoration-none text-dark p-0 border-0 bg-transparent'
                    // onClick={getBookmarkNotes}
                    onClick={() => {
                      getBookmarkNotes(workspaceID);
                      setStarredStatus(true);
                      setRecentStatus(false);
                    }}
                    style={{ fontWeight: starredStatus ? "600" : "400" }}
                  >
                    Starred
                  </button>
                </li>
                <li className='d-flex align-items-center'>
                  <GiBackwardTime className='me-3' size='1.3rem' />
                  <button
                    className='text-decoration-none text-dark p-0 border-0 bg-transparent'
                    // onClick={getAllRecentNotes}
                    onClick={() => {
                      getAllRecentNotes();
                      setRecentStatus(true);
                      setStarredStatus(false);
                    }}
                    style={{ fontWeight: recentStatus ? "600" : "400" }}
                  >
                    Recent
                  </button>
                </li>
              </ul>
            </div>
          </Scrollbars>
          <div className='add-notebook d-flex align-items-center mt-2'>
            <p>
              <IoIosAddCircle
                size='1.7rem'
                className='me-2 add-icon'
                onClick={() => handleNotebookStatus(true)}
              />
            </p>
            <p className=''>New Notebook</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesMenu;
