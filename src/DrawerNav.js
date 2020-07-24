import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Route, Switch, Link, Redirect, useLocation } from "react-router-dom";
import Todo from "./Todo";
import Profile from "./Profile";
import Projects from "./Projects";
// import PrivateRoute from "./PrivateRoute";
// import Emoji from "./Emoji.js";
import { auth } from "./firebase";
import { Collapse } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

export default function PersistentDrawerLeft() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [openProjects, setOpenProjects] = useState(false);

	const handleDrawer = () => {
		setOpen(!open);
	};

	const handleClick = () => {
		setOpenProjects(!openProjects);
	};

	let location = useLocation();
	// console.log("location", location);
	const appBarTitle = () => {
		switch (location.pathname) {
			case "/projects":
				return "Create a project";

			case "/todo":
				return "Your todo list";

			case "/profile":
				return "Profile";

			default:
				return "";
		}
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawer}
						edge="start"
						className={clsx(
							classes.menuButton,
							open && classes.hide
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{appBarTitle()}
						{/* Project Name <Emoji symbol="🚀" label="rocket" /> */}
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawer}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button onClick={handleClick}>
						<ListItemIcon>
							<WorkIcon />
						</ListItemIcon>
						<ListItemText primary="Projects" />
						{openProjects ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse
						in={openProjects}
						timeout="auto"
						className={classes.nested}
						unmountOnExit
					>
						<List component="div" disablePadding>
							<ListItem button component={Link} to="/projects">
								<ListItemIcon>
									<FolderIcon />
								</ListItemIcon>
								<ListItemText primary="New Sample Project" />
							</ListItem>
							<ListItem button component={Link} to="/projects">
								<ListItemIcon>
									<CreateNewFolderIcon />
								</ListItemIcon>
								<ListItemText primary="Add Project" />
							</ListItem>
						</List>
					</Collapse>
					{/* <ListItem
						button
						key="projects"
						component={Link}
						to="/projects"
					>
						<ListItemIcon>
							<WorkIcon />
						</ListItemIcon>
						<ListItemText primary="Projects" />
					</ListItem> */}
					<ListItem button key="todo" component={Link} to="/todo">
						<ListItemIcon>
							<ListAltIcon />
						</ListItemIcon>
						<ListItemText primary="Your Todo" />
					</ListItem>
					<ListItem
						button
						key="profile"
						component={Link}
						to="/profile"
					>
						<ListItemIcon>
							<AccountCircleIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItem>
					<ListItem button onClick={() => auth.signOut()}>
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary="Sign Out" />
					</ListItem>
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<Switch>
					<Route exact path="/">
						<Redirect to="/projects" />
					</Route>
					<Route exact path="/projects" component={Projects} />
					<Route exact path="/todo" component={Todo} />
					<Route exact path="/profile" component={Profile} />
				</Switch>
			</main>
		</div>
	);
}
