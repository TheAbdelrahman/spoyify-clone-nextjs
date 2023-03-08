import Sidebar from '@/components/Sidebar';
import PlaylistCenter from '@/components/PlaylistCenter';
import Player from '@/components/Player';

const ViewPlaylist = () => {
	return (
		<div className="flex bg-black w-screen h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-col w-full  ">
				<PlaylistCenter />
				<Player />
			</main>
		</div>
	);
};

export default ViewPlaylist;
