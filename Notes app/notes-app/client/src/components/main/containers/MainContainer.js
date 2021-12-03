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
  const [lastSaved, setLastSaved] = useState("");
  const [tags, setTags] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [starredStatus, setStarredStatus] = useState(false);
  const [recentStatus, setRecentStatus] = useState(false);
  const [tagStatus, setTagStatus] = useState(false);
  const [tagDetails, setTagDetails] = useState([]);

  const navigate = useNavigate();

  const formatDate = (timestamp) => {
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
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        let newDate = formatDate(res[i].updated_date);

        data.push({
          id: res[i].n_id,
          title: res[i].title,
          text: res[i].sub,
          date: newDate,
          tags: res[i].t_name,
        });
      }
      setNotes(data);
    });
  };

  const addNote = (title, text, nbID, wsID, tags) => {
    const date = new Date();
    const newNote = {
      title: title,
      text: text,
      // date: date.toLocaleDateString(),
      date: moment(date).utc().format("YYYY-MM-DD HH:mm:ss"),
      nbID: nbID,
      wsID: wsID,
      tags: tags,
    };
    APIService.addNewNote(newNote).then(
      setTimeout(() => {
        getAllNotes(nbID);
        setTags("");
        getAllTags();
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

  const editNote = (id, title, text, nbID, tags) => {
    const date = new Date();
    const newNote = {
      noteID: id,
      title: title,
      text: text,
      // date: date.toLocaleDateString(),
      date: moment(date).utc().format("YYYY-MM-DD HH:mm:ss"),
      tags: tags,
    };
    console.log(newNote);
    APIService.editNote(newNote).then(
      setTimeout(() => {
        getAllNotes(nbID);
        getAllTags();
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
          tags: res[i].t_name,
        });
        console.log(res[0].n_id);
      }
      setNotes(data);
    });
  }

  function getAllRecentNotes(wsID) {
    const data = [];
    APIService.fetchRecentNotes(wsID).then((res) => {
      for (let j = 0; j < res.length; j++) {
        let newDate = formatDate(res[j].updated_date);
        data.push({
          id: res[j].n_id,
          title: res[j].title,
          text: res[j].sub,
          date: newDate,
          tags: res[j].t_name,
        });
      }
      console.log(data);
      setNotes(data);
      setNbSelect(false);
      setFeatureStatus(true);
      setStarStatus(false);
    });
  }

  const addTag = (tags) => {
    // console.log(tags);
    console.log(tags);
    // APIService.insertTag(name);
    // .then
    // // setTimeout(() => {
    // //   getAllNotebooks(defaultWsID, wsID);
    // // }, 150)
    // ();
  };

  const getTagName = (id) => {
    console.log("getting tag name");
    const data = [];
    APIService.fetchTags(id).then((res) => {
      console.log(res[0].t_name.length);
      for (let i = 0; i < res[0].t_name.length; i++) {
        data.push({ tagName: res[0].t_name[i] });
      }
      console.log(data);
      setTagNames(data);
    });
  };

  const getAllTags = () => {
    const data = [];
    APIService.fetchAllTags().then((res) => {
      // console.log(res);
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].t_name.length; j++) {
          if (!data.includes(res[i].t_name[j])) {
            data.push(res[i].t_name[j]);
          }
        }
      }
    });
    setTimeout(() => {
      APIService.fetchTagCount(data).then((res) => {
        console.log(res);
        setTagDetails(res);
      });
    }, 250);

    console.log(data);
  };

  const getTagNotes = (nIDs) => {
    console.log(nIDs);
    const data = [];
    APIService.getTagNotes(nIDs).then((res) => {
      // console.log(res[0][0].n_id);
      for (let i = 0; i < res.length; i++) {
        let newDate = formatDate(res[i][0].updated_date);

        data.push({
          id: res[i][0].n_id,
          title: res[i][0].title,
          text: res[i][0].sub,
          date: newDate,
          tags: res[i][0].t_name,
        });
      }
      console.log(data);
      setNotes(data);
    });
  };

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
    getAllTags();
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
          setSelectedNoteId={setSelectedNoteId}
          notes={notes}
          getNoteID={getNoteID}
          starredStatus={starredStatus}
          setStarredStatus={setStarredStatus}
          recentStatus={recentStatus}
          setRecentStatus={setRecentStatus}
          tagStatus={tagStatus}
          setTagStatus={setTagStatus}
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
          setLastSaved={setLastSaved}
          tagNames={tagNames}
          getTagName={getTagName}
          starredStatus={starredStatus}
          recentStatus={recentStatus}
          tagStatus={tagStatus}
          tagDetails={tagDetails.filter((tagDetails) =>
            tagDetails.tagName.toLowerCase().includes(searchText)
          )}
          getTagNotes={getTagNotes}
          setFeatureStatus={setFeatureStatus}
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
          // starStatus={starStatus}
          starredStatus={starredStatus}
          setContentTitle={setContentTitle}
          handleEditNote={editNote}
          setFullScreenStatus={setFullScreenStatus}
          fullScreenStatus={fullScreenStatus}
          clientId={clientId}
          onSignOutSuccess={onSignOutSuccess}
          lastSaved={lastSaved}
          handleDeleteNote={deleteNote}
          handleAddTag={addTag}
          dp={dp}
          userName={userName}
          mail={mail}
          tags={tags}
          setTags={setTags}
          getTagName={getTagName}
          tagNames={tagNames}
          setTagNames={setTagNames}
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
