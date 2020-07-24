import React, { useCallback, useContext } from "react";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import { AuthContext } from "../services/Auth";
import { auth } from "../services/firebase";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
	formCard: {
		width: "20rem",
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
		textAlign: "center",
	},
	content: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const Login = ({ history }) => {
	const classes = useStyles();
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
		<Card className={classes.formCard}>
			<CardHeader title="Log In"></CardHeader>
			<CardContent>
				<form onSubmit={handleLogin} className={classes.content}>
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
					<Button variant="contained" component={Link} to="/signup">
						Create new account
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default Login;
