const asyncFunc = importF => () => {
	const func = null;
	importF().then(f => (func = f.default));

	return func;
};

export default asyncFunc;
