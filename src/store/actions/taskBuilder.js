import * as actionTypes from "./actionTypes";

// adding task
const addTaskSuccess = payload => ({
	type: actionTypes.ADD_TASK_SUCCESS,
	task: payload,
	error: ""
});

const addTaskFailed = payload => ({
	type: actionTypes.ADD_TASK_FAILED,
	error: payload
});

export const pushTask = (newTask, token) => async dispatch => {
	console.log(newTask);

	try {
		const response = await fetch("http://localhost:3001/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(newTask)
		});

		const data = await response.json();

		if (typeof data !== "object") throw new Error(data);

		dispatch(addTaskSuccess(data));
	} catch (error) {
		dispatch(addTaskFailed(error.message));
	}
};

// deleting task
const removeTaskSuccess = payload => ({
	type: actionTypes.REMOVE_TASK_SUCCESS,
	id: payload,
	error: ""
});

const removeTaskFailed = payload => ({
	type: actionTypes.REMOVE_TASK_FAILED,
	error: payload
});

export const deleteTask = (id, token) => async dispatch => {
	try {
		const response = await fetch(`http://localhost:3001/tasks/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ id })
		});

		const data = await response.json();

		if (typeof data !== "object") throw new Error(data);

		dispatch(removeTaskSuccess(id));
	} catch (error) {
		dispatch(removeTaskFailed(error.message));
	}
};

// fetching tasks
const fetchTasksSuccess = payload => ({
	type: actionTypes.FETCH_TASKS_SUCCESS,
	tasks: payload,
	error: ""
});

const fetchTasksFailed = payload => ({
	type: actionTypes.FETCH_TASKS_FAILED,
	error: payload
});

export const initTasks = token => async dispatch => {
	try {
		const response = await fetch("http://127.0.0.1:3001/tasks", {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${token}`
			}
		});
		const data = await response.json();

		if (typeof data !== "object") throw new Error(data);

		dispatch(fetchTasksSuccess(data));
	} catch (error) {
		dispatch(fetchTasksFailed(error.message));
	}
};
