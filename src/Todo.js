import React, { useState, useEffect } from "react";
import {
	Button,
	FormControl,
	Input,
	InputLabel,
	List,
	ListItem,
} from "@material-ui/core";
import Emoji from "./Emoji";
// import TodoList from "./TodoList";
import { firestore } from "./firebase";
import firebase from "firebase/app";

function useTodos() {
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		const unsubscribe = firestore
			.collection("todos")
			.onSnapshot((snapshot) => {
				setTodos(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				);
			});
		return () => unsubscribe();
	}, []);
	return todos;
}

const Todo = () => {
	// const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const todos = useTodos();

	const addTodo = (event) => {
		//when add todo button is clicked
		event.preventDefault();

		firestore
			.collection("todos")
			.add({
				todo: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then(() => {
				setInput("");
			});
	};

	return (
		<div style={{ textAlign: "center" }}>
			<h1>
				Hello Aerone <Emoji symbol="🚀" label="rocket" />
				!!!
			</h1>
			<form onSubmit={addTodo}>
				<FormControl>
					<InputLabel>✔ What do you want to do</InputLabel>
					<Input
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<Button
						type="submit"
						disabled={!input}
						// onClick={addTodo}
						variant="contained"
						color="primary"
					>
						Add Todo
					</Button>
				</FormControl>
			</form>
			<List>
				{todos.map((todos) => (
					<ListItem key={todos.id}>
						{todos.todo}
						{/* <TodoList todos={todo} /> */}
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default Todo;
