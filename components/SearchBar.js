import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useUserPlaylists from '@/hooks/usePlaylists';

const SearchBar = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const userPlaylists = useUserPlaylists();

	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

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
									albumImg: track.album.images[1].url,
								};
							})
						);
					});
			} else setResult([]);
		}, 3000);
	};

	clearTimeout(getTracks);

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
						<Image
							src={track.albumImg}
							width={256}
							height={256}
							alt="albume image"
							className="rounded-lg"
						/>
						<div>
							<p className="break-all max-w-60">{track.title}</p>
							<p className="break-all max-w-60 text-xs text-gray-500">
								{track.artist}
							</p>
							<select
								className="bg-transparent ml-5"
								defaultValue={null}
								onChange={(e) => addToPlaylist(e.target.value, track.track.uri)}
							>
								<option
									className="py-2 px-4 opacity-80 hover:opacity-90  bg-[#1a1b1d] "
									disabled
								>
									Add To...
								</option>
								{userPlaylists?.map((playlist) => (
									<option
										className="py-2 px-4 opacity-80 hover:opacity-90 bg-[#1a1b1d] "
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
