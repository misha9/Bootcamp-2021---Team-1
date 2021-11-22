import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CgMaximize } from "react-icons/cg";

const options = ["Edit note", "Delete note"];

const ITEM_HEIGHT = 48;

function ToolBar({ id, setEditStatus, setFullTextStatus }) {
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
    }
  }

  return (
    <div className='d-flex align-items-center justify-content-end mb-5'>
      <CgMaximize size='1.2rem' className='me-2' />
      <div className='menu'>
        <IconButton
          aria-label='more'
          id='long-button'
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
              width: "20ch",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={() => handleToolbar(option, id)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default ToolBar;
