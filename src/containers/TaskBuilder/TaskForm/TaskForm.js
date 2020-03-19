import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import * as utils from "../../../shared/index";

class TaskForm extends Component {
	constructor(props) {
		super(props);
		this.formInputRefsObj = {};
	}

	state = {
		taskForm: {
			Task: {
				elType: "input",
				elCfg: {
					type: "text",
					placeholder: "Type your task",
					name: "task"
				},
				value: "",
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			Comment: {
				elType: "textarea",
				elCfg: {
					placeholder: "Leave your comment...",
					name: "comment"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			}
		},
		formIsValid: false
	};

	componentDidMount() {
		this.formInputRefsObj && this.formInputRefsObj["task"].focus();
	}

	setRef = ref => {
		ref && (this.formInputRefsObj[ref.getAttribute("name")] = ref);
	};

	inputChangeHandler = (e, fieldName) => {
		const updatedTaskForm = utils.updateObject(this.state.taskForm, {
			[fieldName]: utils.updateObject(this.state.taskForm[fieldName], {
				value: e.target.value,
				valid: utils.checkInputValidity(
					e.target.value,
					this.state.taskForm[fieldName].validation
				),
				touched: true
			})
		});

		let formIsValid = utils.checkFormValidity(this.state.taskForm);

		this.setState({
			taskForm: updatedTaskForm,
			formIsValid: formIsValid
		});
	};

	submitHandler = e => {
		e.preventDefault();

		const data = {
			...utils.collectFormData(this.state.taskForm),
			userId: this.props.userId
		};

		this.props.addTask(data, this.props.token);

		this.setState({
			taskForm: utils.updateObject(this.state.taskForm, {
				...utils.clearForm(this.state.taskForm)
			}),
			formIsValid: false
		});
	};

	render() {
		const formElArr = [];

		for (let key in this.state.taskForm) {
			formElArr.push({
				id: key,
				cfg: this.state.taskForm[key]
			});
		}

		const form = (
			<form className="form" onSubmit={e => this.submitHandler(e)}>
				<h3>Task builder.</h3>
				{formElArr.map(formEl => (
					<div className="form__field" key={formEl.id}>
						<Input
							name={formEl.id}
							elType={formEl.cfg.elType}
							elCfg={formEl.cfg.elCfg}
							value={formEl.cfg.value}
							invalid={!formEl.cfg.valid}
							touched={formEl.cfg.touched}
							changed={e => this.inputChangeHandler(e, formEl.id)}
							ref={this.setRef}
						/>
					</div>
				))}
				<Button
					btnType="button--primary"
					disabled={!this.state.formIsValid}
					clicked={e =>
						this.props.modalToggle("Your task was successfully added.")
					}
				>
					Submit
				</Button>
			</form>
		);

		return form;
	}
}

const mapStateToProps = state => ({
	userId: state.auth.userId,
	token: state.auth.token
});

export default connect(mapStateToProps)(TaskForm);
