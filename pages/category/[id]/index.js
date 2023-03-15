import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import DropList from '@/components/DropList';
import Sidebar from '@/components/Sidebar';
import Playlist from '@/components/Cards/Playlist';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Category = () => {
	const router = useRouter();
	const { id } = router.query;
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();

	const [categoryPlaylists, setCategoryPlaylists] = useState([]);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI
				.getPlaylistsForCategory(id)
				.then((data) => setCategoryPlaylists(data.body.playlists.items));
			console.log(categoryPlaylists);
		}
	}, [spotifyAPI, session]);

	return (
		<div className="flex max-h-screen w-screen overflow-hidden bg-[#121212] text-white ">
			<div className=" m-w-1/5">
				<Sidebar />
			</div>

			<div className="flex-col w-screen">
				<header>
					<div className="flex justify-end items-center pr-8 h-20 bg-opacity-30 bg-black w-full">
						<DropList />
					</div>
				</header>
				<main className="w-full h-screen flex">
					<div className="flex-col grow overflow-scroll scrollbar-hide p-10">
						<h1 className="mb-5">Playlists</h1>

						{categoryPlaylists ? (
							<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center place-content-center pb-28">
								{categoryPlaylists?.map((playlist) => (
									<div key={playlist.id} className="h-full w-full ">
										<Playlist
											href={`/playlists/${playlist.id}`}
											content={playlist}
										/>
									</div>
								))}
							</div>
						) : (
							<></>
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Category;
