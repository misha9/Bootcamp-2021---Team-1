import React from "react";

import { useState, useEffect } from "react";
import "../../../styles/MenuBar.css";

import { Scrollbars } from "react-custom-scrollbars";

import { MdEventNote, MdStarBorder } from "react-icons/md";
import { CgHashtag } from "react-icons/cg";
import { IoIosAddCircle, IoIosAdd } from "react-icons/io";
import { GiBackwardTime } from "react-icons/gi";
import { VscNote } from "react-icons/vsc";
import AddIcon from "@mui/icons-material/Add";
import NotebookOption from "./notesMenu/NotebookOption";
import WorkspaceOptions from "./notesMenu/WorkspaceOptions";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

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
  starredStatus,
  setStarredStatus,
  recentStatus,
  setRecentStatus,
  tagStatus,
  setTagStatus,
  setAddWorkspaceStatus,
  setWsName,
  setWsRenameStatus,
  setWsDeleteStatus,
}) => {
  console.log(workspace);
  const handleSelectNotebook = (name, id) => {
    getNotes(id);
    setNbName(name);
    setNbID(id);
    setNbSelect(true);
    setFeatureStatus(false);
    setStarStatus(false);
  };

  const handleGetNotebooks = (wsID) => {
    getNotebooks(wsID);
    setWorkspaceID(wsID);
    // setDefaultWsID(sWID);
    setNbSelect(false);
    setFeatureStatus(false);
    setStarStatus(false);
    setStarredStatus(false);
    setRecentStatus(false);
  };

  const getBookmarkNotes = (workspaceID) => {
    getAllBookmark(workspaceID);
    setNbSelect(false);
    setFeatureStatus(true);
    // setStarStatus(true);
  };

  useEffect(() => {
    if (createStatus === true) {
      handleGetNotebooks(workspaceID);
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
    if (workspace.length > 0) {
      handleGetNotebooks(workspace[0].wsID);
    }
  }, [workspace]);

  useEffect(() => {
    if (notebooks.length > 0) {
      handleSelectNotebook(notebooks[0].name, notebooks[0].id);
    }
  }, [notebooks]);

  return (
    <div
      className='col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2 pt-3 ps-4'
      style={{ height: "100vh", backgroundColor: "#EDEDED38" }}
    >
      <div className='menuBar ms-2'>
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
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <p
                  className='text-uppercase small'
                  style={{ color: "#CECECE", margin: "auto 0" }}
                >
                  workspace
                </p>
                {/* <IoIosAdd
                  className='mb-2 add-icon'
                  onClick={() => {
                    setAddWorkspaceStatus(true);
                  }}
                  src='./add-icon.svg'
                  alt='add-icon'
                  size='1.4rem'
                  style={{
                    // color: "white",
                    // backgroundColor: "black",
                    borderRadius: "100%",
                  }}
                /> */}
                <AddIcon
                  className='add-icon me-2'
                  style={{ borderRadius: "100%" }}
                  onClick={() => setAddWorkspaceStatus(true)}
                />
              </div>
              <ul className='list-unstyled'>
                {workspace.map((ws) => (
                  <li className='d-flex align-items-center justify-content-between position-relative'>
                    <div>
                      <WorkOutlineOutlinedIcon className='me-3' size='1.5rem' />
                      <button
                        type='button'
                        className='text-decoration-none p-0 border-0 bg-transparent'
                        onClick={() => {
                          handleGetNotebooks(ws.wsID);
                          setWsName(ws.wsName);
                          setTagStatus(false);
                        }}
                        style={{
                          fontWeight: "500",
                          color:
                            workspaceID === ws.wsID ? "#000000" : "#B4B4B4",
                          textTransform: "capitalize",
                        }}
                      >
                        {ws.wsName}
                      </button>
                    </div>
                    {ws.wsID === workspaceID ? (
                      <div
                        className='me-2'
                        style={{
                          position: "absolute",
                          right: "0",
                          bottom: "2px",
                        }}
                      >
                        <WorkspaceOptions
                          setWsRenameStatus={setWsRenameStatus}
                          setWsDeleteStatus={setWsDeleteStatus}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className='notebook'>
              <div className='d-flex justify-content-between align-items-center mb-3 mt-4'>
                <p
                  className='text-uppercase small'
                  style={{ color: "#CECECE", margin: "auto 0" }}
                >
                  notebook
                </p>
                <AddIcon
                  className='add-icon me-2'
                  style={{ borderRadius: "100%" }}
                  onClick={() => handleNotebookStatus(true)}
                />
              </div>
              <ul className='list-unstyled'>
                {notebooks.map((notebook) => (
                  <li className='d-flex align-items-center position-relative'>
                    {/* <VscNote className='me-3' size='1.5rem' /> */}
                    <div className='notebook-area d-flex align-items-center'>
                      <VscNote className='me-3' size='1.5rem' />
                      <a
                        className='text-decoration-none'
                        onMouseEnter={() => {
                          handleSelectNotebook(notebook.name, notebook.id);
                          setStarredStatus(false);
                          setRecentStatus(false);
                          setTagStatus(false);
                        }}
                        style={{
                          fontWeight: "500",
                          color: notebook.id === nbID ? "#000000" : "#B4B4B4",
                          // position: "absolute",
                          // bottom: "0.5px",
                          textTransform: "capitalize",
                        }}
                      >
                        {notebook.name}
                      </a>
                      {notebook.id === nbID ? (
                        <div
                          className='me-2'
                          style={{
                            position: "absolute",
                            right: "0",
                            bottom: "2px",
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
                  <button
                    className='text-decoration-none p-0 border-0 bg-transparent'
                    style={{
                      fontWeight: "500",
                      color: tagStatus ? "#000000" : "#B4B4B4",
                    }}
                    onClick={() => {
                      setStarredStatus(false);
                      setRecentStatus(false);
                      setTagStatus(true);
                      setNbID("");
                      setNbSelect(false);
                      setFeatureStatus(false);
                      // setWorkspaceID("");
                    }}
                  >
                    Tags
                  </button>
                </li>
                <li className='d-flex align-items-center'>
                  <MdStarBorder className='me-3' size='1.3rem' />
                  <button
                    className='text-decoration-none p-0 border-0 bg-transparent'
                    // onClick={getBookmarkNotes}
                    onClick={() => {
                      getBookmarkNotes(workspaceID);
                      setStarredStatus(true);
                      setRecentStatus(false);
                      setTagStatus(false);
                      setNbID("");
                    }}
                    style={{
                      fontWeight: "500",
                      color: starredStatus ? "#000000" : "#B4B4B4",
                    }}
                  >
                    Starred
                  </button>
                </li>
                <li className='d-flex align-items-center'>
                  <GiBackwardTime className='me-3' size='1.3rem' />
                  <button
                    className='text-decoration-none p-0 border-0 bg-transparent'
                    // onClick={getAllRecentNotes}
                    onClick={() => {
                      getAllRecentNotes(workspaceID);
                      setRecentStatus(true);
                      setStarredStatus(false);
                      setTagStatus(false);
                      setNbID("");
                    }}
                    style={{
                      fontWeight: "500",
                      color: recentStatus ? "#000000" : "#B4B4B4",
                    }}
                  >
                    Recent
                  </button>
                </li>
              </ul>
            </div>
          </Scrollbars>
          {/* <div className='add-notebook d-flex align-items-center mt-2'>
            <p>
              <IoIosAddCircle
                size='1.7rem'
                className='me-2 add-icon'
                onClick={() => handleNotebookStatus(true)}
              />
            </p>
            <p style={{ color: "#4F4F4F" }}>New Notebook</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NotesMenu;
