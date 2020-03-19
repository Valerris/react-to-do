import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as utils from "../../shared/index";
import * as actions from "../../store/actions/index";

class Auth extends Component {
	constructor(props) {
		super(props);
		this.authFormRefsObj = {};
	}

	state = {
		authForm: {
			Name: {
				elType: "input",
				elCfg: {
					type: "text",
					placeholder: "Enter your name",
					name: "name"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			["E-mail"]: {
				elType: "input",
				elCfg: {
					type: "email",
					placeholder: "Enter your email...",
					name: "email"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			Password: {
				elType: "input",
				elCfg: {
					type: "password",
					placeholder: "Enter your password...",
					name: "password"
				},
				value: "",
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		formIsValid: false,
		isSignup: true
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state || nextProps !== this.props;
	}

	componentDidMount() {
		this.authFormRefsObj && this.authFormRefsObj["name"].focus();
	}

	setRef = ref => {
		ref && (this.authFormRefsObj[ref.getAttribute("name")] = ref);
	};

	changeHandler = (e, fieldName) => {
		const updatedAuthForm = utils.updateObject(this.state.authForm, {
			[fieldName]: utils.updateObject(this.state.authForm[fieldName], {
				value: e.target.value,
				valid: utils.checkInputValidity(
					e.target.value,
					this.state.authForm[fieldName].validation
				),
				touched: true
			})
		});

		const formIsValid = utils.checkFormValidity(updatedAuthForm);

		this.setState({ authForm: updatedAuthForm, formIsValid: formIsValid });
	};

	submitHandler = async e => {
		e.preventDefault();

		const data = utils.collectFormData(this.state.authForm);

		console.log(data);

		const method = this.state.isSignup ? "signup" : "signin";

		this.props.onAuth(data, method);

		this.setState({
			authForm: utils.updateObject(this.state.authForm, {
				...utils.clearForm(this.state.authForm)
			}),
			formIsValid: false
		});
	};

	switchAuthModeHandler = () =>
		this.setState(prevState => ({
			isSignup: !prevState.isSignup
		}));

	render() {
		const formArr = [];

		for (let key in this.state.authForm) {
			formArr.push({
				id: key,
				cfg: this.state.authForm[key]
			});
		}

		const form = (
			<form className="form" onSubmit={e => e.preventDefault()}>
				<h3>Authentification.</h3>

				{formArr.map(formEl => (
					<div key={formEl.id} className="form__field">
						<Input
							name={formEl.id}
							elType={formEl.cfg.elType}
							elCfg={formEl.cfg.elCfg}
							value={formEl.cfg.value}
							invalid={!formEl.cfg.valid}
							touched={formEl.cfg.touched}
							changed={e => this.changeHandler(e, formEl.id)}
							ref={this.setRef}
						/>
					</div>
				))}
				<Button disabled={!this.state.formIsValid} clicked={this.submitHandler}>
					{this.state.isSignup ? "Sign-in" : "Log-in"}
				</Button>
				<Button btnType="button--null" clicked={this.switchAuthModeHandler}>
					Switch to {this.state.isSignup ? "Log-in" : "Sign-in"}
				</Button>
			</form>
		);

		const cred = this.props.error ? (
			<p style={{ textAlign: "center", color: "red" }}>
				An error occured: {this.props.error}!
			</p>
		) : this.props.creds ? (
			<p style={{ textAlign: "center" }}>Welcome, {this.props.creds.name}!</p>
		) : null;

		let authRedirect = null;

		if (this.props.isAuthenticated) authRedirect = <Redirect to="/tasker" />;

		return (
			<Fragment>
				{authRedirect}
				{cred}
				{form}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	creds: state.auth.creds,
	error: state.auth.error,
	isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
	onAuth: (creds, method) => dispatch(actions.doAuth(creds, method))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
