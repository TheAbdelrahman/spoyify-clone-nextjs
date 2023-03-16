import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import DropList from '../components/DropList';
import Sidebar from '@/components/Sidebar';
import Playlist from '@/components/Cards/Playlist';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import useSaved from '@/hooks/useSaved';
import Player from '@/components/Player';

const Library = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();

	const [userPlaylists, setUserPlaylists] = useState([]);
	const [playlistId, setPlaylistId] = useState([]);
	const savedTracks = useSaved();

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI
				.getUserPlaylists()
				.then((data) => setUserPlaylists(data.body.items));
		}
	}, [spotifyAPI, session]);

	return (
		<div className="flex bg-black w-screen h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-col w-full  ">
				<div className="flex-grow relative h-screen overflow-scroll text-white bg-[#121212] text-xs lg:text-sm scrollbar-hide">
					<header className="absolute top-5 right-8">
						<DropList />
					</header>
					<section
						className={`flex items-end bg-gradient-to-b to-[#121212] from-gray-800 h-40 space-x-4 text-white p-8`}
					></section>

					<div className="flex-col grow overflow-scroll scrollbar-hide p-10">
						<h1 className="mb-5">Playlists</h1>

						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center place-content-center pb-28">
							<div className="flex-col col-span1 md:col-span-2 rounded-lg p-4 bg-gradient-to-br from-[#0d72ea] to-[#3d91f4]  h-60 overflow-hide w-full">
								<div className="flex justify-between">
									<p className="text-lg">Saved Tracks</p>
									<p>count : {savedTracks.length}</p>
								</div>
								<div className="h-full w-full">
									<div className="overflow-scroll scrollbar-hide h-40 ">
										{savedTracks.map((item) => (
											<Link
												href={`/track/${item.track.id}`}
												className="overflow-hide text-gray-300 hover:text-white text-xs"
												key={item.track.external_ids.isrc}
											>
												<p className="mr-3">
													{item.track.name} • {item.track.artists[0].name}
												</p>
											</Link>
										))}
									</div>
								</div>
							</div>
							<Link
								href={'/savedTracks'}
								className="flex-col justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 h-full w-full"
							>
								<div className="bg-[#056952] h-2/3 flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="#1ed760"
										className="w-1/3 h-2/3"
									>
										<path
											fillRule="evenodd"
											d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
											clipRule="evenodd"
										/>
									</svg>
								</div>

								<p className="cursor-pointer">Your Saved Tracks</p>
							</Link>
							{userPlaylists?.map((playlist) => (
								<div key={playlist.id} className="h-full w-full ">
									<Playlist
										href={`/myPlaylists/${playlist.id}`}
										content={playlist}
									/>
								</div>
							))}
						</div>
					</div>
				</div>

				<Player />
			</main>
		</div>
	);
};

export default Library;
