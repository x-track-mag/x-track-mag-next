// @ts-nocheck
// next.config.js
const { resolve } = require("path");

module.exports = {
	reactStrictMode: true,
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		domains: ["images.prismic.io"],
		path: "/_next/image",
		loader: "default"
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.md$/,
			use: [
				{
					loader: "gray-matter-loader",
					options: {}
				}
			]
		});

		// Define some nice aliases (the same as in jsconfig.json)
		config.resolve.alias = {
			...config.resolve.alias,
			"@lib": resolve(__dirname, "src/lib/"),
			"@components": resolve(__dirname, "src/components/"),
			"@forms": resolve(__dirname, "src/components/forms/"),
			"@api": resolve(__dirname, "src/pages/api"),
			"@content": resolve(__dirname, "content")
		};

		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: "empty",
			child_process: "empty"
		};

		return config;
	}
};
