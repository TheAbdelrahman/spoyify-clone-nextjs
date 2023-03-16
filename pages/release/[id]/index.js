import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import DropList from '@/components/DropList';
import Image from 'next/image';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { millisToMinutesAndSeconds } from '@/lib/time';

const TrackPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: session, status } = useSession();

	const spotifyApi = useSpotify();
	const releaseId = id;
	const [release, setRelease] = useState([]);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getAlbum(releaseId).then((data) => {
				setRelease(data.body);
			});
		}
	}, [session, spotifyApi]);

	return (
		<div className="flex bg-black w-screen h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-col w-full  ">
				<div className="flex-grow  relative h-screen overflow-scroll text-gray-500 bg-[#121212] text-xs lg:text-sm scrollbar-hide">
					<header className="absolute top-5 right-8">
						<DropList />
					</header>

					<section
						className={`flex items-end bg-gradient-to-b to-[#121212] from-red-500 h-60 space-x-4 text-white p-8`}
					>
						<Image
							width={176}
							height={176}
							className="shadow-2xl"
							src={release?.images?.[0]?.url}
							alt="album image"
						/>
						<div>
							<p>
								{`${release?.album_type}`.charAt(0).toUpperCase() +
									`${release?.album_type}`.slice(1)}
							</p>
							<h1 className="text-2xl md:text-3xl xl:text-5xl">
								{release?.name}
							</h1>
						</div>
					</section>

					{/*<Songs */}
					<div className="px-6 flex flex-col mt-3 space-y-1 pb-28 text-white">
						{release?.tracks?.items.map((track) => (
							<div
								className="flex"
								key={`${track.id} ${Math.floor(Math.random())}`}
							>
								<div className="grid grid-cols-2 text-[#929292] hover:text-white hover:bg-[#1a1b1d] rounded-md mt-5 cursor-pointer">
									<div className="flex items-center pl-3 space-x-4 py-1">
										<Image
											width={40}
											height={40}
											src={release.images[0]?.url}
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
											{release.name}
										</p>
										<p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
										{/*<select
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
					</select>*/}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<Player />
			</main>
		</div>
	);
};

export default TrackPage;
