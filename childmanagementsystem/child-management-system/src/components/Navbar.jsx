import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, ListItemText, IconButton, Switch, Typography, useMediaQuery } from "@mui/material";
import "../styles/components.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Children", path: "/children" },
    { text: "Caregivers", path: "/caregivers" },
    { text: "Attendance", path: "/attendance" },
    { text: "Admin", path: "/admin" },
  ];

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <Typography variant="h6" className="navbar-title">
          Children Care Management
        </Typography>
        {isMobile ? (
          <IconButton onClick={toggleDrawer(true)} style={{ color: "var(--secondary-color)" }}>
            <MenuIcon />
          </IconButton>
        ) : (
          <div className="navbar-links">
            {menuItems.map((item, index) => (
              <NavLink key={index} to={item.path} className="navbar-link">
                {item.text}
              </NavLink>
            ))}
            <div className="dark-mode-switch-container">
              <Switch checked={isDarkMode} onChange={toggleDarkMode} />
              <Typography variant="body2">
                {isDarkMode ? <Brightness4 /> : <Brightness7 />}
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Typography>
            </div>
          </div>
        )}
      </div>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List className="drawer-list">
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={toggleDrawer(false)}>
              <NavLink to={item.path} className="navbar-drawer-link">
                <ListItemText primary={item.text} />
              </NavLink>
            </ListItem>
          ))}
          <ListItem>
            <Switch checked={isDarkMode} onChange={toggleDarkMode} />
            <Typography variant="body2">
              {isDarkMode ? <Brightness4 /> : <Brightness7 />}
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </Typography>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
