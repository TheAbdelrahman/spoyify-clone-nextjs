import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';

const useFollowedArtists = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [followedArtists, setFollowedArtists] = useState([]);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI
				.getFollowedArtists()
				.then((data) => setFollowedArtists(data.body.artists.items));
		}
	}, [spotifyAPI]);

	return followedArtists;
};

export default useFollowedArtists;
