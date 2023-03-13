import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const SearchBar = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [userPlaylists, setUserPlaylists] = useState([]);

	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getUserPlaylists().then((data) => {
				setUserPlaylists(data.body.items);
			});
		}
	}, [session, spotifyAPI]);
	const getTracks = (newSearchQuery) => {
		setSearchQuery(newSearchQuery);
		setTimeout(() => {
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
									id: track.id,
									albumImg: track.album.images[1].url,
								};
							})
						);
					});
			} else setResult([]);
		}, 3000);
	};

	clearTimeout(getTracks);

	const addToPlaylist = (playlist, track) => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.addTracksToPlaylist(playlist, [`${track}`]);
		}
	};

	return (
		<div className="flex flex-col bg-[#121212] w-full h-full items-center justify-center top-0">
			<header className="flex justify-between w-full  bg-[#1a1b1d]">
				<div className="text-gray-500 flex items-center justify-center w-16 h-16">
					<Link href="/">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
					</Link>
				</div>

				<div className="text-white w-full">
					<input
						className="text-center bg-transparent p-1 h-16 text-xl outline-none w-full"
						type="text"
						placeholder="Search"
						value={searchQuery}
						onChange={(event) => getTracks(event.target.value)}
					/>
				</div>

				<div
					onClick={() => {
						setSearchQuery('');
						setResult([]);
					}}
					className="w-16 h-16 flex items-center justify-center text-white "
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
						/>
					</svg>
				</div>
			</header>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center place-content-space overflow-y-scroll w-max scrollbar-hide h-screen p2">
				{result.map((track) => (
					<div
						key={track.uri}
						className="flex-col m-5 w-40 text-gray-500 justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 overflow-x-hide"
					>
						<div>
							<Image
								src={track.albumImg}
								width={192}
								height={192}
								alt="albume image"
								className="rounded-lg"
							/>
						</div>
						<div className="w-28">
							<p className="truncate overflow-hidden w-28 text-white">
								{track.title}
							</p>
							<p className="truncate overflow-hidden w-28">{track.artist}</p>

							<select
								defaultValue={'Add To'}
								id="playlists"
								className="bg-transparent w-28"
								onChange={(e) => {
									//	console.log(e.target.value);
									addToPlaylist(e.target.value, track.uri);
								}}
							>
								<option className=" opacity-80 hover:opacity-90  bg-[#1a1b1d] ">
									Add To ...
								</option>
								{userPlaylists?.map((playlist) => (
									<option
										className="opacity-80 hover:opacity-90 bg-[#1a1b1d] "
										value={playlist.id}
										key={playlist.id}
									>
										{playlist.name}
									</option>
								))}
							</select>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
