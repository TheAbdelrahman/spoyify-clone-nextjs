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
import Link from 'next/link';

const PlaylistThread = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: session, status } = useSession();

	const spotifyApi = useSpotify();
	const playlistId = id;
	const [playlist, setPlaylist] = useRecoilState(playlisState);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getPlaylist(playlistId).then((data) => {
				setPlaylist(data.body);
			});
		}
	}, [session, spotifyApi]);

	return (
		<div className="flex bg-black w-screen h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-col w-full  ">
				<div className="flex-grow relative h-screen overflow-scroll text-gray-500 bg-[#121212] text-xs lg:text-sm scrollbar-hide">
					<header className="absolute top-5 right-8">
						<DropList />
					</header>
					<section
						className={`flex items-end bg-gradient-to-b to-[#121212] from-green-300 h-80 space-x-4 text-white p-8`}
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
					</section>

					{/*<Songs */}
					<div className="px-6 flex flex-col mt-3 space-y-1 pb-28 text-white">
						{playlist?.tracks?.items.map((track, i) => (
							<Link
								href={`/track/${track.track.id}`}
								className="flex"
								key={`${track.track.id} ${Math.floor(Math.random())}`}
							>
								<Song track={track} order={i} />
							</Link>
						))}
					</div>
				</div>

				<Player />
			</main>
		</div>
	);
};

export default PlaylistThread;
