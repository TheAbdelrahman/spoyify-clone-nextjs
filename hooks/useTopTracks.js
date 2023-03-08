import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';

const useTopTracks = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [topTracks, setTopTracks] = useState();

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getMyTopTracks().then((data) => setTopTracks(data.body.items));
		}
	}, [spotifyAPI]);
	//console.log(topTracks);
	return topTracks;
};

export default useTopTracks;
