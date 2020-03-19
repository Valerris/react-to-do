import React from "react";
import { Link } from "react-router-dom";

const navLink = props => (
	<li className="sidenav__link">
		<Link to={props.href} rel="noopener noreferrer">
			{props.title}
		</Link>
	</li>
);

export default navLink;
