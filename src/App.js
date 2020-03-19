import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Toolbar from "./components/Toolbar/Toolbar";
import Modal from "./components/UI/Modal/Modal";
import SideNav from "./containers/SideNav/SideNav";
import TaskBuilder from "./containers/TaskBuilder/TaskBuilder";
import Auth from "./containers/Auth/Auth";
import * as utils from "./shared";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncLogout = asyncComponent(() =>
	import("./containers/Auth/Logout/Logout")
);

class App extends Component {
	state = {
		modal: {
			show: false,
			content: ""
		},
		sidenav: {
			show: false
		}
	};

	componentDidMount() {
		this.props.onAuthCheckState();
	}

	modalToggleHandler = (content = "") => {
		this.setState(prevState =>
			utils.updateObject(prevState, {
				modal: utils.updateObject(prevState.modal, {
					show: !prevState.modal.show,
					content
				})
			})
		);
	};

	sidenavToggleHandler = () => {
		this.setState(prevState =>
			utils.updateObject(prevState, {
				sidenav: utils.updateObject(prevState.sidenav, {
					show: !prevState.sidenav.show
				})
			})
		);
	};

	render() {
		const routes = (
			<Switch>
				<Route
					path="/tasker"
					render={props => (
						<TaskBuilder modalToggle={this.modalToggleHandler} {...props} />
					)}
				/>
				<Route path="/auth" component={Auth} />
				<Route path="/logout" component={asyncLogout} />
				<Route path="/" exact render={() => <h2>Welcome page!</h2>} />
				<Redirect to="/" />
			</Switch>
		);

		return (
			<Fragment>
				<SideNav
					show={this.state.sidenav.show}
					sidenavToggleHandler={this.sidenavToggleHandler}
				/>
				<Modal show={this.state.modal.show} clicked={this.modalToggleHandler}>
					<p>{this.state.modal.content}</p>
				</Modal>
				<div className="wrapper">
					<Toolbar
						showSidenav={this.state.sidenav.show}
						sidenavToggleHandler={this.sidenavToggleHandler}
					/>
					<Layout>
						<h1>App.</h1>
						{routes}
					</Layout>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
	onAuthCheckState: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
