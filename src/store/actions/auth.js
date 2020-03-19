import * as actionTypes from "./actionTypes";

const authSuccess = payload => ({
	type: actionTypes.AUTH_SUCCESS,
	creds: payload.creds,
	userId: payload.userId,
	token: payload.token,
	error: ""
});

const authFailed = payload => ({
	type: actionTypes.AUTH_FAILED,
	error: payload
});

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("creds");
	localStorage.removeItem("userId");

	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

const checkAuthTimeout = expTime => dispatch => {
	setTimeout(() => dispatch(logout()), expTime);
};

export const doAuth = (credentials, method) => async dispatch => {
	try {
		const url = `http://localhost:3001/${method}`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			body: JSON.stringify(credentials)
		});

		const data = await response.json();

		if (typeof data !== "object" || Object.keys(data).length === 0)
			throw new Error(data);

		const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

		localStorage.setItem("token", data.accessToken);
		localStorage.setItem("expirationDate", expirationDate);
		localStorage.setItem("creds", JSON.stringify(credentials));
		localStorage.setItem("userId", credentials.id);

		dispatch(
			authSuccess({
				creds: {
					...credentials
				},
				userId: credentials.id,
				token: data.accessToken
			})
		);

		dispatch(checkAuthTimeout(3600 * 1000));
	} catch (error) {
		dispatch(authFailed(error.message));
	}
};

export const authCheckState = () => dispatch => {
	const token = localStorage.getItem("token");

	if (!token) {
		dispatch(logout());
	} else {
		const expirationDate = new Date(localStorage.getItem("expirationDate"));

		if (expirationDate > new Date()) {
			const creds = JSON.parse(localStorage.getItem("creds"));
			const userId = localStorage.getItem("userId");

			dispatch(authSuccess({ token, creds, userId }));
			dispatch(
				checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
			);
		} else {
			dispatch(logout());
		}
	}
};
