import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import NavLinks from "../../components/NavLinks/NavLinks";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Button from "../../components/UI/Button/Button";

class SideNav extends Component {
	state = {
		links: [
			{
				id: uuidv4(),
				href: "/",
				title: "Main",
				visible: true
			},
			{
				id: uuidv4(),
				href: "/tasker",
				title: "Tasker",
				visible: true
			},
			{
				id: uuidv4(),
				href: "/logout",
				title: "Logout",
				visible: true
			}
		]
	};

	static getDerivedStateFromProps(props, state) {
		const newLinks = [...state.links];

		const taskLinkIndex = state.links.findIndex(
			link => link.href === "/tasker"
		);

		if (props.isAuthenticated) {
			const authLinkIndex = state.links.findIndex(
				link => link.href === "/auth"
			);

			if (authLinkIndex <= 0 || taskLinkIndex <= 0) return null;

			newLinks[authLinkIndex].href = "/logout";
			newLinks[authLinkIndex].title = "Logout";
			newLinks[taskLinkIndex].visible = true;

			return {
				links: newLinks
			};
		} else if (!props.isAuthenticated) {
			const authLinkIndex = state.links.findIndex(
				link => link.href === "/logout"
			);

			if (taskLinkIndex <= 0 || authLinkIndex <= 0) return null;

			newLinks[authLinkIndex].href = "/auth";
			newLinks[authLinkIndex].title = "Authentification";
			newLinks[taskLinkIndex].visible = false;

			return {
				links: newLinks
			};
		}

		return null;
	}

	body = document.body;

	touchEventHandler = e => {
		e.preventDefault();
		return false;
	};

	lockBody = () => {
		const paddingRight = innerWidth - document.documentElement.clientWidth;
		this.body.style.overflow = "hidden";
		this.body.style.paddingRight = paddingRight + "px";

		this.body.addEventListener("touchstart", this.touchEventHandler, {
			passive: false
		});
		// console.log(this.body);
	};

	unlockBody = () => {
		this.body.style.overflow = this.body.style.paddingRight = null;
		this.body.removeEventListener("touchstart", this.touchEventHandler, {
			passive: false
		});
		// console.log(this.body);
	};

	render() {
		let links = null;

		this.state.links &&
			this.state.links.length !== 0 &&
			(links = (
				<NavLinks
					links={this.state.links}
					isAuth={this.props.isAuthenticated}
				/>
			));

		const sideNav = (
			<div
				className="sidenav"
				onClick={e => {
					e.target.closest("a") && this.props.sidenavToggleHandler();
				}}
			>
				<Backdrop show clicked={this.props.sidenavToggleHandler} />
				<div className="sidenav__body">
					<Button
						btnType="button--ctrl button--cross"
						clicked={this.props.sidenavToggleHandler}
					>
						Close
					</Button>
					<h3>Menu.</h3>
					<ul>{links}</ul>
				</div>
			</div>
		);

		this.props.show ? this.lockBody() : this.unlockBody();

		return this.props.show ? sideNav : null;
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(SideNav);
