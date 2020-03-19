import React, { Component } from "react";

class Layout extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return <div className="layout">{this.props.children}</div>;
	}
}

export default Layout;
