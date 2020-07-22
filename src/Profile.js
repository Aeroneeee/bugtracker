import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import {
	Input,
	Button,
	Avatar,
	LinearProgress,
	Card,
	CardContent,
	CardActions,
	Box,
	IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "./firebase";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	avatar: {
		width: theme.spacing(15),
		height: theme.spacing(15),
	},
	centerHorizontal: {
		margin: "auto",
	},
}));

function Profile() {
	const classes = useStyles();
	const { currentUser } = useContext(AuthContext);
	const [input, setInput] = useState("");
	const [userPhoto, setUserPhoto] = useState(currentUser.photoURL);
	const [progress, setProgress] = useState(0);

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

	const onChange = (event) => {
		const file = event.target.files[0];
		const storageRef = storage.ref(
			"profilePhoto/" + currentUser.email + ".jpg"
		);
		const task = storageRef.put(file);
		task.then(() => {
			console.log("File uploaded");
			storageRef.getDownloadURL().then((url) => {
				currentUser
					.updateProfile({
						photoURL: url,
					})
					.then(() => {
						setUserPhoto(url);
						setProgress(0);
						console.log("url", url);
					});
			});
		});
		task.on("state_changed", function progress(snapshot) {
			console.log(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			setProgress(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
		});
	};

	return (
		<div>
			<Box display="flex" justifyContent="center">
				<Card>
					{progress === 0 || progress === 100 ? null : (
						<LinearProgress
							variant="determinate"
							value={progress}
						/>
					)}
					<CardContent>
						<div className={classes.root}>
							<div>
								<input
									accept="image/*"
									type="file"
									onChange={onChange}
									style={{ display: "none" }}
									id="fileUpload"
								/>
								<label htmlFor="fileUpload">
									<IconButton
										// variant="outlined"
										// size="small"
										className={classes.centerHorizontal}
										component="span"
									>
										<Avatar
											className={classes.avatar}
											alt={currentUser.displayName}
											src={userPhoto}
										/>
									</IconButton>
								</label>
							</div>

							<div>
								{currentUser.displayName ? (
									<>
										<h1>{currentUser.displayName}</h1>
										<h4>{currentUser.email}</h4>
									</>
								) : (
									<>
										<h1>{currentUser.email}</h1>
									</>
								)}
							</div>
						</div>
					</CardContent>
					<CardActions>
						<form onSubmit={changeName} className={classes.col}>
							<Input
								autoComplete="on"
								placeholder="Enter your name"
								type="text"
								name="name"
								value={input}
								onChange={(event) =>
									setInput(event.target.value)
								}
							/>
							<Button
								disabled={!input}
								type="submit"
								onClick={changeName}
							>
								Change display name
							</Button>
						</form>
					</CardActions>
				</Card>
			</Box>
		</div>
	);
}

export default Profile;
