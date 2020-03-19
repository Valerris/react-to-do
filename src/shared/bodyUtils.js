const body = document.body;

const touchEventHandler = e => {
	e.preventDefault();
	return false;
};

export const lockBody = () => {
	const paddingRight = innerWidth - document.documentElement.clientWidth;
	body.style.overflow = "hidden";
	body.style.paddingRight = paddingRight + "px";

	body.addEventListener("touchstart", touchEventHandler, {
		passive: false
	});
	console.log(body);
};

export const unlockBody = () => {
	body.style.overflow = body.style.paddingRight = null;
	body.removeEventListener("touchstart", touchEventHandler, {
		passive: false
	});
	console.log(body);
};
