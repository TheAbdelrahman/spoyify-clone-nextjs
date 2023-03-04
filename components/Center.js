/* eslint-disable @next/next/no-img-element */
import DropList from './DropList';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListIdState, playlisState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';

const Center = () => {
	const { data: session, status } = useSession();
	const [color, setColor] = useState(null);
	const playlistId = useRecoilValue(playListIdState);
	const [playlist, setPlaylist] = useRecoilState(playlisState);
	const spotifyApi = useSpotify();
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
		spotifyApi
			.getPlaylist(playlistId)
			.then((data) => {
				setPlaylist(data.body);
			})
			.catch((err) => console.log('Something went wrong!', err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [spotifyApi, playlistId]);

	useEffect(() => {
		setColor(shuffle(colors).pop());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playlistId]);

	const handleToggle = () => {
		setActive(!isActive);
	};

	return (
		<div className="flex-grow h-screen overflow-scroll text-gray-500 text-xs lg:text-sm scrollbar-hide select-none relative">
			<header className="absolute top-5 right-8" onClick={handleToggle}>
				<DropList />
			</header>
			<section
				className={`flex items-end space-x-2 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
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
			</section>
			<Songs />
		</div>
	);
};

export default Center;
