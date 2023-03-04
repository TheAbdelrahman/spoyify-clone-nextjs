/* eslint-disable @next/next/no-img-element */
import {
	HomeIcon,
	MagnifyingGlassIcon,
	BuildingLibraryIcon,
	PlusCircleIcon,
	HeartIcon,
	RssIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playListIdState } from '@/atoms/playlistAtom';

const Library = () => {
	const spotifyAPI = useSpotify();

	const { data: session, status } = useSession();
	const [playlists, setPlaylists] = useState([]);
	const [playlistId, setPlaylistId] = useRecoilState(playListIdState);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getUserPlaylists().then((data) => {
				setPlaylists(data.body.items);
			});
		}
	}, [session, spotifyAPI]);

	console.log(playlists);

	return (
		<div className="flex flex-wrap empty:hidden p-20 pb-32 h-screen scrollbar-hide overflow-y-scroll space-x-5 space-y-5">
			{playlists.map((playlist) => (
				<div
					className="flex-col justify-center items-center space-y-2 w-40 h-max"
					key={playlist.id}
				>
					<img
						src={playlist.images[0].url}
						alt="albume image"
						className="w-32 h-32 rounded-lg"
					/>
					<p
						onClick={() => setPlaylistId(playlist.id)}
						className="hover:text-white cursor-pointer"
					>
						{playlist.name}
					</p>
				</div>
			))}
		</div>
	);
};

export default Library;
