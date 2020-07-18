import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";

function Profile() {
	const { currentUser } = useContext(AuthContext);
	const [input, setInput] = useState("");

	function changeName(event) {
		event.preventDefault();
		console.log(currentUser);

		currentUser
			.updateProfile({
				displayName: input,
			})
			.then(() => {
				setInput("");
			});
	}

	return (
		<div>
			<form onSubmit={changeName}>
				<input
					autoComplete="on"
					placeholder="Enter your name"
					type="text"
					name="name"
					value={input}
					onChange={(event) => setInput(event.target.value)}
				/>
				<button disabled={!input} type="submit" onClick={changeName}>
					Change dispplay name
				</button>
			</form>

			{currentUser.displayName ? (
				<>
					<h1>{currentUser.displayName}</h1>
					<h4>{currentUser.email}</h4>
				</>
			) : (
				<h1>{currentUser.email}</h1>
			)}
		</div>
	);
}

export default Profile;
