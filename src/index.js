import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { AuthProvider } from "./Auth";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<Router>
				<CssBaseline />
				<App />
			</Router>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
