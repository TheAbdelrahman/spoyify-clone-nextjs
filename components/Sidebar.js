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

const Sidebar = () => {
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

	//console.log(playlistId);

	return (
		<div className="flex-grow p-5 border-r border-gray-900 overflow-y-scroll h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex scrollbar-hide text-gray-500 text-xs lg:text-s ">
			<div className="space-y-4">
				<button className="flex items-center space-x-2 hover:text-white">
					<HomeIcon className="h-5 w-5" />
					<p>Home</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<MagnifyingGlassIcon className="h-5 w-5" />
					<p>Search</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<BuildingLibraryIcon className="h-5 w-5" />
					<p>Your library</p>
				</button>
				<hr className=" border-t-[0.1px] border-gray-900 " />
				<button className="flex items-center space-x-2 hover:text-white">
					<PlusCircleIcon className="h-5 w-5" />
					<p>Create Playlist</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<HeartIcon className="h-5 w-5" />
					<p>Liked Songs</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<RssIcon className="h-5 w-5" />
					<p>Your episodes</p>
				</button>
				<hr className=" border-t-[0.1px] border-gray-900 " />
				{/**playlists */}

				{playlists.map((playlist) => (
					<p
						key={playlist.id}
						onClick={() => setPlaylistId(playlist.id)}
						className="hover:text-white  cursor-pointer"
					>
						{playlist.name}
					</p>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
