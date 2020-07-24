import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		"& > *": {
			margin: theme.spacing(1),
			width: theme.spacing(25),
			height: theme.spacing(30),
		},
	},
}));

const Projects = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper elevation={3} />
			<Paper elevation={3} />
			<Paper elevation={3} />
		</div>
	);
};

export default Projects;
