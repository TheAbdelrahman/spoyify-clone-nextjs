import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from './useSpotify';

function useSongInfo() {
	const spotifyAPI = useSpotify();
	const [currentIdTrack, setCurrentTrackId] =
		useRecoilState(currentTrackIdState);
	const [songInfo, setSongInfo] = useState(null);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
				if (data.body.item != null) {
					setSongInfo(data.body?.item);
				} else {
					if (spotifyAPI.getAccessToken()) {
						spotifyAPI
							.getMyRecentlyPlayedTracks()
							.then((data) => setSongInfo(data.body.items[0].track));
					}
				}
			});
		}
	}, [currentIdTrack, spotifyAPI]);
	//	console.log(songInfo);

	return songInfo;
}

export default useSongInfo;
