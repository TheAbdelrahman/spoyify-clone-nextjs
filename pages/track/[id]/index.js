import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import DropList from '@/components/DropList';
import Image from 'next/image';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';

const TrackPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: session, status } = useSession();
	const spotifyAPI = useSpotify();

	const spotifyApi = useSpotify();
	const trackId = id;
	const [track, setTrack] = useState([]);
	const [artistimg, setArtistimg] = useState([]);

	const [userPlaylists, setUserPlaylists] = useState([]);
	const addToPlaylist = (playlist, track) => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.addTracksToPlaylist(playlist, [`${track}`]);
		}
	};

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getUserPlaylists().then((data) => {
				setUserPlaylists(data.body.items);
			});
		}
	}, [session, spotifyAPI]);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getTrack(trackId).then((data) => {
				setTrack(data.body);

				const firstArtist = data.body.artists[0];

				spotifyApi.getArtist(firstArtist.id).then((data) => {
					setArtistimg(data.body.images[0]);
				});
			});
		}
	}, [session, spotifyApi]);

	return (
		<div className="flex bg-black w-screen h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-col w-full ">
				<div className="flex-grow relative h-screen overflow-scroll text-gray-500 bg-[#121212] text-xs lg:text-sm scrollbar-hide">
					<header className="absolute top-5 right-8">
						<DropList />
					</header>
					<section
						className={`flex flex-col items-center justify-center bg-gradient-to-b to-[#121212] from-blue-500 h-full space-x-4 text-white `}
					>
						<div className="flex flex-col justify-center items-center space-y-1 my-2 bg-black bg-opacity-30 p-5 rounded-lg min-h-max mb-5 min-w-max">
							<Image
								width={190}
								height={190}
								className="shadow-2xl mmin-w-max min-h-max rounded-lg"
								src={track?.album?.images?.[0].url}
								alt="album image"
							/>
							<p className="text-1xl md:text-2xl xl:text-3xl">{track?.name}</p>

							{/* Playlist Options */}
							<select
								defaultValue={'Add To'}
								id="playlists"
								className="bg-transparent w-28"
								onChange={(e) => {
									addToPlaylist(e.target.value, track.uri);
								}}
							>
								<option className=" opacity-80 hover:opacity-90  bg-[#1a1b1d] ">
									Add To Playlist
								</option>
								{userPlaylists?.map((playlist) => (
									<option
										className="opacity-80 hover:opacity-90 bg-[#1a1b1d] "
										value={playlist.id}
										key={playlist.id}
									>
										{playlist.name}
									</option>
								))}
							</select>
						</div>
						{/* Details */}
						<div className="flex pl-5 text-white border-l-[1px] sm:w-full border-gray-500 ">
							<div className="space-y-3">
								<div className="flex items-center">
									<Image
										className="shadow-2xl rounded-lg mr-3"
										width={100}
										height={100}
										alt={track?.album?.name}
										src={track?.album?.images?.[0].url}
									/>
									<div className="flex flex-col space-y-3 ">
										<div>
											<p>Album:</p>
											<p>{track?.album?.name}</p>
										</div>
										<div>
											<p>Released:</p>
											<p>{track?.album?.release_date}</p>
										</div>
									</div>
								</div>
								<div className="flex items-center">
									<Image
										className="shadow-2xl rounded-lg mr-3"
										width={100}
										height={100}
										alt="Artist Image"
										src={artistimg?.url}
									/>
									<div>
										<div>Artist :</div>
										{track?.artists?.map((artist) => (
											<p key={artist.id}>{artist.name}</p>
										))}
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

				<Player />
			</main>
		</div>
	);
};

export default TrackPage;
