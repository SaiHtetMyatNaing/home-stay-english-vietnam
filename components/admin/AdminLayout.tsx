"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CottageIcon from "@mui/icons-material/Cottage";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Image from "next/image";

const drawerWidth = 260;

const menuItems = [
  { text: "Dashboard", icon: <CottageIcon />, path: "/admin" },
  { text: "Reviews", icon: <Inventory2Icon />, path: "/admin/reviews" },
  { text: "Applications", icon: <CalendarMonthIcon />, path: "/admin/applications" },
  { text: "Students", icon: <SchoolIcon />, path: "/admin/students" },
  { text: "Homestays", icon: <HomeIcon />, path: "/admin/homestays" },
  { text: "Teachers", icon: <RecordVoiceOverIcon />, path: "/admin/teachers" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 65,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 65,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            bgcolor: "primary.main",
            color: "white",
          },
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              ml: open ? 0 : -1,
            }}
          >
            {open ? (
              <Typography variant="h6">English Homestay VN</Typography>
            ) : (
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 20,
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <Image src="/logo.svg" alt="Logo" width={45} height={45} />
              </ListItemIcon>
            )}
          </Box>
        </Toolbar>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={pathname === item.path}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  "&.Mui-selected": {
                    bgcolor: "rgba(255,255,255,0.2)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: open ? 40 : "100%",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Top Bar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "white",
            color: "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <Avatar alt="Admin" src="/avatar.jpg" />
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>{children}</Box>

        {/* Footer */}
        <Box
          sx={{
            bgcolor: "white",
            p: 2,
            textAlign: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 English Homestay Vietnam — Admin Panel
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
