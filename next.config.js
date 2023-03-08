/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.scdn.co',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 't.scdn.co',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'mosaic.scdn.co',
				port: '',
				pathname: '/**',
			},
		],
	},
};
