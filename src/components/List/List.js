import React from "react";

import ListItem from "./ListItem/ListItem";

const list = props => {
	const tasks =
		props.tasks &&
		props.tasks.map((task, i) => (
			<ListItem
				ref={props.setRef}
				key={task.id}
				id={task.id}
				task={task.task}
				comment={task.comment}
				movedAnimEndHandler={props.movedAnimEndHandler}
				collapsedAnimEndHandler={props.collapsedAnimEndHandler}
			/>
		));

	return (
		<ul className="list" onClick={props.clickTaskHandler}>
			{tasks}
		</ul>
	);
};

export default list;
