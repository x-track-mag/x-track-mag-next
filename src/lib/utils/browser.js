/**
 * Check if current script is running in browser or not
 * @returns {boolean}
 */
export const isBrowser = () =>
	typeof window !== "undefined" && typeof document !== "undefined";

const loadPromises = {};
let _loadedFiles = "";

/**
 *
 * @return {Boolean} TRUE if we are running locally
 */
export const isLocalhost = () =>
	Boolean(
		isBrowser() &&
			(window.location.hostname === "localhost" ||
				// [::1] is the IPv6 localhost address.
				window.location.hostname === "[::1]" ||
				// 127.0.0.1/8 is considered localhost for IPv4.
				window.location.hostname.match(
					/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
				))
	);

/**
 * Scroll to the desired element
 * @param {String} hash - #id of the element
 */
export const localScroll = (hash) => {
	if (!document) return false; // Prevent errors during SSR rendering
	const target = document.querySelector(hash);
	if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
	return false; // prevent default event on anchors
};

/**
 * Scroll to the top of the page
 */
export const scrollTop = () => {
	if (!document) return false; // Prevent errors during SSR rendering
	window.scrollTo(0, 0);
	document.body.focus();
};

/**
 * Generate hash for a string, used for non-secure usage only
 * @param str
 * @param {String} [namespace=""]
 * @returns {string}
 */
export const hash = (str, namespace = "") => {
	let hash = 0;
	if (str.length === 0) return `${namespace}__${hash}`;

	let i;
	let chr;
	const strr = `${namespace}_${str}`;
	for (i = 0; i < strr.length; i += 1) {
		chr = strr.charCodeAt(i);
		// eslint-disable-next-line
		hash = (hash << 5) - hash + chr;
		// eslint-disable-next-line
		hash |= 0; // Convert to 32bit integer
	}
	return `${namespace}__${hash}`;
};

/**
 * Load javascript file by href
 * @param href
 * @param attributes
 * @returns {Promise}
 */
export const loadScript = (href, attributes = {}) => {
	const uid = hash(href, "SCRIPT");

	// Wait if it is pending
	if (loadPromises[uid]) return loadPromises[uid];

	loadPromises[uid] = new Promise((resolve, reject) => {
		if (!isBrowser()) {
			// If not a browser then do not allow loading of
			// css file, return with success->false
			return reject(
				new Error(
					"SSR call not supported. loadScript() can only be executed inside the browser"
				)
			);
		}

		// Do not load script if already loaded
		const previousLink = document.getElementById(uid);
		if (previousLink) {
			resolve();
			return previousLink;
		}

		let r = false;
		const s = document.createElement("script");
		s.type = "text/javascript";
		s.id = uid;
		s.src = href;
		s.defer = true;
		// eslint-disable-next-line
		s.onload = s.onreadystatechange = function () {
			if (!r && (!this.readyState || this.readyState === "complete")) {
				r = true;
				resolve();
			}
		};
		// Add custom attribute added by user
		Object.keys(attributes).forEach((attr) => {
			s[attr] = attributes[attr];
		});
		const t = document.getElementsByTagName("script")[0];
		t.parentNode.insertBefore(s, t);
		return s;
	});
	return loadPromises[uid];
};

/**
 * Dynamically append a stylesheet to the document head
 * @param {String} href URL of the stylesheet
 */
export const loadStyle = (href) => {
	_checkFile(href) && appendStyle(href);
};

const _checkFile = (href) => Boolean(_loadedFiles.indexOf(`[${href}]` === -1));

const appendStyle = (href) => {
	if (!isBrowser()) return false;

	const fileRef = document.createElement("link");
	fileRef.setAttribute("rel", "stylesheet");
	fileRef.setAttribute("type", "text/css");
	fileRef.setAttribute("href", href);

	document.getElementsByTagName("head")[0].appendChild(fileRef);

	return Boolean((_loadedFiles += `[${href}]`));
};
