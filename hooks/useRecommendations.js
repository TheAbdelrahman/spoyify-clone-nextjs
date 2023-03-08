import { useEffect, useState } from 'react';
import useSpotify from './useSpotify';

const useRecommendations = () => {
	const spotifyAPI = useSpotify();

	const tracks = [
		'3lSOZb5rruEnFbe9xWELF6',
		'0Tb1uEm2hlTE1QHWwZMwej',
		'4Y9lVjRD82aJOQ2v13UIoF',
		'0yzzLd3WfrxFMaU0atqn4i',
	];
	const artists = [
		'0jrFMgW018F1XVnLtCXOKi',
		'4gzpq5DPGxSnKTe4SA8HAU',
		'3SibIKq06YxdSCHBkHil27',
		'4OpgGR0sYIwrfYZgklLWnk',
		'0UOrkpzPED604dKzxgfJqg',
	];
	const genres = ['chill', 'classical', 'club', 'comedy', 'dance'];

	const [recommendations, setRecommendations] = useState();
	useEffect(() => {
		const fetchInfo = async () => {
			const trackInfo = await fetch(
				'https://api.spotify.com/v1/recommendations?limit=10&seed_genres=chill+classical&seed_artists=0jrFMgW018F1XVnLtCXOKi&seed_tracks=3lSOZb5rruEnFbe9xWELF6',
				{
					headers: {
						Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
					},
				}
			);
			const res = await trackInfo.json();

			setRecommendations(res);
		};
		fetchInfo();
	}, [setRecommendations, spotifyAPI]);

	//console.log(recommendations);

	return recommendations;
};

export default useRecommendations;
