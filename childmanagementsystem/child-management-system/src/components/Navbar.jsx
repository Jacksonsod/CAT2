import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, ListItemText, IconButton, Switch } from "@mui/material";
import '../styles/components.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    <nav className="navbar-styles fixed-navbar">
      <h3 className="navbar-title">Children Care Management</h3>
      <div className="menu-toggle">
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon style={{ color: "var(--secondary-color)" }} />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={toggleDrawer(false)}>
                <NavLink to={item.path} className="navbar-a-styles" activeClassName="active-link">
                  <ListItemText primary={item.text} />
                </NavLink>
              </ListItem>
            ))}
            <ListItem>
              <Switch checked={isDarkMode} onChange={toggleDarkMode} />
              <span className="dark-mode-label">
                {isDarkMode ? <Brightness4 /> : <Brightness7 />}
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </span>
            </ListItem>
          </List>
        </Drawer>
      </div>
      <ul className="navbar-ul-styles">
        {menuItems.map((item, index) => (
          <li className="navbar-li-styles" key={index}>
            <NavLink to={item.path} className="navbar-a-styles" activeClassName="active-link">
              {item.text}
            </NavLink>
          </li>
        ))}
        <li>
          <div className="dark-mode-switch">
            <Switch checked={isDarkMode} onChange={toggleDarkMode} />
            <span className="dark-mode-label">
              {isDarkMode ? <Brightness4 /> : <Brightness7 />}
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
