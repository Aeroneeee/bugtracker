import React, { useCallback, useContext } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { auth } from "./firebase";
import { AuthContext } from "./Auth";

const Login = ({ history }) => {
	const handleLogin = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				// console.log(email.value);

				await auth.signInWithEmailAndPassword(
					email.value,
					password.value
				);
				history.push("/");
			} catch (error) {
				console.log("❌:" + error);
			}
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

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
			<h1>Log In</h1>
			<CardContent>
				<form onSubmit={handleLogin}>
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

					<Button variant="contained" color="primary" type="submit">
						Log in
					</Button>
					<hr />
					<p>Don't have an account?</p>
					<Button variant="info" component={Link} to="/signup">
						Create new account
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default Login;
