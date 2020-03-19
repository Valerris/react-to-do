import { v4 as uuidv4 } from "uuid";

export const checkInputValidity = (value, rules) => {
	let isValid = true;

	if (rules.required) {
		isValid = value.trim() !== "" && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	return isValid;
};

export const checkFormValidity = formObj => {
	const updatatedFormObj = { ...formObj };
	let isValid = true;

	for (let key in updatatedFormObj) {
		isValid = updatatedFormObj[key].valid && isValid;
	}

	return isValid;
};

export const collectFormData = formObj => {
	let updatedFormObj = { ...formObj };
	const data = {};

	for (let key in updatedFormObj) {
		let updatedFormObjEl = { ...updatedFormObj[key] };
		let updatedFormObjElCfg = { ...updatedFormObjEl.elCfg };
		data[updatedFormObjElCfg.name] = updatedFormObjEl.value;
		data.id = uuidv4();
	}

	return data;
};

export const clearForm = formObj => {
	let updatedFormObj = { ...formObj };

	for (let key in updatedFormObj) {
		let formObjEl = { ...updatedFormObj[key] };
		formObjEl.value = "";
		formObjEl.valid = false;
		formObjEl.touched = false;
		updatedFormObj[key] = formObjEl;
	}

	return updatedFormObj;
};
