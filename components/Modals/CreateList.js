import { useState, useRef, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import useSpotify from '@/hooks/useSpotify';

const CreateList = () => {
	const spotifyAPI = useSpotify();

	const [showModal, setShowModal] = useState(false);

	const nameRef = useRef(undefined);
	const descriptionRef = useRef(undefined);

	//const [privacy, setPrivacy] = useState();

	const handleSubmit = (e) => {
		const name = nameRef.current.value;
		const description = descriptionRef.current.value;

		setName(name);
		setDescription(description);

		setShowModal(false);

		if ((name, description)) {
			if (spotifyAPI.getAccessToken()) {
				spotifyAPI.createPlaylist(name);
			}
		}

		console.log(name, description);
	};

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	console.log(name, description);

	return (
		<>
			<button
				type="button"
				onClick={() => setShowModal(true)}
				className="flex items-center space-x-2 hover:text-white"
			>
				<PlusCircleIcon className="h-5 w-5" />
				<p>Create Playlist</p>
			</button>

			{showModal ? (
				<>
					<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-3/4 my-6 mx-auto max-w-3xl">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#121212] outline-none focus:outline-none">
								<div className="flex items-start justify-between p-5 border-b border-solid ">
									<h3 className="text-3xl text-white">Create Playlist</h3>
								</div>
								<div className="relative p-2 flex-col">
									<form className="bg-[#121212] shadow-md rounded px-8 pt-6 pb-8 w-full">
										<label className="block text-white text-sm font-bold mb-3">
											Playlist name
										</label>
										<input
											placeholder="Playlist Name"
											onChange={(event) => setName(event.target.value)}
											value={name}
											name={name}
											ref={nameRef}
											className="shadow bg-[#252525] appearance-none rounded w-full py-2 px-1 mb-5 text-white"
										/>
										<label className="block text-white text-sm font-bold mb-3">
											Description
										</label>
										<input
											placeholder="description"
											onChange={(event) => setDescription(event.target.value)}
											value={description}
											name={description}
											ref={descriptionRef}
											className="shadow bg-[#252525] appearance-none  rounded w-full py-2 px-1 text-white"
										/>
									</form>
								</div>
								<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
									<button
										className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
										type="button"
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
									<button
										className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
										type="submit"
										onClick={handleSubmit}
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			) : null}
		</>
	);
};

export default CreateList;
