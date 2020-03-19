import React, { Component } from "react";
import logo from "../../public/assets/images/logo.svg";

import SideNav from "../../containers/SideNav/SideNav";
import Button from "../UI/Button/Button";

class Toolbar extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div className="toolbar">
				<a href="/" target="_self" rel="noopener noreferrer">
					<div className="logo">Logo</div>
				</a>
				<div>
					<Button
						btnType="button--ctrl button--burger"
						clicked={this.props.sidenavToggleHandler}
					>
						Menu.
					</Button>
				</div>
			</div>
		);
	}
}

export default Toolbar;
