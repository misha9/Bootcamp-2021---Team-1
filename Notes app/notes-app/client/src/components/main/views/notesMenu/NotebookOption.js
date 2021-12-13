import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const options = [
  { icon: <DriveFileRenameOutlineIcon />, option: "Rename" },
  { icon: <ContentCopyIcon />, option: "Duplicate" },
  { icon: <DeleteOutlineIcon />, option: "Delete" },
];

const ITEM_HEIGHT = 48;

function NotebookOption({ setRenameNbStatus, setDeleteNbStatus }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleToolbar(option) {
    if (option === "Rename") {
      setRenameNbStatus(true);
      handleClose();
    } else if (option === "Delete") {
      setDeleteNbStatus(true);
      handleClose();
    }
  }

  return (
    <div className='menu'>
      <IconButton
        aria-label='more'
        id='long-button'
        className='p-0'
        aria-controls='long-menu'
        aria-expanded={open ? "true" : undefined}
        aria-haspopup='true'
        onClick={handleClick}
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
            maxWidth: "25ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.option}
            selected={option.option === "Pyxis"}
            onClick={() => handleToolbar(option.option)}
          >
            <div className='d-flex align-items-center'>
              <div className='me-2'>{option.icon}</div>
              <div className='m-0'>{option.option}</div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default NotebookOption;
