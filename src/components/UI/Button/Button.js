import React from "react";

const button = props => (
	<button
		className={["button", props.btnType ? props.btnType : ""].join(" ")}
		disabled={props.disabled}
		onClick={props.clicked}
	>
		{props.children}
	</button>
);

export default button;
