/* eslint-disable @next/next/no-img-element */
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import { useRecoilState } from 'recoil';
import useSongInfo from '@/hooks/useSongInfo';
import { useEffect, useState } from 'react';

import {
	BackwardIcon,
	PauseIcon,
	PlayIcon,
	ForwardIcon,
	ArrowPathIcon,
	ArrowsRightLeftIcon,
} from '@heroicons/react/24/solid';

import { SpeakerWaveIcon as VolumeUpIcon } from '@heroicons/react/24/outline';
import { SpeakerXMarkIcon as VolumeDownIcon } from '@heroicons/react/24/outline';

const Player = () => {
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();
	const [currentTrackId, setCurrentTrackId] =
		useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const songInfo = useSongInfo(currentTrackId);
	const [volume, setVolume] = useState(50);

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !currentTrackId) {
			fetchCurrentSong();
			setVolume(50);
		}
	}, [currentTrackIdState, spotifyApi, session]);

	const fetchCurrentSong = () => {
		if (!songInfo) {
			spotifyApi.getMyCurrentPlayingTrack().then((data) => {
				setCurrentTrackId(data.body?.item?.id);
				console.log(data);
				spotifyApi.getMyCurrentPlaybackState().then((data) => {
					setIsPlaying(data.body?.is_playing);
				});
			});
		}
	};

	const handlePlayPause = () => {
		spotifyApi.getMyCurrentPlaybackState().then((data) => {
			if (data.body?.is_playing) {
				spotifyApi.pause();
				setIsPlaying(false);
			} else {
				spotifyApi.play();
				setIsPlaying(true);
			}
		});
	};

	return (
		<div className="h-24 bg-[#1a1b1d] text-white grid grid-cols-3 text-sm md:text-base px-2 md:px-8">
			<div className="flex items-center space-x-4">
				<img
					className="md:inline h-12 w-12"
					src={songInfo?.album.images?.[0].url}
					alt=""
				/>
				<div>
					<h3>{songInfo?.name}</h3>
					<p className="text-sm text-gray-500">
						{songInfo?.artists?.[0]?.name}
					</p>
				</div>
			</div>
			<div className="flex items-center justify-evenly">
				<ArrowsRightLeftIcon className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
				<BackwardIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
				{isPlaying ? (
					<PauseIcon
						className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out text-[#18D860]"
						onClick={handlePlayPause}
					/>
				) : (
					<PlayIcon
						className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
						onClick={handlePlayPause}
					/>
				)}
				<ForwardIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
				<ArrowPathIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
			</div>
			<div className="flex items-center space-x-3 md:space-x-4 justify-end p-5">
				{volume == 0 ? (
					<VolumeDownIcon
						className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
						onClick={() => setVolume(volume + 50)}
					/>
				) : (
					<VolumeUpIcon
						className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
						onClick={() => setVolume(volume - volume)}
					/>
				)}
				<input
					type="range"
					value={volume}
					onChange={(e) => setVolume(Number(e.target.value))}
					min={0}
					max={100}
					className="w-14 md:w-36 "
				/>
			</div>
		</div>
	);
};

export default Player;
