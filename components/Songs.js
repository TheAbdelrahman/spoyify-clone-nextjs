import { playlisState } from '@/atoms/playlistAtom';
import { useRecoilValue } from 'recoil';
import { Song } from './Song';

const Songs = () => {
	const playlist = useRecoilValue(playlisState);
	return (
		<div className="px-6 flex flex-col mt-3 space-y-1 pb-28 text-white">
			{playlist?.tracks.items.map((track, i) => (
				<Song key={track.track.id} track={track} order={i} />
			))}
		</div>
	);
};

export default Songs;
