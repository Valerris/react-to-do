import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, HashRouter } from "react-router-dom";

import App from "./App";
import "./public/styles/styles.css";

import taskBuilderReducer from "./store/reducers/taskBuilder";
import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
	taskBuilder: taskBuilderReducer,
	auth: authReducer
});

const logger =
	process.env.NODE_ENV === "development"
		? store => next => action => {
				console.log("[Middleware] Dispatching: ", action);
				const result = next(action);
				console.log("[Middleware] next state: ", store.getState());
				return result;
		  }
		: null;

const composeEnhancers =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(logger, thunk))
);

const app = (
	<Provider store={store}>
		<HashRouter basename="/react-to-do">
			<App />
		</HashRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));
