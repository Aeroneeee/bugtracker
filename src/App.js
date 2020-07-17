import React from "react";
import DrawerNav from "./DrawerNav";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Signup from "./Signup";
// import Signup from "./Signup";

// import { MuiThemeProvider } from "@material-ui/core/styles";
// const theme = createMuiTheme(); theme={theme}createMuiTheme

function App() {
	return (
		<div>
			{/* <Switch> */}
			<PrivateRoute path="/" component={DrawerNav} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />
			{/* <Route exact path="/">
					<Redirect to="/todo" />
				</Route> */}
			{/* </Switch> */}
		</div>
	);
}

export default App;
