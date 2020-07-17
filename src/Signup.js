import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { auth } from "./firebase";

const Signup = ({ history }) => {
	const handleSignup = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await auth.createUserWithEmailAndPassword(
					email.value,
					password.value
				);
				history.push("/");
			} catch (error) {
				console.log(error);
			}
		},
		[history]
	);

	return (
		<Card
			style={{
				width: "18rem",
				position: "absolute",
				left: "50%",
				top: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<h1>Sign Up</h1>
			<CardContent>
				<form onSubmit={handleSignup}>
					<TextField
						label="Email address"
						variant="outlined"
						name="email"
						type="email"
						autoComplete="on"
						size="small"
					/>
					<TextField
						label="Password"
						variant="outlined"
						name="password"
						type="password"
						autoComplete="on"
						size="small"
					/>

					<Button variant="primary" type="submit">
						Sign up
					</Button>
					<hr />
					<p>Already have an account?</p>
					<Button variant="info" component={Link} to="/login">
						Login your account
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default withRouter(Signup);
