import React from "react";
import NotesMenu from "../views/NotesMenu";
import NotesList from "../views/NotesList";
import NoteView from "../views/NoteView";
import CreateNotebook from "../views/CreateNotebook";
import DeleteNotebook from "../views/DeleteNotebook";
import RenameNotebook from "../views/RenameNotebook";
import moment from "moment";

import { useEffect, useState } from "react";
import { APIService } from "../../../services/apiService";

import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { MdOutlineHome, MdWorkOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MainContainer = () => {
  const [notes, setNotes] = useState([]);
  const [noteID, setNoteID] = useState();
  const [addNoteStatus, setAddNoteStatus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [notebookStatus, setNotebookStatus] = useState(false);
  const [notebooks, setNotebooks] = useState([]);
  const [nbSelect, setNbSelect] = useState(false);
  const [workspaceID, setWorkspaceID] = useState("");
  const [saveStatus, setSaveStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [nbDeleteStatus, setNbDeleteStatus] = useState(false);
  const [nbRenameStatus, setNbRenameStatus] = useState(false);
  const [renameNb, setRenameNb] = useState("");
  const [nbName, setNbName] = useState("");
  const [nbID, setNbID] = useState("");
  const [featureStatus, setFeatureStatus] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState();
  const [fullText, setFullText] = useState("");
  const [fullTextStatus, setFullTextStatus] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(-1);
  const [noteText, setNoteText] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [noteTitle, setNoteTitle] = useState();
  const [contentTitle, setContentTitle] = useState("");
  const [starStatus, setStarStatus] = useState(false);
  const [fullScreenStatus, setFullScreenStatus] = useState(false);
  const [workspace, setWorkspace] = useState([]);
  const [defaultWsID, setDefaultWsID] = useState("");
  const [tagName, setTagName] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    // var d = new Date(timestamp),
    //   month = "" + (d.getMonth() + 1),
    //   day = "" + d.getDate(),
    //   year = d.getFullYear();

    // if (month.length < 2) month = "0" + month;
    // if (day.length < 2) day = "0" + day;

    // return [day, month, year].join("/");
    return moment(timestamp).local().format("YYYY-MM-DD HH:mm:ss");
  };

  const clientId =
    "866133952316-a8r10cdbhjlsjroke88n2qrm5ul0jgfj.apps.googleusercontent.com";

  const userID = localStorage.getItem("uID");
  const dp = localStorage.getItem("profilePic");
  const userName = localStorage.getItem("userName");
  const mail = localStorage.getItem("userMail");

  console.log(dp, userName, mail);

  const work = <MdWorkOutline className='me-3' size='1.3rem' />;
  const personal = <BiUser className='me-3' size='1.3rem' />;
  const home = <MdOutlineHome className='me-3' size='1.3rem' />;
  console.log(userID);
  const getAllWorkspace = (userID) => {
    console.log("Loaded notebook");
    const data = [];
    const wsName = ["Work", "Personal", "Home"];
    const icon = [work, personal, home];
    APIService.fetchWorkspace(userID).then((res) => {
      console.log(res[0].result);
      for (let i = 0; i < res[0].result.length; i++) {
        data.push({
          wsId_s: res[0].result[i].ws_id,
          wsID: res[0].result[i].unique_id,
          name: wsName[i],
          // name: res[0].result[i].name,
          userID: res[0].result[i].u_id,
          icon: icon[i],
        });
      }
      console.log(data);
      setWorkspace(data);
    });
  };

  // const setWorkspace = (userID) => {
  //   APIService.setWorkspace(userID);
  // };

  const getAllNotebooks = (sWID, wsID) => {
    console.log("Loaded notebook");
    const data = [];
    APIService.fetchNotebooks(sWID, wsID).then((res) => {
      for (let i = 0; i < res.length; i++) {
        data.push({ id: res[i].nb_id, name: res[i].name });
      }
      console.log(data);
      setNotebooks(data);
    });
  };

  console.log(notebooks);

  const addNotebook = (name, wsID) => {
    APIService.addNewNotebook(name, wsID).then(
      setTimeout(() => {
        getAllNotebooks(defaultWsID, wsID);
      }, 150)
    );
  };

  const deleteNotebook = (id) => {
    APIService.deleteNotebookFromDb(id);
    const newNotebooks = notebooks.filter((notebook) => notebook.id !== id);
    setNotebooks(newNotebooks);
  };

  const renameNotebook = (id, name, ws_id) => {
    console.log("renaming at main", ws_id);
    setNbName(name);
    APIService.renameNotebookInDb(id, name).then(
      setTimeout(() => {
        getAllNotebooks(defaultWsID, ws_id);
      }, 250)
    );
  };

  const getAllNotes = (id) => {
    console.log("Loaded", id);
    const data = [];
    APIService.fetchNotes(id).then((res) => {
      for (let i = 0; i < res.length; i++) {
        let newDate = formatDate(res[i].updated_date);

        data.push({
          id: res[i].n_id,
          title: res[i].title,
          text: res[i].sub,
          date: newDate,
        });
      }
      setNotes(data);
    });
  };

  const addNote = (title, text, nbID, wsID) => {
    const date = new Date();
    const newNote = {
      title: title,
      text: text,
      // date: date.toLocaleDateString(),
      date: moment(date).utc().format("YYYY-MM-DD HH:mm:ss"),
      nbID: nbID,
      wsID: wsID,
    };
    APIService.addNewNote(newNote).then(
      setTimeout(() => {
        getAllNotes(nbID);
      }, 150)
    );
  };

  const deleteNote = (id) => {
    const data = {
      id: id,
    };
    APIService.deleteNoteFromDb(data);
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    setDeleteStatus(true);
    setFullTextStatus(false);
  };

  const editNote = (id, title, text, nbID) => {
    const date = new Date();
    const newNote = {
      noteID: id,
      title: title,
      text: text,
      // date: date.toLocaleDateString(),
      date: moment(date).utc().format("YYYY-MM-DD HH:mm:ss"),
    };
    console.log(newNote);
    APIService.editNote(newNote).then(
      setTimeout(() => {
        getAllNotes(nbID);
      }, 150)
    );
  };

  function getFullContent(id) {
    APIService.getFullText(id).then((res) => {
      setFullText(res[0].note_content);
      setContentTitle(res[0].title);
      setBookmarkStatus(res[0].bookmark);
    });
  }

  function getAllBookmark(workspaceID) {
    const data = [];
    APIService.fetchBookmarkedNotes(workspaceID).then((res) => {
      for (let i = 0; i < res.length; i++) {
        let newDate = formatDate(res[i].updated_date);
        data.push({
          id: res[i].n_id,
          title: res[i].title,
          text: res[i].sub,
          date: newDate,
        });
        console.log(res[0].n_id);
      }
      setNotes(data);
    });
  }

  function getAllRecentNotes() {
    const data = [];
    APIService.fetchRecentNotes().then((res) => {
      for (let j = 0; j < res.length; j++) {
        let newDate = formatDate(res[j].updated_date);
        data.push({
          id: res[j].n_id,
          title: res[j].title,
          text: res[j].sub,
          date: newDate,
        });
        console.log(res[0].n_id);
      }
      setNotes(data);
      setNbSelect(false);
      setFeatureStatus(true);
      setStarStatus(false);
    });
  }

  const getNoteID = (id) => {
    setNoteID(id);
    setAddNoteStatus(false);
    setEditStatus(false);
  };

  const getAddNoteStatus = (status) => {
    setAddNoteStatus(status);
  };

  const getNotebookStatus = (status) => {
    setNotebookStatus(status);
  };

  const onSignOutSuccess = () => {
    //api call here => remove access token from db, clear the local storage
    // console.clear();
    localStorage.removeItem("token");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  // const getUserID = () => {};

  useEffect(() => {
    // setWorkspace(userID);
    getAllWorkspace(userID);
  }, [userID]);

  return (
    <div className='ms-4 me-4'>
      <div className={fullScreenStatus ? "row justify-content-center" : "row"}>
        <NotesMenu
          handleNotebookStatus={getNotebookStatus}
          notebooks={notebooks}
          getNotes={getAllNotes}
          setNbSelect={setNbSelect}
          getNotebooks={getAllNotebooks}
          setWorkspaceID={setWorkspaceID}
          workspaceID={workspaceID}
          createStatus={createStatus}
          setCreateStatus={setCreateStatus}
          saveStatus={saveStatus}
          setSaveStatus={setSaveStatus}
          setNbName={setNbName}
          setNbID={setNbID}
          nbName={nbName}
          nbID={nbID}
          setNotes={setNotes}
          setFeatureStatus={setFeatureStatus}
          getAllBookmark={getAllBookmark}
          getAllRecentNotes={getAllRecentNotes}
          setStarStatus={setStarStatus}
          setRenameNbStatus={setNbRenameStatus}
          setDeleteNbStatus={setNbDeleteStatus}
          workspace={workspace}
          setDefaultWsID={setDefaultWsID}
          defaultWsID={defaultWsID}
        />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleDeleteNote={deleteNote}
          handleAddNoteStatus={getAddNoteStatus}
          getNoteID={getNoteID}
          nbName={nbName}
          nbSelect={nbSelect}
          handleSearchNote={setSearchText}
          featureStatus={featureStatus}
          selectedNoteId={selectedNoteId}
          setSelectedNoteId={setSelectedNoteId}
          setFullTextStatus={setFullTextStatus}
        />
        <NoteView
          id={noteID}
          addNoteStatus={addNoteStatus}
          handleDeleteStatus={deleteStatus}
          notebookID={nbID}
          nbSelect={nbSelect}
          deleteStatus={deleteStatus}
          handleAddNote={addNote}
          setSaveStatus={setSaveStatus}
          workspaceID={workspaceID}
          handleAddNoteStatus={getAddNoteStatus}
          getAllBookmark={getAllBookmark}
          setBookmarkStatus={setBookmarkStatus}
          bookmarkStatus={bookmarkStatus}
          fullText={fullText}
          setFullText={setFullText}
          fullTextStatus={fullTextStatus}
          setFullTextStatus={setFullTextStatus}
          getFullContent={getFullContent}
          noteText={noteText}
          setNoteText={setNoteText}
          setEditStatus={setEditStatus}
          editStatus={editStatus}
          setNoteTitle={setNoteTitle}
          noteTitle={noteTitle}
          contentTitle={contentTitle}
          starStatus={starStatus}
          setContentTitle={setContentTitle}
          handleEditNote={editNote}
          setFullScreenStatus={setFullScreenStatus}
          fullScreenStatus={fullScreenStatus}
          clientId={clientId}
          onSignOutSuccess={onSignOutSuccess}
          tagName={tagName}
          setTagName={setTagName}
          tags={tags}
          setTags={setTags}
          dp={dp}
          userName={userName}
          mail={mail}
        />
        <CreateNotebook
          displayNotebookStatus={notebookStatus}
          handleNotebookStatus={getNotebookStatus}
          handleAddNotebook={addNotebook}
          workspaceID={workspaceID}
          setCreateStatus={setCreateStatus}
        />
        <DeleteNotebook
          nbDeleteStatus={nbDeleteStatus}
          setNbDeleteStatus={setNbDeleteStatus}
          notebookID={nbID}
          handleDeleteNotebook={deleteNotebook}
          setNbSelect={setNbSelect}
        />
        <RenameNotebook
          nbRenameStatus={nbRenameStatus}
          setNbRenameStatus={setNbRenameStatus}
          nbName={nbName}
          nbID={nbID}
          setRenameNb={setRenameNb}
          renameNb={renameNb}
          handleRenameNotebook={renameNotebook}
          workspaceID={workspaceID}
          setFeatureStatus={setFeatureStatus}
        />
      </div>
    </div>
  );
};

export default MainContainer;
