/**
 * Use and Express middleware
 * and return a method that execute the middleware before continuing
 * or throw an error when an error happens in the middleware
 */
const useMiddleware = (middleware) => (req, res) =>
	new Promise((resolve, reject) => {
		middleware(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}
			return resolve(result);
		});
	});

export default useMiddleware;
