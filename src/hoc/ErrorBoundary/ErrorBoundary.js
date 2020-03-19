import React, { Component } from "react";

class ErrorBoundary extends Component {
	state = {
		hasError: false,
		errorMsg: ""
	};

	static getDerivedStateFromError(error) {
		console.log("catched");

		return { hasError: true };
	}

	componentDidCatch(err, info) {
		console.log("catched");

		this.setState({ hasError: true, errorMsg: err });
	}

	render() {
		if (this.state.hasError) {
			return <h1>Smth went wrong... {this.state.errorMsg}</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
