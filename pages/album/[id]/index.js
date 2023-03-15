import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import DropList from '@/components/DropList';
import Image from 'next/image';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { millisToMinutesAndSeconds } from '@/lib/time';
import Link from 'next/link';

const TrackPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: session, status } = useSession();

	const spotifyApi = useSpotify();
	const AlbumId = id;
	const [album, setAlbum] = useState([]);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getAlbum(AlbumId).then((data) => {
				setAlbum(data.body);
			});
		}
	}, [session, spotifyApi]);

	return (
		<div className="flex bg-black w-screen h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-col w-full  ">
				<div className="flex-grow h-screen overflow-scroll text-gray-500 bg-[#121212] text-xs lg:text-sm scrollbar-hide">
					<header className="absolute top-5 right-8">
						<DropList />
					</header>
					<section
						className={`flex items-end bg-gradient-to-b to-[#121212] from-red-500 h-80 space-x-4 text-white p-8`}
					>
						<Image
							width={176}
							height={176}
							className="shadow-2xl"
							src={album?.images?.[0]?.url}
							alt="album image"
						/>
						<div>
							<p>
								{`${album?.album_type}`.charAt(0).toUpperCase() +
									`${album?.album_type}`.slice(1)}
							</p>
							<h1 className="text-2xl md:text-3xl xl:text-5xl">
								{album?.name}
							</h1>
						</div>
					</section>

					{/*<Songs */}
					<div className="px-6 flex flex-col mt-3 space-y-1 pb-28 text-white">
						{album?.tracks?.items.map((track) => (
							<Link
								href={`/track/${track.id}`}
								className="flex"
								key={`${track.id} ${Math.floor(Math.random())}`}
							>
								<div className="grid grid-cols-2 text-[#929292] hover:text-white hover:bg-[#1a1b1d] rounded-md mt-5 cursor-pointer">
									<div className="flex items-center pl-3 space-x-4 py-1">
										<Image
											width={40}
											height={40}
											src={album.images[0]?.url}
											alt={track.name}
										/>
										<div>
											<p className="w-36 lg:w-[20rem] truncate text-white">
												{track.name}
											</p>
										</div>
									</div>
									<div className="flex items-center justify-between ml-auto md:ml-0 pr-10">
										<p className="hidden md:inline w-40 lg:w-96 truncate">
											{album.name}
										</p>
										<p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>

				<Player />
			</main>
		</div>
	);
};

export default TrackPage;
