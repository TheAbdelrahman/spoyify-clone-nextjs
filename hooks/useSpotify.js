import SpotifyAPI from '@/lib/Spotify';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const useSpotify = () => {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session) {
			if (session.error === 'RefreshAccessTokenError') {
				signIn();
			}

			SpotifyAPI.setAccessToken(session.user.accessToken);
		}
	}, [session]);

	return SpotifyAPI;
};

export default useSpotify;
