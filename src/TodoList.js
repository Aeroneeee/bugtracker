import React, { useState } from "react";
import {
	ListItem,
	ListItemText,
	Checkbox,
	Button,
	Modal,
	Input,
	InputLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import app from "./firebase";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
}));

const TodoList = (props) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const [input, setInput] = useState("");

	const updateTodo = (event) => {
		event.preventDefault();
		setOpen(false);
		app.firestore().collection("todos").doc(props.todos.id).set(
			{
				todo: input,
			},
			{ merge: true }
		);
	};

	return (
		<div>
			<Modal open={open} onClose={setOpen(false)}>
				<div className={classes.paper}>
					<form>
						<h3 style={{ textAlign: "center" }}>
							Change your todo
						</h3>
						<InputLabel>{props.todos.todo}</InputLabel>
						<Input
							value={input}
							onChange={(event) => setInput(event.target.value)}
						/>
						<Button type="submit" onClick={updateTodo}>
							Update Todo
						</Button>
					</form>
				</div>
			</Modal>
			<ListItem>
				<Checkbox />
				<ListItemText
					primary={props.todos.todo}
					secondary="⏰ No deadline"
				/>
				<Button onClick={setOpen(true)}>
					<EditIcon />
				</Button>
				<Button
					onClick={() => {
						app.firestore()
							.collection("todos")
							.doc(props.todo.id)
							.delete();
					}}
				>
					<DeleteIcon></DeleteIcon>
				</Button>
			</ListItem>
		</div>
	);
};

export default TodoList;
