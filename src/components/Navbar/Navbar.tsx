import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ROLE } from "../../constants/common";
import { useLocation, useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store/store";
import PathConstants from "../../routes/pathConstants";

export const navList: { [key: string]: { label: string; value: string }[] } = {
  [ROLE.ADMIN]: [{ label: "Owner", value: PathConstants.OWNER }],
  [ROLE.OWNER]: [{ label: "Bussiness", value: PathConstants.BUSSINESS }],
};

const RouteList = ({
  toggleDrawer,
  role,
}: {
  role: ROLE;
  toggleDrawer: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navList[role].map((item) => (
          <ListItem
            onClick={() => {
              navigate(item.value);
              toggleDrawer();
            }}
            key={item.value}
            disablePadding
          >
            <Button
              sx={{ width: "100%" }}
              variant={location.pathname === item.value ? "contained" : "text"}
            >
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const token = useBoundStore(state => state.token)
  const logout = useBoundStore(state => state.logout)
  const roleState = useBoundStore(state => state.role)

  const role = roleState ?? ROLE.USER

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function toggleDrawer() {
    setOpenDrawer((prev) => !prev);
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function closeDrawer() {
    setOpenDrawer(false);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <button
              onClick={toggleDrawer}
              style={{ all: "unset", cursor: "pointer" }}
            >
              <MenuIcon />
            </button>
            {token && (
              <Box >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={openDrawer} onClose={closeDrawer}>
        <RouteList toggleDrawer={closeDrawer} role={role} />
      </Drawer>
    </>
  );
}
export default Navbar;
