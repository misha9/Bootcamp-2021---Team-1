import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CgMaximize, CgMinimize } from "react-icons/cg";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const options = ["Edit note", "Delete note"];

const ITEM_HEIGHT = 48;

function ToolBar({
  id,
  setEditStatus,
  setFullTextStatus,
  fullScreenStatus,
  setFullScreenStatus,
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
    }
  }

  return (
    <div
      className={
        fullScreenStatus
          ? " mb-5 mt-5"
          : "d-flex align-items-center justify-content-end mb-5"
      }
    >
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
          <IconButton size='small' color='inherit'>
            <CgMinimize
              size='1.2rem'
              className='m-1'
              onClick={() => setFullScreenStatus(false)}
            />
          </IconButton>
        </div>
      ) : (
        <IconButton size='small' color='inherit'>
          <CgMaximize
            size='1.2rem'
            className='m-1'
            onClick={() => setFullScreenStatus(true)}
          />
        </IconButton>
      )}
      {fullScreenStatus ? (
        ""
      ) : (
        <div className='menu'>
          <IconButton
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
                key={option}
                selected={option === "Pyxis"}
                onClick={() => handleToolbar(option, id)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
}

export default ToolBar;
