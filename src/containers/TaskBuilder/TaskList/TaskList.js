import React, { Component } from "react";

import List from "../../../components/List/List";

const taskList = props => {
	let list = null;

	!props.tasks || props.tasks.length === 0
		? (list = (
				<p style={{ textAlign: "center", margin: "0 0 3rem" }}>
					You have got no tasks yet...
				</p>
		  ))
		: (list = (
				<List
					setRef={props.setRef}
					tasks={props.tasks}
					clickTaskHandler={props.clickTaskHandler}
					movedAnimEndHandler={props.movedAnimEndHandler}
					collapsedAnimEndHandler={props.collapsedAnimEndHandler}
				/>
		  ));

	return (
		<React.Fragment>
			<h3>List.</h3>
			{list}
		</React.Fragment>
	);
};

export default taskList;
