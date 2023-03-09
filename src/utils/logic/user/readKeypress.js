const readKeypress = (keyName, callback = null, shiftCallback = null, e) => {
	if (e.key === keyName.trim()) {
		console.log(`${e.key} detected!`);
		if (shiftCallback && e.shiftKey) {
			shiftCallback();
		}
		if (callback && !e.shiftKey) {
			callback();
		}
		e.preventDefault();
	}
};
export default readKeypress;
