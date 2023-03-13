import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import DropList from '@/components/DropList';
import Image from 'next/image';
import useSpotify from '@/hooks/useSpotify';
import { Song } from '@/components/Song';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListIdState, playlisState } from '@/atoms/playlistAtom';
import { useSession } from 'next-auth/react';

import { FiMoreVertical } from 'react-icons/fi';
import { Menu, Transition } from '@headlessui/react';

const PlaylistPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: session, status } = useSession();

	const spotifyApi = useSpotify();
	const playlistId = id;
	const [playlist, setPlaylist] = useRecoilState(playlisState);
	//const [userPlaylists, setUserPlaylists] = useState([]);

	/* edit playlist*/
	const [editOptions, setEditOptions] = useState(false);

	const deletePlaylist = () => {
		alert('Not Supported by sporify API');
	};

	const menuLinks = [
		{
			id: 1,
			title: 'Edit',
			href: '#',
			onclick: () => {
				setEditOptions(true);
			},
		},
		{
			id: 2,
			title: 'Delete',
			href: '#',
			onclick: () => {
				deletePlaylist();
			},
		},
	];

	const removeTrack = (playlist, track) => {
		if (spotifyApi.getAccessToken()) {
			console.log(track);
			spotifyApi.removeTracksFromPlaylist(playlist, [{ uri: track }]);

			spotifyApi.getPlaylist(playlistId).then((data) => {
				setPlaylist(data.body);
			});
		}
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getPlaylist(playlistId).then((data) => {
				setPlaylist(data.body);
			});
		}
	}, [session, spotifyApi, setPlaylist, playlistId]);

	return (
		<div className="flex bg-black w-screen h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-col w-full  ">
				<div className="flex-grow h-screen overflow-scroll text-gray-500 bg-[#121212] text-xs lg:text-sm scrollbar-hide">
					<header className="absolute top-5 right-8">
						<DropList />
					</header>
					<section
						className={`flex items-end bg-gradient-to-b to-[#121212] from-red-500 h-80 space-x-4 text-white p-8`}
					>
						<Image
							width={176}
							height={176}
							className="shadow-2xl"
							src={playlist?.images?.[0]?.url}
							alt="album image"
						/>
						<div>
							<p>PLAYLIST</p>
							<h1 className="text-2xl md:text-3xl xl:text-5xl">
								{playlist?.name}
							</h1>
						</div>

						{/* Playlist Options */}
						<Menu>
							<div>
								<Menu.Button className="items-center text-xl cursor-pointer text-white">
									<FiMoreVertical />
								</Menu.Button>
							</div>

							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="flex flex-col cursor-pointer z-10 mt-1 text-white">
									{menuLinks.map((onelink) => (
										<div
											key={onelink.id}
											className="py-2 px-4 opacity-80 hover:opacity-90  bg-black "
										>
											<Menu.Item>
												<a
													className="crusor-pointer"
													onClick={onelink.onclick}
													href={onelink.href}
												>
													{onelink.title}
												</a>
											</Menu.Item>
										</div>
									))}
								</Menu.Items>
							</Transition>
						</Menu>
						{editOptions ? (
							<div className=" flex items-center justify-center bg-green-500 h-8 w-10 rounded-md ">
								<button
									className="bg-green"
									onClick={() => {
										setEditOptions(false);
									}}
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
											d="M4.5 12.75l6 6 9-13.5"
										/>
									</svg>
								</button>
							</div>
						) : (
							<></>
						)}
					</section>

					{/*<Songs */}
					<div className="px-6 flex flex-col mt-3 space-y-1 pb-28 text-white">
						{playlist?.tracks?.items.map((track, i) => (
							<div
								className="flex"
								key={`${track.track.id} ${Math.floor(Math.random())}`}
							>
								<Song track={track} order={i} />
								{editOptions ? (
									<div
										onClick={() => {
											removeTrack(playlistId, track.track.uri);
										}}
										className="flex mt-5 text-[#929292] hover:text-white hover:bg-[#1a1b1d] cursor-pointer items-center justify-center"
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
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</div>
								) : (
									<></>
								)}
							</div>
						))}
					</div>
				</div>

				<Player />
			</main>
		</div>
	);
};

export default PlaylistPage;
