/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

export const Song = ({ order, track }) => {
	const spotifyAPI = useSpotify();
	const [currentTrackId, setCurrentTrackId] =
		useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

	const playSong = () => {
		setCurrentTrackId(track.track.id);
		setIsPlaying(true);
		spotifyAPI.play({
			uris: [track.track.uri],
		});
	};

	return (
		<div
			onClick={playSong}
			className="grid grid-cols-2 text-[#929292] hover:text-white hover:bg-[#1a1b1d] rounded-md mt-5 cursor-pointer"
		>
			<div className="flex items-center pl-3 space-x-4 py-1">
				<p>{order + 1}</p>
				<img
					src={track.track.album.images[0].url}
					alt={track.track.album.name}
					className="h-10 w-10"
				/>
				<div>
					<p className="w-36 lg:w-[20rem] truncate text-white">
						{track.track.name}
					</p>
					<p className="w-40">{track.track.artists[0].name}</p>
				</div>
			</div>
			<div className="flex items-center justify-between ml-auto md:ml-0 pr-10">
				<p className="hidden md:inline w-40 lg:w-96 truncate">
					{track.track.album.name}
				</p>
				<p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
			</div>
		</div>
	);
};
