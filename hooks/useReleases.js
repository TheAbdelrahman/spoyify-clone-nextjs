import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';

const useReleases = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [releases, setReleases] = useState();

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI
				.getNewReleases()
				.then((data) => setReleases(data.body.albums.items));
		}
	}, [spotifyAPI]);
	//console.log(releases);
	return releases;
};

export default useReleases;