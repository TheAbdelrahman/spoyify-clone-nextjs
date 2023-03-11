import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';

const useTopTracks = () => {
	const spotifyAPI = useSpotify();
	const [topTracks, setTopTracks] = useState();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getMyTopTracks().then((data) => setTopTracks(data.body.items));
		}
	}, [session, spotifyAPI]);
	//console.log(topTracks);
	return topTracks;
};

export default useTopTracks;
