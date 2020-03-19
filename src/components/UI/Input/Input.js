import React, { forwardRef } from "react";

const input = forwardRef((props, ref) => {
	let inputEl = null;

	const inputElClasses = ["input"];

	if (props.touched && props.invalid) {
		inputElClasses.push("input--invalid");
	}

	switch (props.elType) {
		case "input":
			inputEl = (
				<input
					id={props.name}
					className={inputElClasses.join(" ")}
					{...props.elCfg}
					value={props.value}
					onChange={props.changed}
					ref={ref}
				/>
			);
			break;
		case "textarea":
			inputEl = (
				<textarea
					id={props.name}
					className={inputElClasses.join(" ")}
					{...props.elCfg}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		default:
			inputEl = (
				<input
					id={props.name}
					className={inputElClasses.join(" ")}
					{...props.elCfg}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}

	return (
		<React.Fragment>
			<label htmlFor={props.name}>{props.name}</label>
			{inputEl}
		</React.Fragment>
	);
});

export default input;
