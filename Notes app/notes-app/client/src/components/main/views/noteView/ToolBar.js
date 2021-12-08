import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CgMaximize, CgMinimize } from "react-icons/cg";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MdEditNote } from "react-icons/md";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const options = [
  { icon: <MdEditNote size='1.55rem' />, option: "Edit note" },
  { icon: <DeleteOutlinedIcon />, option: "Delete note" },
];

const ITEM_HEIGHT = 48;

function ToolBar({
  id,
  setEditStatus,
  setFullTextStatus,
  fullScreenStatus,
  setFullScreenStatus,
  handleDeleteNote,
  addNoteStatus,
  editStatus,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleToolbar(option, id) {
    if (option === "Edit note") {
      setEditStatus(true);
      setFullTextStatus(false);
      handleClose();
    } else if (option === "Delete note") {
      handleDeleteNote(id);
      handleClose();
    }
  }

  return (
    <div className={fullScreenStatus ? " mb-5 mt-5" : "mb-4"}>
      {fullScreenStatus ? (
        <div className='d-flex align-items-center justify-content-between'>
          <div>
            <Button
              variant='text'
              color='inherit'
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "black",
                textTransform: "capitalize",
              }}
              onClick={() => setFullScreenStatus(false)}
            >
              Back
            </Button>
          </div>
          <IconButton
            size='small'
            color='inherit'
            onClick={() => setFullScreenStatus(false)}
          >
            <CgMinimize size='1.2rem' className='m-1' />
          </IconButton>
        </div>
      ) : (
        <div
          className='menu d-flex justify-content-between'
          style={{ paddingLeft: "2rem" }}
        >
          <div>
            {addNoteStatus || editStatus ? (
              <Button
                variant='text'
                color='inherit'
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: "black",
                  textTransform: "capitalize",
                }}
                onClick={() => setFullScreenStatus(false)}
              >
                Back
              </Button>
            ) : (
              ""
            )}
          </div>
          <div>
            <IconButton
              size='small'
              color='inherit'
              onClick={() => setFullScreenStatus(true)}
            >
              <CgMaximize size='1.2rem' className='m-1' />
            </IconButton>
            <IconButton
              color='inherit'
              aria-label='more'
              id='long-button'
              aria-controls='long-menu'
              aria-expanded={open ? "true" : undefined}
              aria-haspopup='true'
              onClick={handleClick}
              size='small'
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='long-menu'
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.option}
                  selected={option.option === "Pyxis"}
                  onClick={() => handleToolbar(option.option, id)}
                >
                  <div className='me-2'>{option.icon}</div>
                  {option.option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToolBar;
