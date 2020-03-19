import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";
import * as actions from "../../store/actions/index";

class TaskBuilder extends Component {
	constructor(props) {
		super(props);
		this.listItemRefsObj = {};
		// console.log("[TaskBuilder.js] constructor");
	}

	state = {
		removingNodeId: null
	};

	shouldComponentUpdate(nextProps, nextState) {
		// console.log("[TaskBuilder.js] shouldComponentUpdate");

		return nextProps !== this.props;
	}

	componentDidMount() {
		this.props.isAuthenticated && this.props.onInitTasks(this.props.token);
		// console.log("[TaskBuilder.js] componentDidMount", this.props.tasks);
	}

	componentDidUpdate() {
		// console.log("[TaskBuilder.js]: componentDidUpdate. ", this.props.tasks);
	}

	setRef = ref => {
		ref && (this.listItemRefsObj[ref.dataset.id] = ref);
	};

	removeTask(itemId) {
		this.props.onDeleteTask(itemId, this.props.token);

		this.setState({ removingNodeId: null });

		this.listItemRefsObj[itemId] = null;
		delete this.listItemRefsObj[itemId];
	}

	clickTaskHandler = e => {
		const itemId = e.target.closest("label[data-id]").dataset.id;

		this.setState({ removingNodeId: itemId });

		if (!itemId) return;

		this.listItemRefsObj[itemId] &&
			requestAnimationFrame(() => {
				this.listItemRefsObj[itemId].classList.add("list-item__main--moved");
			});
	};

	movedAnimEndHandler = e => {
		const itemId = this.state.removingNodeId;

		if (e.animationName === "movedAnim") {
			requestAnimationFrame(() => {
				itemId &&
					this.listItemRefsObj[itemId] &&
					this.listItemRefsObj[itemId].parentNode.classList.add(
						"list-item--collapsed"
					);
			});
		}
	};

	collapsedAnimEndHandler = e => {
		const itemId = this.state.removingNodeId;

		if (e.animationName === "collapsedAnim") {
			this.removeTask(itemId);
		}
	};

	render() {
		// console.log("[TaskBuilder.js] render");

		const taskList = this.props.tasks ? (
			<TaskList
				setRef={this.setRef}
				tasks={this.props.tasks}
				clickTaskHandler={this.clickTaskHandler}
				movedAnimEndHandler={this.movedAnimEndHandler}
				collapsedAnimEndHandler={this.collapsedAnimEndHandler}
			/>
		) : null;

		const errorMsg = this.props.error ? (
			<p style={{ textAlign: "center", color: "red" }}>
				An error occured: {this.props.error}
			</p>
		) : null;

		let authRedirect = null;
		if (!this.props.isAuthenticated) authRedirect = <Redirect to="/auth" />;

		return (
			<React.Fragment>
				{authRedirect}
				{errorMsg}
				<TaskForm
					tasks={this.state.tasks}
					addTask={this.props.onAddTask}
					modalToggle={this.props.modalToggle}
				/>
				{taskList}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	tasks: state.taskBuilder.tasks,
	error: state.taskBuilder.error,
	token: state.auth.token,
	isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
	onInitTasks: token => dispatch(actions.initTasks(token)),
	onAddTask: (task, token) => dispatch(actions.pushTask(task, token)),
	onDeleteTask: (id, token) => dispatch(actions.deleteTask(id, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskBuilder);
