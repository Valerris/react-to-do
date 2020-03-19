import React, { forwardRef } from "react";

const listItem = forwardRef((props, ref) => {
	return (
		<li className="list-item" onAnimationEnd={props.collapsedAnimEndHandler}>
			<input id={props.id} type="checkbox" onClick={e => e.stopPropagation()} />
			<label
				ref={ref}
				data-id={props.id}
				htmlFor={props.id}
				className="list-item__main"
				onAnimationEnd={props.movedAnimEndHandler}
			>
				<div className="list-item__content">
					<h4>To-do:</h4>
					<p>{props.task}</p>
					<h4>Comment</h4>
					<p>{props.comment}</p>
				</div>
				<div className="list-item__pic"></div>
			</label>
		</li>
	);
});

export default listItem;
