import React from "react";
import DrawerNav from "./DrawerNav";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// const theme = createMuiTheme(); theme={theme}createMuiTheme

function App() {
	return (
		<div>
			<Switch>
				<Route path="/">
					<DrawerNav />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
