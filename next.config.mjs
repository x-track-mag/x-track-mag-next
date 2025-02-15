/** @type {import('next').NextConfig} */
import { resolve } from "path";
import __dirname from "./dirname.cjs";

const nextConfig = {
	reactStrictMode: true,
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		domains: ["images.prismic.io"],
		path: "/_next/image",
		loader: "default",
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	webpack: (config, options) => {
		// Define some nice aliases (the same as in tsconfig.json)
		config.resolve.alias = {
			...config.resolve.alias,
			"@lib": resolve(__dirname, "src/lib/"),
			"@pages": resolve(__dirname, "src/pages/"),
			"@scripts": resolve(__dirname, "src/scripts/"),
			"@components": resolve(__dirname, "src/components/"),
			"@styles": resolve(__dirname, "src/styles/"),
			"@forms": resolve(__dirname, "src/components/forms/"),
			"@api": resolve(__dirname, "src/pages/api"),
			"@content": resolve(__dirname, "content"),
		};

		return config;
	},
};

export default nextConfig;
