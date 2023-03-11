import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';

const useTopArtists = () => {
	const spotifyAPI = useSpotify();
	const [topArtists, setTopArtists] = useState([]);
	const { data: session, status } = useSession();

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
