import { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import useSpotify from '@/hooks/useSpotify';

//to be fixed
// this frature is blocked by spotify due to a bug in state that sends too manyy requests
const CreateList = () => {
	const spotifyAPI = useSpotify();

	const [showModal, setShowModal] = useState(false);
	/*	const [state, setState] = useState({
		name: '',
		description: '',
	});
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setState((prevProps) => ({
			...prevProps,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setShowModal(false);

		if (state.name.length > 4) {
			if (spotifyAPI.getAccessToken()) {
				spotifyAPI.createPlaylist(state.name).then(setState(''));
				console.log(state.name, state.description);
			}
		}
	};*/

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
									<form
										className="bg-[#121212] shadow-md rounded px-8 pt-6 pb-8 w-full"
										//onSubmit={handleSubmit}
									>
										<div className="form-control">
											<label className="block text-white text-sm font-bold mb-3">
												Playlist Name
											</label>
											<input
												className="shadow bg-[#252525] appearance-none rounded w-full py-2 px-1 mb-5 text-white"
												type="text"
												name="name"
												maxLength={10}
												//value={state.name}
												//onChange={handleInputChange}
											/>
										</div>
										<div className="form-control">
											<label className="block text-white text-sm font-bold mb-3">
												Description
											</label>
											<input
												className="shadow bg-[#252525] appearance-none rounded w-full py-2 px-1 mb-5 text-white"
												type="text"
												name="description"
												//value={state.description}
												maxLength={10}
												//onChange={handleInputChange}
											/>
										</div>
										<div className="form-control">
											<label></label>
											<button
												className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
												type="submit"
											>
												Login
											</button>
										</div>
									</form>
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
