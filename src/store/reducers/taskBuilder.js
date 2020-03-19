import { v4 as uuidv4 } from "uuid";

import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/index";

const initialState = {
	tasks: null,
	error: ""
};

// add task
const addTaskSuccess = (state, action) =>
	updateObject(state, {
		tasks: [...state.tasks].concat(action.task),
		error: action.error
	});

const addTaskFailed = (state, action) =>
	updateObject(state, {
		error: action.error
	});

// delete task
const removeTaskSuccess = (state, action) => {
	const updatedTasks = [...state.tasks];
	const removingElIdx = updatedTasks.findIndex(el => el.id === action.id);
	updatedTasks.splice(removingElIdx, 1);

	localStorage.setItem("tasks", JSON.stringify(updatedTasks));

	return updateObject(state, { tasks: updatedTasks, error: action.error });
};

const removeTaskFailed = (state, action) =>
	updateObject(state, {
		error: action.error
	});

// fetch tasks
const fetchTasksSuccess = (state, action) =>
	updateObject(state, { tasks: action.tasks, error: action.error });

const fetchTasksFailed = (state, action) =>
	updateObject(state, { error: action.error });

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_TASK_SUCCESS:
			return addTaskSuccess(state, action);
		case actionTypes.ADD_TASK_FAILED:
			return addTaskFailed(state, action);
		case actionTypes.REMOVE_TASK_SUCCESS:
			return removeTaskSuccess(state, action);
		case actionTypes.REMOVE_TASK_FAILED:
			return removeTaskFailed(state, action);
		case actionTypes.FETCH_TASKS_SUCCESS:
			return fetchTasksSuccess(state, action);
		case actionTypes.FETCH_TASKS_FAILED:
			return fetchTasksFailed(state, action);
		default:
			return state;
	}
};

export default reducer;
