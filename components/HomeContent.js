import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Track from './Cards/Track';
import DropList from './DropList';

import useTopTracks from '../hooks/useTopTracks';
import useTopArtists from '../hooks/useTopArtists';
import useReleases from '@/hooks/useReleases';
import useFollowedArtists from '@/hooks/useFollowed';
import useCategories from '@/hooks/useCatagories';
import useRecommendations from '@/hooks/useRecommendations';

import useSpotify from '@/hooks/useSpotify';
import { Artist } from './Cards/Artist';
import Release from './Cards/Release';
import Category from './Cards/Category';
import Recomendations from './Cards/Recomendations';

const HomeContent = () => {
	const spotifyAPI = useSpotify();
	const { data: session } = useSession();
	const topTracks = useTopTracks();
	const topArtists = useTopArtists();
	const releases = useReleases();
	const followedArtists = useFollowedArtists();
	const categories = useCategories();
	const recommendations = useRecommendations();

	const [massage, setMassage] = useState(null);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getFeaturedPlaylists().then((data) => {
				setMassage(data.body.message);
			});
		}
	}, [session, spotifyAPI]);

	return (
		<div className="flex-col relative w-full h-screen overflow-y-scroll scrollbar-hide">
			<header className="absolute top-3 right-5">
				<DropList />
			</header>

			<div
				className={
					'flex items-end pl-10 bg-gradient-to-b to-[#121212] from-blue-500 h-60 text-white'
				}
			>
				<h1 className="text-white text-4xl  mt-24">{massage}</h1>
			</div>
			<main className="absolute h-full w-full pb-60">
				{/**Releases */}
				<div className="ease-in-out duration-500 hover:bg-[#222222] p-5 mb-4">
					<h2 className="text-white text-lg pb-3 pl-3">New Releases</h2>
					<div className="flex space-x-2 overflow-scroll scrollbar-hide max-h-50 p2 ">
						{releases?.map((release) => (
							<Release content={release} key={release.id} />
						))}
					</div>
				</div>
				{/**Top Artists */}
				<div className="ease-in-out duration-500 hover:bg-[#222222] p-5 mb-4">
					<h2 className="text-white text-lg pb-3 pl-3">Your Top Artists</h2>
					<div className="flex space-x-2 overflow-scroll scrollbar-hide max-h-50 p2">
						{topArtists?.map((item) => (
							<Artist content={item} key={item.id} />
						))}
					</div>
				</div>
				{/**Top Tracks */}
				<div className="ease-in-out duration-500 hover:bg-[#222222] p-5 mb-4">
					<h2 className="text-white text-lg pb-3 pl-3">Your Top Tracks</h2>
					<div className="flex space-x-2 overflow-scroll scrollbar-hide max-h-50 p2">
						{topTracks?.map((item) => (
							<Track content={item} key={item.id} />
						))}
					</div>
				</div>
				{/**Recommendations */}
				<div className="ease-in-out duration-500 hover:bg-[#222222] p-5 mb-4">
					<h2 className="text-white text-lg pb-3 pl-3">Recommended For You</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center place-content-space overflow-x-scroll w-full scrollbar-hide h-max p2">
						{recommendations?.tracks?.map((item) => (
							<Recomendations content={item} key={item.id} />
						))}
					</div>
				</div>
				{/**Followed Artists */}
				<div className="ease-in-out duration-500 hover:bg-[#222222] p-5 mb-4">
					<h2 className="text-white text-lg pb-3 pl-3">Followed Artists</h2>
					<div className="flex space-x-2 overflow-scroll scrollbar-hide max-h-50 p2">
						{followedArtists.map((item) => (
							<Artist content={item} key={item.id} />
						))}
					</div>
				</div>
				{/**Categories */}
				<div className="ease-in-out duration-500 hover:bg-[#222222] p-5 mb-4">
					<h2 className="text-white text-lg pb-3 pl-3">Browse Categories</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center place-content-center overflow-scroll scrollbar-hide p2 gap-y-5">
						{categories?.map((catagory) => (
							<Category content={catagory} key={catagory.id} />
						))}
					</div>
				</div>
			</main>
		</div>
	);
};

export default HomeContent;
