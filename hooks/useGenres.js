import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';

const useGenres = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI
				.getAvailableGenreSeeds()
				.then((data) => setGenres(data.body.genres));
		}
	}, [spotifyAPI, session]);
	//console.log(genres);

	return genres;
};

export default useGenres;
