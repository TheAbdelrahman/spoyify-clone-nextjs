/* eslint-disable @next/next/no-img-element */
import DropList from './DropList';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListIdState, playlisState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';
import Options from './OptionButtons/Options';

const Center = () => {
	const spotifyApi = useSpotify();

	const { data: session, status } = useSession();
	const [color, setColor] = useState(null);
	const playlistId = useRecoilValue(playListIdState);
	const [playlist, setPlaylist] = useRecoilState(playlisState);
	const [isActive, setActive] = useState('false');

	const colors = [
		'from-indigo-500',
		'from-blue-500',
		'from-green-500',
		'from-red-500',
		'from-yellow-500',
		'from-pink-500',
		'from-purple-500',
	];

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getPlaylist(playlistId).then((data) => {
				setPlaylist(data.body);
			});
		}
	}, [spotifyApi, playlistId]);

	useEffect(() => {
		setColor(shuffle(colors).pop());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playlistId]);

	return (
		<div className="flex-grow h-screen overflow-scroll text-gray-500 bg-[#121212] text-xs lg:text-sm scrollbar-hide">
			<header className="absolute top-5 right-8">
				<DropList />
			</header>
			<section
				className={`flex items-end bg-gradient-to-b to-[#121212] ${color} h-80 space-x-4 text-white p-8`}
			>
				<img
					className="h-44 w-44 shadow-2xl"
					src={playlist?.images?.[0]?.url}
					alt="album image"
				/>
				<div>
					<p>PLAYLIST</p>
					<h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
				</div>
				<Options />
			</section>
			<Songs />
		</div>
	);
};

export default Center;
