import React, { useCallback, useContext } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { auth } from "./firebase";
import { AuthContext } from "./Auth";

const Signup = ({ history }) => {
	const handleSignup = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password, name } = event.target.elements;
			try {
				await auth
					.createUserWithEmailAndPassword(email.value, password.value)
					.then((result) => {
						result.user.updateProfile({
							displayName: name.value,
						});
					});
				history.push("/");
			} catch (error) {
				console.log(error);
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
			<h1>Sign Up</h1>
			<CardContent>
				<form onSubmit={handleSignup}>
					<TextField
						label="Name"
						variant="outlined"
						name="name"
						type="text"
						autoComplete="on"
						size="small"
					/>
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
