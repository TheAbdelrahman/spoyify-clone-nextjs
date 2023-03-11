import {
	HomeIcon,
	MagnifyingGlassIcon,
	BuildingLibraryIcon,
	PlusCircleIcon,
	HeartIcon,
	RssIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playListIdState } from '@/atoms/playlistAtom';
import Link from 'next/link';
import CreateList from './Modals/CreateList';

const Sidebar = () => {
	const spotifyAPI = useSpotify();

	const { data: session, status } = useSession();
	//const [playlists, setPlaylists] = useState([]);
	const [userPlaylists, setUserPlaylists] = useState([]);
	const [playlistId, setPlaylistId] = useRecoilState(playListIdState);
	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getUserPlaylists().then((data) => {
				setUserPlaylists(data.body.items);
			});
		}
	}, [session, spotifyAPI]);
	/*useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getUserPlaylists().then((data) => {
				setPlaylists(data.body.items);
			});
		}
	},[]);

	console.log(playlistId);*/

	return (
		<div className="flex-col p-3 border-r border-gray-900 bg-black h-screen sm:max-w-[12rem] lg:min-w-[15rem] hidden md:flex scrollbar-hide text-gray-500 text-xs">
			<div className="space-y-4">
				<button className="flex items-center space-x-2 hover:text-white">
					<HomeIcon className="h-5 w-5" />
					<Link href="/">Home</Link>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<MagnifyingGlassIcon className="h-5 w-5" />
					<Link href="/findTrack">Search</Link>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<BuildingLibraryIcon className="h-5 w-5" />
					<Link href="/library">Your library</Link>
				</button>
				<hr className=" border-t-[0.1px] border-gray-900 " />
				<CreateList />
				<button className="flex items-center space-x-2 hover:text-white">
					<HeartIcon className="h-5 w-5" />
					<p>Liked Songs</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<RssIcon className="h-5 w-5" />
					<p>Your episodes</p>
				</button>
				<hr className=" border-t-[0.1px] border-gray-900 " />
			</div>
			<div className="flex-col overflow-scroll scrollbar-hide">
				{userPlaylists?.map((playlist) => (
					<Link key={playlist.id} href="/viewPlaylist">
						<p
							onClick={() => setPlaylistId(playlist.id)}
							className="hover:text-white py-5 cursor-pointer"
						>
							{playlist.name}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
