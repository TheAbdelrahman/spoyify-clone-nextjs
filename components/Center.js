/* eslint-disable @next/next/no-img-element */
/*import DropList from './DropList';
import { shuffle } from 'lodash';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListIdState, playlisState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const Center = () => {
	const playlistId = useRecoilValue(playListIdState);
	const [playlist, setPlaylist] = useRecoilState(playlisState);
	const spotifyApi = useSpotify();
	const [isActive, setActive] = useState('false');

	useEffect(() => {
		spotifyApi
			.getPlaylist(playlistId)
			.then((data) => {
				setPlaylist(data.body);
			})
			.catch((err) => console.log('Something went wrong!', err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [spotifyApi, playlistId]);

	const handleToggle = () => {
		setActive(!isActive);
	};

	const menuLinks = [
		{
			id: 2,
			title: 'Delete Playlist',
			href: '/library',
			onclick: () => deleteThisPlaylist(playlistId),
		},
	];

	return (
		<div className="flex-grow h-screen overflow-scroll text-gray-500 text-xs lg:text-sm scrollbar-hide relative">
			<header className="absolute top-5 right-8" onClick={handleToggle}>
				<DropList />
			</header>
			<section
				className={`flex items-end space-x-2 bg-gradient-to-b to-[#121212] from-red-500 h-80 text-white p-8`}
			>
				<img
					className="h-44 w-44 shadow-2xl"
					src={playlist?.images?.[0]?.url}
					alt="album image"
				/>
				<div>
					<p>PLAYLIST</p>
					<div className="flex">
						<h1 className="text-2xl md:text-3xl xl:text-5xl">
							{playlist?.name}
						</h1>
						<Menu>
							<div>
								<Menu.Button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-9 h-9"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
										/>
									</svg>
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
								<Menu.Items className="right-0 flex flex-col cursor-pointer z-10 mt-1 text-white">
									{menuLinks.map((onelink) => (
										<div
											key={onelink.id}
											className="py-2 px-4 opacity-80 hover:opacity-90  bg-black "
										>
											<Menu.Item>
												<a onClick={onelink.onclick} href={onelink.href}>
													{onelink.title}
												</a>
											</Menu.Item>
										</div>
									))}
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
			</section>
			<Songs />
		</div>
	);
};

export default Center;
*/
