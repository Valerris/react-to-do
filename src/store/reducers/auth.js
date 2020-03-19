import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/index";

const initialState = {
	creds: null,
	userId: null,
	token: null,
	error: "",
	isAuth: true
};

// signup user
const authSuccess = (state, action) =>
	updateObject(state, {
		creds: action.creds,
		userId: action.userId,
		token: action.token,
		error: ""
	});

const authFailed = (state, action) =>
	updateObject(state, { error: action.error });

const authLogout = (state, action) =>
	updateObject(state, { token: null, creds: null, userId: null });

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAILED:
			return authFailed(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);

		default:
			return state;
	}
};

export default reducer;
