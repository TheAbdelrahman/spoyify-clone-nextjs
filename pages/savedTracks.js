import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import DropList from '@/components/DropList';
import { Song } from '@/components/Song';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import useSaved from '@/hooks/useSaved';

const SavedTracks = () => {
	const { data: session, status } = useSession();
	const savedTracks = useSaved();

	return (
		<div className="flex bg-black w-screen h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-col w-full  ">
				<div className="flex-grow relative h-screen overflow-scroll text-gray-500 bg-[#121212] text-xs lg:text-sm scrollbar-hide">
					<header className="absolute top-5 right-8">
						<DropList />
					</header>
					<section
						className={`flex items-end bg-gradient-to-b to-[#121212] from-green-300 h-60 space-x-4 text-white p-8`}
					>
						<div>
							<h1 className="text-xl">Your Saved Tracks</h1>
						</div>
					</section>

					{/*<Songs */}
					<div className="px-6 flex flex-col mt-3 space-y-1 pb-28 text-white">
						{savedTracks?.map((track, i) => (
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

export default SavedTracks;
