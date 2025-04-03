import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Drawer, List, ListItem, ListItemText, IconButton, Switch, Typography, useMediaQuery, AppBar, Toolbar, Button, Box, Menu, MenuItem, Avatar, Dialog, DialogTitle, DialogContent } from "@mui/material";
import "../styles/components.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false); // State for profile dialog
  const [user, setUser] = useState(null); // State for user information
  const [isEditing, setIsEditing] = useState(false); // Add isEditing state
  const [editUser, setEditUser] = useState({ name: "", email: "" }); // State for editing user info
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Retrieve user information from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({ name: storedUser.name, email: storedUser.email }); // Use registered email
    }
  }, []);

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    setProfileOpen(true); // Open the profile dialog
    handleMenuClose();
  };

  const handleProfileClose = () => {
    setProfileOpen(false); // Close the profile dialog
  };

  const handleSignOut = () => {
    // Clear user session data
    localStorage.removeItem("user"); // Example: Remove user data from localStorage
    handleMenuClose();
    navigate("/login"); // Redirect to login page
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Add handleEditToggle function
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSave = () => {
    setUser({ ...user, ...editUser }); // Update user state with edited info
    setIsEditing(false);
    setProfileOpen(false); // Close dialog after saving
  };

  const menuItems = [
    { text: "Home", path: "/home" },
    { text: "Children", path: "/children" },
    { text: "Caregivers", path: "/caregivers" },
    { text: "Attendance", path: "/attendance" },
    { text: "Admin", path: "/admin" },
    { text: "Parents", path: "/parents" },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Child Management System
          </Typography>
          {isMobile ? (
            <IconButton onClick={toggleDrawer(true)} style={{ color: "var(--secondary-color)" }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              {menuItems.map((item, index) => (
                <Button key={index} color="inherit" component={Link} to={item.path}>
                  {item.text}
                </Button>
              ))}
              <div className="dark-mode-switch-container">
                <Switch checked={isDarkMode} onChange={toggleDarkMode} />
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {isDarkMode ? <Brightness4 /> : <Brightness7 />}
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </Typography>
              </div>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
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
      </AppBar>

      {/* Profile Dialog */}
      <Dialog open={profileOpen} onClose={handleProfileClose}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Avatar
            alt={user?.name || "User"}
            src="/path/to/avatar.jpg" // Placeholder avatar
            sx={{ width: 100, height: 100, margin: "0 auto", marginBottom: "20px" }}
          />
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleInputChange}
                placeholder="Name"
                style={{ display: 'block', margin: '10px auto', padding: '10px', width: '80%' }}
              />
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleInputChange}
                placeholder="Email"
                style={{ display: 'block', margin: '10px auto', padding: '10px', width: '80%' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleProfileClose}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h6">{user?.name || "User"}</Typography>
              <Typography variant="body1">Email: {user?.email || "N/A"}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditToggle}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleProfileClose}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
