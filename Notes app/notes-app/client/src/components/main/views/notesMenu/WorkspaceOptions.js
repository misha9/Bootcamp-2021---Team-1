import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = ["Rename workspace", "Delete workspace"];

const ITEM_HEIGHT = 48;

function WorkspaceOptions({ setWsRenameStatus, setWsDeleteStatus }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleToolbar(option) {
    if (option === "Rename workspace") {
      setWsRenameStatus(true);
      handleClose();
    } else {
      setWsDeleteStatus(true);
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
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handleToolbar(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default WorkspaceOptions;
