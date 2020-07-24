import React from "react";
import { Route } from "react-router-dom";

import PrivateRoute from "./services/PrivateRoute";

import DrawerNav from "./DrawerNav";
import Login from "./views/Login";
import Signup from "./views/Signup";

function App() {
	return (
		<div>
			<PrivateRoute path="/" component={DrawerNav} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />
		</div>
	);
}

export default App;
