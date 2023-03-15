import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import DropList from '@/components/DropList';
import Image from 'next/image';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const TrackPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: session, status } = useSession();
	const spotifyAPI = useSpotify();

	const spotifyApi = useSpotify();
	const artistID = id;
	const [albums, setAlbums] = useState([]);
	const [userPlaylists, setUserPlaylists] = useState([]);
	const [artist, setArtist] = useState([]);
	const [topTracks, setTopTracks] = useState([]);
	const [artistRelatedArtists, setArtistRelatedArtists] = useState([]);

	//userplaylists
	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getUserPlaylists().then((data) => {
				setUserPlaylists(data.body.items);
			});
		}
	}, [session, spotifyAPI]);

	// artists albums
	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getArtistAlbums(artistID).then((data) => {
				setAlbums(data.body.items);
				//console.log(albums);
			});
		}
	}, [session, spotifyApi]);

	//artist details
	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getArtist(artistID).then((data) => {
				setArtist(data.body);
			});
		}
	}, [session, spotifyApi]);

	//artist top tracks
	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi
				.getArtistTopTracks(artistID, ['US', 'EG', 'EU', 'GB'])
				.then((data) => {
					setTopTracks(data.body.tracks);
					//console.log(topTracks);
				});
		}
	}, [session, spotifyApi]);

	// related artists

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getArtistRelatedArtists(artistID).then((data) => {
				setArtistRelatedArtists(data.body.artists);
				//console.log(artistRelatedArtists);
			});
		}
	}, [session, spotifyApi]);

	return (
		<div className="flex h-screen bg-[#121212] m-w-lg ">
			<div>
				<Sidebar />
			</div>

			<main className="flex flex-col w-full">
				<div className="flex-col relative w-full h-screen overflow-y-scroll scrollbar-hide">
					<header className="absolute top-5 right-8 z-10">
						<DropList />
					</header>
					<section
						className={`flex flex-col items-center justify-end space-y-5 bg-gradient-to-b to-[#121212] from-gray-900 h-80  text-white p-8`}
					>
						<Image
							width={176}
							height={176}
							className="shadow-2xl rounded-lg"
							src={artist?.images?.[0]?.url}
							alt="album image"
						/>
						<h1 className="text-2xl md:text-3xl xl:text-5xl">{artist?.name}</h1>
					</section>

					<main className="absolute h-full w-full pb-60">
						{/**Albums */}
						{albums ? (
							<div className="ease-in-out duration-500 hover:bg-[#222222] p-5 mb-4">
								<h2 className="text-white text-lg pb-3 pl-3">Artist Albums</h2>
								<div className="flex space-x-2 overflow-scroll scrollbar-hide max-h-50 p2 ">
									{albums?.map((item) => (
										<Link
											href={`/album/${item.id}`}
											key={item.id}
											className="flex-col cursor-pointer justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 h-full w-full overflow-y-hide"
										>
											<div>
												<Image
													src={item.images[0].url}
													alt="Album Image"
													width={128}
													height={128}
													className="rounded-md"
												/>
											</div>
											<div className="w-32">
												<p className="text-white truncate">{item.name}</p>
											</div>
										</Link>
									))}
								</div>
							</div>
						) : (
							<></>
						)}
						{/**Top Tracks */}
						{topTracks.length > 0 ? (
							<div className="ease-in-out duration-500 hover:bg-[#222222] p-5 mb-4">
								<h2 className="text-white text-lg pb-3 pl-3">Top Tracks</h2>
								<div className="flex space-x-2 overflow-scroll scrollbar-hide max-h-50 p2 ">
									{topTracks.map((item) => (
										<Link
											href={`/track/${item.id}`}
											key={item.id}
											className="flex-col cursor-pointer justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 h-full w-full overflow-y-hide"
										>
											<div>
												{
													<Image
														src={item?.album.images[0].url}
														alt="Album Image"
														width={128}
														height={128}
														className="rounded-md"
													/>
												}
											</div>
											<div className="w-32">
												<p className="text-white truncate">{item?.name}</p>
											</div>
										</Link>
									))}
								</div>
							</div>
						) : (
							<></>
						)}
						{/**Artist related */}
						{artistRelatedArtists.length > 0 ? (
							<div className="ease-in-out duration-500 hover:bg-[#222222] p-5 mb-4">
								<h2 className="text-white text-lg pb-3 pl-3">Recommended</h2>
								<div className="flex space-x-2 overflow-scroll scrollbar-hide max-h-50 p2 ">
									{artistRelatedArtists.map((item) => (
										<Link
											href={`/artist/${item.id}`}
											key={item.id}
											className="flex-col cursor-pointer justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 h-full w-full overflow-y-hide"
										>
											<div>
												{
													<Image
														src={item?.images[0].url}
														alt="Album Image"
														width={128}
														height={128}
														className="rounded-md"
													/>
												}
											</div>
											<div className="w-32">
												<p className="text-white truncate">{item?.name}</p>
											</div>
										</Link>
									))}
								</div>
							</div>
						) : (
							<></>
						)}{' '}
					</main>
				</div>
				<div className="sticky bottom-0 w-full">
					<Player />
				</div>
			</main>
		</div>
	);
};

export default TrackPage;
