import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';

const useTopArtists = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [topArtists, setTopArtists] = useState([]);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI
				.getMyTopArtists()
				.then((data) => setTopArtists(data.body.items));
		}
	}, [spotifyAPI, setTopArtists]);
	//console.log(topArtists);

	return topArtists;
};

export default useTopArtists;
