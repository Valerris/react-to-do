import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

const modal = props => {
	const body = document.body;

	const touchEventHandler = e => {
		e.preventDefault();
		return false;
	};

	const lockBody = () => {
		const paddingRight = innerWidth - document.documentElement.clientWidth;
		body.style.overflow = "hidden";
		body.style.paddingRight = paddingRight + "px";

		body.addEventListener("touchstart", touchEventHandler, {
			passive: false
		});
		// console.log(body);
	};

	const unlockBody = () => {
		body.style.overflow = body.style.paddingRight = null;
		body.removeEventListener("touchstart", touchEventHandler, {
			passive: false
		});
		// console.log(body);
	};

	const modal = (
		<div className="modal-container">
			<div className="modal-wrapper">
				<Backdrop show clicked={props.clicked} />
				<div className="modal">
					<Button btnType="button--ctrl button--cross" clicked={props.clicked}>
						Close
					</Button>
					{props.children}
				</div>
			</div>
		</div>
	);

	props.show ? lockBody() : unlockBody();

	return props.show ? modal : null;
};

export default modal;
