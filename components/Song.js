/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';
import useUserPlaylists from '@/hooks/usePlaylists';

export const Song = ({ order, track }) => {
	const userPlaylists = useUserPlaylists();

	const spotifyAPI = useSpotify();
	const [currentTrackId, setCurrentTrackId] =
		useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

	// disabled by spotify
	const addToPlaylist = (playlistID, trackURi) => {
		fetch(`https://api.spotify.com/v1/playlists/${playlistID}/${trackURi}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${SpotifyApi.getAccessToken()}`,
			},
		});
		//spotifyAPI.addTracksToPlaylist(playlistID, trackURi);
	};
	/*
	const playSong = () => {
		setCurrentTrackId(track.track.id);
		setIsPlaying(true);
		spotifyAPI.play({
			uris: [track.track.uri],
		});
	};*/

	return (
		<div className="grid grid-cols-2 text-[#929292] hover:text-white hover:bg-[#1a1b1d] rounded-md mt-5 cursor-pointer">
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
				<select
					className="bg-transparent ml-5"
					defaultValue={null}
					onChange={(e) => addToPlaylist(e.target.value, track.track.uri)}
				>
					<option
						className="py-2 px-4 opacity-80 hover:opacity-90  bg-[#1a1b1d] "
						disabled
					>
						Add To...
					</option>
					{userPlaylists?.map((playlist) => (
						<option
							className="py-2 px-4 opacity-80 hover:opacity-90 bg-[#1a1b1d] "
							value={playlist.id}
							key={playlist.id}
						>
							{playlist.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
