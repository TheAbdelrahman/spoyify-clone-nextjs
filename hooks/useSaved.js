import { useState, useEffect } from 'react';
import useSpotify from './useSpotify';
import { useSession } from 'next-auth/react';

const useLiked = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [savedTracks, setSavedTracks] = useState([]);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI
				.getMySavedTracks()
				.then((data) => setSavedTracks(data.body.items));
		}
	}, [session, spotifyAPI]);

	return savedTracks;
};

export default useLiked;
