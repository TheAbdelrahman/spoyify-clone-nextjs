import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';

const useCategories = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI
				.getCategories()
				.then((data) => setCategories(data.body.categories.items));
		}
	}, [spotifyAPI]);
	//console.log(categories);
	return categories;
};

export default useCategories;
