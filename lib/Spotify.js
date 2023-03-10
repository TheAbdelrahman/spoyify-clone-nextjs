import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
	'ugc-image-upload',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'streaming',
	'app-remote-control',
	'user-read-email',
	'user-read-private',
	'playlist-read-collaborative',
	'playlist-modify-public',
	'playlist-read-private',
	'playlist-modify-private',
	'user-library-modify',
	'user-library-read',
	'user-top-read',
	'user-read-playback-position',
	'user-read-recently-played',
	'user-follow-read',
	'user-follow-modify',
].join(',');

const params = {
	scope: scopes,
};

const querParamString = new URLSearchParams(params);

const LOGIN_URL =
	'https://accounts.spotify.com/authorize?' + querParamString.toString();

const SpotifyAPI = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default SpotifyAPI;

export { LOGIN_URL };
