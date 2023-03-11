/*import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';

const useUserPlaylists = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [userPlaylists, setUserPlaylists] = useState([]);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI
				.getUserPlaylists()
				.then((data) => setUserPlaylists(data.body.items));
		}
	}, [setUserPlaylists, spotifyAPI]);
	//console.log(playlists);
	return userPlaylists;
};

export default useUserPlaylists;*/
