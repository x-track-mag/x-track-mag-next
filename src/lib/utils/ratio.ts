/**
 * A ratio  is a string n/d
 * @returns {Number}
 */
export const calcRatio = (str) => {
	if (!str || str.indexOf("/") === -1) return 4 / 3;
	const [n, d] = str.split("/");
	return n / d;
};
