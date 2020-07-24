import React, { useCallback, useContext } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { auth, firestore, firebase } from "./firebase";
import { AuthContext } from "./Auth";
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader } from "@material-ui/core";

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

const Signup = ({ history }) => {
	const classes = useStyles();

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

				firestore.collection("user").doc(email.value).set({
					name: name.value,
					email: email.value,
				});
				firestore
					.collection("user")
					.doc(email.value)
					.collection("todos")
					.add({
						todo: "Welcome to your todo",
						timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
		<Card className={classes.formCard}>
			<CardHeader title="Sign up"></CardHeader>
			<CardContent>
				<form onSubmit={handleSignup} className={classes.content}>
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
					<Button variant="contained" component={Link} to="/login">
						Login your account
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default withRouter(Signup);
