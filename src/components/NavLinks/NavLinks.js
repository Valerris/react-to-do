import React from "react";
import NavLink from "./NavLink/NavLink";

const navLinks = props => {
	let links = null;

	props.links &&
		(links = props.links
			.filter(link => link.visible)
			.map(link => (
				<NavLink
					key={link.id}
					href={link.href}
					title={link.title}
					isAuth={props.isAuth}
				/>
			)));

	return <ul>{links}</ul>;
};

export default navLinks;
