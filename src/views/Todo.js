import React, { useState, useEffect, useContext } from "react";

import { firestore, firebase } from "../services/firebase";
import { AuthContext } from "../services/Auth";

import Emoji from "../Emoji";
import TodoList from "./TodoList";

import { Button, List, TextField } from "@material-ui/core";

function useTodos() {
	const [todos, setTodos] = useState([]);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const unsubscribe = firestore
			.collection("user")
			.doc(currentUser.email)
			.collection("todos")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) => {
				setTodos(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				);
			});
		return () => unsubscribe();
	}, [currentUser]);
	return todos;
}

const Todo = () => {
	const { currentUser } = useContext(AuthContext);
	const [input, setInput] = useState("");
	const todos = useTodos();

	const addTodo = (event) => {
		//when add todo button is clicked
		event.preventDefault();

		firestore
			.collection("user")
			.doc(currentUser.email)
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
				Hello {currentUser.displayName}{" "}
				<Emoji symbol="🚀" label="rocket" />
				!!!
			</h1>
			<form onSubmit={addTodo}>
				<TextField
					label="✔ What do you want to do"
					value={input}
					onChange={(event) => setInput(event.target.value)}
				/>
				<Button
					type="submit"
					disabled={!input}
					variant="contained"
					color="primary"
				>
					Add Todo
				</Button>
			</form>
			<List>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{todos.map((todos) => (
						<TodoList todos={todos} key={todos.id} />
					))}
				</div>
			</List>
		</div>
	);
};

export default Todo;
