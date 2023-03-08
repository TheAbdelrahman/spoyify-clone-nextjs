/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';

const SearchBar = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();

	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState(null);

	const getTracks = (newSearchQuery) => {
		setSearchQuery(newSearchQuery);

		if (newSearchQuery) {
			spotifyAPI
				.searchTracks(newSearchQuery, { limit: 50, offset: 50 })
				.then((res) => {
					setResult(
						res.body.tracks.items.map((track) => {
							return {
								artist: track.artists[0].name,
								title: track.name,
								uri: track.uri,
								albumImg: track.album.images[1].url,
							};
						})
					);
				});
		} else setResult([]);
	};

	return (
		<div className="flex flex-col bg-black w-full h-full items-center justify-center top-0">
			<input
				className=" text-center bg-transparent p-1 text-white h-16 text-xl outline-none w-full"
				type="text"
				placeholder="Search"
				value={searchQuery}
				onChange={(event) => getTracks(event.target.value)}
			/>
			<div className="flex flex-wrap p-20 pb-32 h-screen scrollbar-hide overflow-y-scroll space-x-5 space-y-5">
				{result.map((track) => (
					<div
						key={track.uri}
						className="flex-col justify-center items-center text-white space-y-2 w-64 h-max"
					>
						<img
							src={track.albumImg}
							alt="albume image"
							className="w-64 h-64 rounded-lg"
						/>
						<div>
							<p className="break-all max-w-60">{track.title}</p>
							<p className="break-all max-w-60 text-xs text-gray-500">
								{track.artist}
							</p>
							{/*console.log(track)*/}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
